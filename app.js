const OPERION = {
  BASE_URL: 'https://YOUR-N8N-INSTANCE.com',
  SECRET: 'YOUR-NETLIFY-WEBHOOK-SECRET',

  STRIPE: {
    PUBLISHABLE_KEY: 'pk_live_YOUR_STRIPE_KEY',
    PRICES: {
      TIER_1: 'price_XXXX',
      TIER_2: 'price_XXXX',
      TIER_3: 'price_XXXX',
      TIER_4: 'price_XXXX',
    },
    BILLING_PORTAL: 'https://billing.stripe.com/p/login/YOUR_LINK',
  }
};

// =====================
// UTIL
// =====================
async function api(path, options = {}, auth = false) {
  const headers = options.headers || {};

  if (auth) {
    const token = localStorage.getItem('operion_admin_token');
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    headers['x-operion-secret'] = OPERION.SECRET;
  }

  try {
    const res = await fetch(`${OPERION.BASE_URL}${path}`, {
      ...options,
      headers
    });

    if (!res.ok) throw new Error("API error");

    return await res.json();

  } catch (err) {
    console.error(err);
    return null;
  }
}

// =====================
// ADMIN AUTH
// =====================
async function adminLogin() {
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;
  const status = document.getElementById('loginStatus');

  status.innerText = "Logging in...";

  const data = await api('/webhook/operion/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (data && data.token) {
    localStorage.setItem('operion_admin_token', data.token);
    showAdmin();
  } else {
    status.innerText = "Login failed.";
  }
}

function showAdmin() {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('adminSection').style.display = 'block';
}

function adminLogout() {
  localStorage.removeItem('operion_admin_token');
  location.reload();
}

(function initAdmin() {
  if (localStorage.getItem('operion_admin_token') &&
      document.getElementById('adminSection')) {
    showAdmin();
    loadOverview();
    loadPending();
  }
})();

// =====================
// SYSTEM OVERVIEW
// =====================
async function loadOverview() {
  const el = document.getElementById('overview');
  el.innerHTML = "Loading...";

  const data = await api('/webhook/operion/admin/overview', {}, true);

  if (!data) {
    el.innerHTML = "Error loading overview.";
    return;
  }

  el.innerHTML = `
    <p>Total Clients: ${data.clients || 0}</p>
    <p>Total Enquiries: ${data.enquiries || 0}</p>
    <p>Pending Approvals: ${data.pending || 0}</p>
  `;
}

// =====================
// APPROVAL QUEUE
// =====================
async function loadPending() {
  const tbody = document.querySelector('#approvalTable tbody');
  tbody.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

  const data = await api('/webhook/operion/admin/pending', {}, true);

  if (!data || data.length === 0) {
    tbody.innerHTML = "<tr><td colspan='4'>No pending items</td></tr>";
    return;
  }

  tbody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.enquiry}</td>
      <td>${item.response}</td>
      <td>
        <button onclick="approve('${item.id}')">Approve</button>
        <button onclick="deny('${item.id}')">Deny</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

async function approve(id) {
  await api('/webhook/operion/admin/approve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  }, true);

  loadPending();
  loadOverview();
}

async function deny(id) {
  await api('/webhook/operion/admin/deny', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  }, true);

  loadPending();
  loadOverview();
}

// =====================
// CLIENT DASHBOARD
// =====================
async function loadDashboard() {
  const table = document.querySelector('#clientTable tbody');
  const loading = document.getElementById('loading');
  const tierEl = document.getElementById('tierStatus');

  if (!table) return;

  const tier = await api('/webhook/operion/tier/check');

  if (!tier || !tier.active) {
    tierEl.innerText = "No active subscription.";
    loading.innerText = "";
    return;
  }

  tierEl.innerText = `Plan: ${tier.tier}`;

  const data = await api('/webhook/operion/dashboard');

  if (!data) {
    loading.innerText = "Error loading data.";
    return;
  }

  loading.style.display = 'none';
  document.getElementById('clientTable').style.display = 'table';

  table.innerHTML = '';

  data.forEach(item => {
    const row = `<tr>
      <td>${item.date || ''}</td>
      <td>${item.enquiry || ''}</td>
      <td>${item.status || ''}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

loadDashboard();

// =====================
// BILLING
// =====================
function openBilling() {
  window.location.href = OPERION.STRIPE.BILLING_PORTAL;
}