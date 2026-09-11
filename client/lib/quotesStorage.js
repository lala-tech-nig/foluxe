'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const STORAGE_KEY = 'foluxe_quote_requests';

// Default initial sample quotes for rich demo when backend is offline
const INITIAL_MOCK_QUOTES = [
  {
    _id: 'mock-1',
    referenceId: 'FLX-RFQ-9182',
    fullName: 'Dr. Chinedu Okafor',
    email: 'chinedu.okafor@lagosmed.ng',
    phone: '0803 456 7890',
    organization: 'Lagos Island General Hospital',
    location: 'Lagos, Nigeria',
    category: 'Medical Equipment',
    equipment: 'Mindray BeneVision Patient Monitor (6-Parameter)',
    quantity: 4,
    urgency: 'Immediate (Within 48h)',
    budget: '₦10,000,000 - ₦25,000,000',
    serviceType: 'Procurement + Installation & Calibration',
    message: 'We urgently need 4 units of multi-parameter bedside monitors for our refurbished ICU ward. Please include calibration certifications and emergency delivery timeframe.',
    status: 'pending',
    adminNotes: 'High priority ICU ward expansion. Followed up via WhatsApp.',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    _id: 'mock-2',
    referenceId: 'FLX-RFQ-8421',
    fullName: 'Pharm. Amina Bello',
    email: 'a.bello@apexdiagnostics.com',
    phone: '0812 987 6543',
    organization: 'Apex Diagnostic & Research Labs',
    location: 'Abuja, FCT',
    category: 'Laboratory Equipment',
    equipment: 'Sysmex Automated Hematology Analyzer (5-Part Diff)',
    quantity: 1,
    urgency: 'Urgent (1-2 Weeks)',
    budget: '₦25,000,000 - ₦50,000,000',
    serviceType: 'Turnkey Facility Solution',
    message: 'Requesting proforma for a 5-part differential hematology analyzer with initial startup reagent packs and operator training for 3 lab scientists.',
    status: 'in-review',
    adminNotes: 'Requested datasheet and reagent cost breakdown sent to client.',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
  {
    _id: 'mock-3',
    referenceId: 'FLX-RFQ-7634',
    fullName: 'Engr. Babatunde Adeleke',
    email: 'adeleke@lifecareclinics.org',
    phone: '0802 334 5566',
    organization: 'LifeCare Specialist Clinics',
    location: 'Port Harcourt, Rivers',
    category: 'Chemicals & Reagents',
    equipment: 'Roche Cobas Reagent Kits & Clinical Calibration Standards',
    quantity: 12,
    urgency: 'Standard (Within a Month)',
    budget: '₦5,000,000 - ₦10,000,000',
    serviceType: 'Procurement Only',
    message: 'Monthly replenishment of routine chemistry reagents and quality controls. Need cold-chain courier delivery to our PH facility.',
    status: 'quoted',
    adminNotes: 'Formal proforma invoice #FLX-INV-089 issued on 10/09.',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
  }
];

function getLocalQuotes() {
  if (typeof window === 'undefined') return INITIAL_MOCK_QUOTES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_QUOTES));
      return INITIAL_MOCK_QUOTES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_MOCK_QUOTES;
  } catch {
    return INITIAL_MOCK_QUOTES;
  }
}

function saveLocalQuotes(quotes) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
  } catch (err) {
    console.error('Failed to save quotes locally:', err);
  }
}

export async function submitQuote(quoteData) {
  const generatedId = `FLX-RFQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const localQuote = {
    _id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    referenceId: generatedId,
    createdAt: new Date().toISOString(),
    status: 'pending',
    adminNotes: '',
    ...quoteData,
  };

  // Always save locally so admin panel can see it immediately
  const existing = getLocalQuotes();
  const updated = [localQuote, ...existing];
  saveLocalQuotes(updated);

  // Dispatch custom event for real-time reactivity in admin if open in another tab/component
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('foluxe-quote-added', { detail: localQuote }));
  }

  // Attempt backend persistence
  try {
    const res = await fetch(`${API_URL}/api/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quoteData),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.quote) {
        // Update local with the server's ID and reference
        const synced = updated.map(q => q.referenceId === generatedId ? { ...data.quote, ...q, _id: data.quote._id, referenceId: data.quote.referenceId } : q);
        saveLocalQuotes(synced);
        return { success: true, quote: data.quote, referenceId: data.quote.referenceId };
      }
    }
  } catch {
    // Backend offline — gracefully handled by localQuote
  }

  return { success: true, quote: localQuote, referenceId: generatedId };
}

export async function fetchQuotes(token) {
  // If we have an admin token, try fetching from backend
  if (token) {
    try {
      const res = await fetch(`${API_URL}/api/quotes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const serverQuotes = await res.json();
        if (Array.isArray(serverQuotes) && serverQuotes.length > 0) {
          // Merge server quotes with any new local-only quotes
          const local = getLocalQuotes();
          const serverRefs = new Set(serverQuotes.map(q => q.referenceId));
          const localOnly = local.filter(q => !serverRefs.has(q.referenceId));
          const combined = [...localOnly, ...serverQuotes];
          saveLocalQuotes(combined);
          return combined;
        }
      }
    } catch {
      // Backend offline
    }
  }

  // Fallback to local storage
  return getLocalQuotes();
}

export async function updateQuoteStatus(id, newStatus, adminNotes, token) {
  // Update locally first
  const current = getLocalQuotes();
  const updated = current.map(q => {
    if (q._id === id || q.referenceId === id) {
      return {
        ...q,
        status: newStatus || q.status,
        adminNotes: adminNotes !== undefined ? adminNotes : q.adminNotes,
        updatedAt: new Date().toISOString()
      };
    }
    return q;
  });
  saveLocalQuotes(updated);

  // Dispatch change
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('foluxe-quotes-updated'));
  }

  // If token, push to backend
  if (token && !id.startsWith('mock-') && !id.startsWith('local-')) {
    try {
      await fetch(`${API_URL}/api/quotes/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus, adminNotes })
      });
    } catch {
      // Handled
    }
  }

  return updated.find(q => q._id === id || q.referenceId === id);
}

export async function deleteQuote(id, token) {
  const current = getLocalQuotes();
  const filtered = current.filter(q => q._id !== id && q.referenceId !== id);
  saveLocalQuotes(filtered);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('foluxe-quotes-updated'));
  }

  if (token && !id.startsWith('mock-') && !id.startsWith('local-')) {
    try {
      await fetch(`${API_URL}/api/quotes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch {
      // Handled
    }
  }

  return true;
}

export function getQuoteStats(quotes = []) {
  const total = quotes.length;
  const pending = quotes.filter(q => q.status === 'pending').length;
  const inReview = quotes.filter(q => q.status === 'in-review').length;
  const quoted = quotes.filter(q => q.status === 'quoted').length;
  const completed = quotes.filter(q => q.status === 'completed').length;

  return { total, pending, inReview, quoted, completed };
}
