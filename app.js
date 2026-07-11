// ArenaFlow Stadium Control Panel Logic

// --- Initialization & State Management ---
const STATE = {
  activeTab: 'dashboard',
  selectedSector: null,
  currentTime: new Date(),
  simulation: {
    ingressActive: false,
    matchActive: false,
    ingressSpeed: 3, // tick rate
    matchTimer: 0, // match minutes
    matchTimerInterval: null,
    ingressInterval: null,
    scoreA: 0,
    scoreB: 0,
    concessionsSalesCount: 0
  },
  systemStatus: 'NORMAL', // NORMAL, WARNING, EMERGENCY
  events: [
    {
      id: 1,
      homeTeam: 'Stadium FC',
      awayTeam: 'Away City FC',
      logoA: 'ST',
      logoB: 'AW',
      date: '2026-07-11',
      time: '15:00',
      capacityLimit: 60000,
      ticketsSold: 42150,
      basePrice: 45,
      revenue: 1896750,
      status: 'PRE-MATCH INGRESS'
    },
    {
      id: 2,
      homeTeam: 'Stadium FC',
      awayTeam: 'United United',
      logoA: 'ST',
      logoB: 'UU',
      date: '2026-07-18',
      time: '18:00',
      capacityLimit: 60000,
      ticketsSold: 58900,
      basePrice: 60,
      revenue: 3534000,
      status: 'SCHEDULED'
    },
    {
      id: 3,
      homeTeam: 'National Team',
      awayTeam: 'All Stars XI',
      logoA: 'NT',
      logoB: 'AS',
      date: '2026-08-02',
      time: '20:00',
      capacityLimit: 60000,
      ticketsSold: 12050,
      basePrice: 75,
      revenue: 903750,
      status: 'SCHEDULED'
    }
  ],
  sectors: {
    north: {
      name: 'North Stand',
      category: 'Standard',
      capacity: 18000,
      ticketsSold: 11200,
      price: 35,
      occupancy: 0
    },
    east: {
      name: 'East Stand (VIP)',
      category: 'VIP Club Seats',
      capacity: 8000,
      ticketsSold: 6450,
      price: 150,
      occupancy: 0
    },
    south: {
      name: 'South Stand',
      category: 'Standard Fan End',
      capacity: 18000,
      ticketsSold: 14100,
      price: 30,
      occupancy: 0
    },
    west: {
      name: 'West Stand (Premium)',
      category: 'Premium Seats',
      capacity: 16000,
      ticketsSold: 10400,
      price: 65,
      occupancy: 0
    }
  },
  concessions: [
    { id: 1, name: 'Main Pitchside Burgers', type: 'Food', topItem: 'Double Cheeseburger', stock: 82, sales: 340, price: 12.00, revenue: 4080 },
    { id: 2, name: 'Corner Slice Pizza', type: 'Food', topItem: 'Pepperoni Slice', stock: 95, sales: 290, price: 8.50, revenue: 2465 },
    { id: 3, name: 'Gate 6 Beverages', type: 'Beverages', topItem: 'Craft Lager Pint', stock: 78, sales: 810, price: 7.50, revenue: 6075 },
    { id: 4, name: 'Red & Blue Club Store', type: 'Merchandise', topItem: 'Home Kit Jersey', stock: 22, sales: 110, price: 85.00, revenue: 9350 }
  ],
  notifications: [
    { type: 'warning', text: 'Sector B Gate 4 turnstile high friction detected.', time: '2 mins ago', unread: true },
    { type: 'info', text: 'Merchandise Stall #2 stock warning: Home Kits (M) low.', time: '15 mins ago', unread: true },
    { type: 'success', text: 'Pre-match pitch humidity level achieved (65%).', time: '1 hour ago', unread: false }
  ]
};

// --- Chart Instances ---
let turnstileChart = null;
let concessionsChart = null;

// --- Initialize App ---
document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons Render
  lucide.createIcons();

  // Draw Static Clock
  updateClock();
  setInterval(updateClock, 1000);

  // Setup UI tabs navigation
  initTabs();

  // Setup Interactive SVG Map
  initStadiumMap();

  // Setup Dynamic Charts
  initCharts();

  // Build Dynamically Generated Tables & Elements
  renderEventsTable();
  renderConcessionsTable();
  updateDashboardCounters();

  // Setup Staff slider listeners
  initSliders();

  // Setup Control Simulator Actions
  initSimulatorControls();

  // Set up Event Add modal Dialog Form
  initEventModal();
  
  // Set up Notification bells
  initNotifications();
  
  logConsole('System calibration diagnostics: [SUCCESS]');
});

// --- Time Clock Management ---
function updateClock() {
  const clockText = document.getElementById('current-time');
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const hoursStr = String(hours).padStart(2, '0');
  clockText.textContent = `${hoursStr}:${minutes}:${seconds} ${ampm}`;
}

// --- Tabs Management ---
function initTabs() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Toggle nav item classes
      navItems.forEach(ni => ni.classList.remove('active'));
      item.classList.add('active');

      // Toggle tab views
      const targetTab = item.getAttribute('data-tab');
      STATE.activeTab = targetTab;
      
      const tabs = document.querySelectorAll('.tab-content');
      tabs.forEach(tab => {
        tab.classList.add('hidden');
        if (tab.id === `tab-${targetTab}`) {
          tab.classList.remove('hidden');
        }
      });

      logConsole(`Navigating view to: ${targetTab.toUpperCase()}`);
    });
  });
}

// --- Stadium Layout Vector Interactivity ---
function initStadiumMap() {
  const sectors = document.querySelectorAll('.stadium-sector');
  
  sectors.forEach(sec => {
    sec.addEventListener('click', (e) => {
      // Remove selection outline
      sectors.forEach(s => s.classList.remove('selected'));
      
      // Select clicked
      sec.classList.add('selected');
      
      // Find sector details
      let secKey = '';
      if (sec.id.includes('north')) secKey = 'north';
      else if (sec.id.includes('east')) secKey = 'east';
      else if (sec.id.includes('south')) secKey = 'south';
      else if (sec.id.includes('west')) secKey = 'west';

      STATE.selectedSector = secKey;
      renderSectorDetails(secKey);
    });
  });

  // Price Update Button Listener
  document.getElementById('update-price-btn').addEventListener('click', () => {
    if (!STATE.selectedSector) return;
    const priceInput = document.getElementById('sector-price-input');
    const newPrice = parseFloat(priceInput.value);
    
    if (newPrice && newPrice > 0) {
      STATE.sectors[STATE.selectedSector].price = newPrice;
      
      // Update specific event ticket revenue calculations
      recalculateTicketRevenue();
      renderSectorDetails(STATE.selectedSector);
      updateDashboardCounters();
      renderEventsTable();
      
      logConsole(`Pricing updated for ${STATE.sectors[STATE.selectedSector].name} to $${newPrice}`);
      addNotification('info', `Ticket prices for ${STATE.sectors[STATE.selectedSector].name} adjusted to $${newPrice}.`);
    }
  });
}

function renderSectorDetails(secKey) {
  const sector = STATE.sectors[secKey];
  if (!sector) return;

  document.getElementById('sector-details-empty').classList.add('hidden');
  const detailsActive = document.getElementById('sector-details-active');
  detailsActive.classList.remove('hidden');

  document.getElementById('selected-sector-title').textContent = sector.name;
  document.getElementById('sector-category-val').textContent = sector.category;
  document.getElementById('sector-capacity-val').textContent = sector.capacity.toLocaleString();
  document.getElementById('sector-tickets-sold').textContent = sector.ticketsSold.toLocaleString();
  
  // Calculate occupancy percentage
  const occupancyPct = ((sector.occupancy / sector.capacity) * 100).toFixed(1);
  const occupancyText = `${sector.occupancy.toLocaleString()} (${occupancyPct}%)`;
  document.getElementById('sector-occupancy-rate').textContent = occupancyText;

  // Set pricing values
  document.getElementById('sector-price-input').value = sector.price;
}

// --- Recalculate event revenues based on prices ---
function recalculateTicketRevenue() {
  // Update Current Live Event Ticket Revenue Projection
  const mainEvent = STATE.events[0];
  let projectedTotal = 0;
  Object.keys(STATE.sectors).forEach(key => {
    const s = STATE.sectors[key];
    projectedTotal += s.ticketsSold * s.price;
  });
  mainEvent.revenue = projectedTotal;
}

// --- Render Operations Sliders ---
function initSliders() {
  const sliders = [
    { slider: 'slider-security', count: 'staff-security-count', text: 'Guards' },
    { slider: 'slider-turnstiles', count: 'staff-turnstiles-count', text: 'Attendants' },
    { slider: 'slider-medical', count: 'staff-medical-count', text: 'Emergency Responders' },
    { slider: 'slider-janitorial', count: 'staff-janitorial-count', text: 'Personnel' }
  ];

  sliders.forEach(s => {
    const el = document.getElementById(s.slider);
    el.addEventListener('input', () => {
      document.getElementById(s.count).textContent = `${el.value} ${s.text}`;
    });
    el.addEventListener('change', () => {
      logConsole(`Staffing resources adjusted: ${s.text} count updated to ${el.value}`);
    });
  });

  // Facility irrigation test trigger
  document.getElementById('test-pitch-irrigation').addEventListener('click', () => {
    const moistVal = document.getElementById('pitch-moisture-val');
    const moistBar = document.getElementById('pitch-moisture-bar');
    logConsole('Action: Pitch automatic sprinkler grid activated.');
    moistVal.textContent = 'Irrigation Active... (78%)';
    moistBar.style.width = '78%';
    addNotification('success', 'Water sprinkler loop irrigation cycles activated.');
    
    setTimeout(() => {
      moistVal.textContent = '68% Moisture';
      moistBar.style.width = '68%';
    }, 4000);
  });
}

// --- Notifications drop panels ---
function initNotifications() {
  const bell = document.getElementById('notif-bell');
  const dropdown = document.getElementById('notif-dropdown');
  const clearBtn = document.getElementById('clear-notif');

  bell.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('show');
  });

  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  clearBtn.addEventListener('click', () => {
    STATE.notifications = [];
    renderNotifications();
    logConsole('Security log notifications cleared.');
  });
}

function addNotification(type, text) {
  STATE.notifications.unshift({
    type: type,
    text: text,
    time: 'Just Now',
    unread: true
  });
  renderNotifications();
}

function renderNotifications() {
  const listEl = document.getElementById('notif-list');
  const badgeEl = document.getElementById('notif-badge');
  listEl.innerHTML = '';

  const unreadCount = STATE.notifications.filter(n => n.unread).length;
  badgeEl.textContent = unreadCount;
  badgeEl.style.display = unreadCount > 0 ? 'flex' : 'none';

  if (STATE.notifications.length === 0) {
    listEl.innerHTML = '<li class="empty-notif">No new messages</li>';
    return;
  }

  STATE.notifications.forEach(n => {
    const li = document.createElement('li');
    if (n.unread) li.classList.add('unread');
    
    let icon = 'info';
    if (n.type === 'warning') icon = 'alert-triangle';
    if (n.type === 'success') icon = 'check-circle';

    li.innerHTML = `
      <div class="icon-wrap ${n.type}"><i data-lucide="${icon}"></i></div>
      <div class="notif-body">
        <p>${n.text}</p>
        <span>${n.time}</span>
      </div>
    `;
    listEl.appendChild(li);
  });
  
  lucide.createIcons();
}

// --- Live Simulation Controls ---
function initSimulatorControls() {
  // Ingress Toggle
  document.getElementById('btn-start-ingress').addEventListener('click', () => {
    if (STATE.simulation.ingressActive) return;
    
    STATE.simulation.ingressActive = true;
    logConsole('Ingress simulation initiated. Turnstiles online.');
    addNotification('success', 'Public gate operations started. Crowds entering.');
    
    // Set simulator loop
    STATE.simulation.ingressInterval = setInterval(simulateIngressTick, 1000);
  });

  document.getElementById('btn-stop-ingress').addEventListener('click', () => {
    if (!STATE.simulation.ingressActive) return;
    STATE.simulation.ingressActive = false;
    clearInterval(STATE.simulation.ingressInterval);
    logConsole('Turnstiles stopped. Crowd ingress paused.');
  });

  document.getElementById('btn-reset-occupancy').addEventListener('click', () => {
    STATE.simulation.ingressActive = false;
    clearInterval(STATE.simulation.ingressInterval);
    
    Object.keys(STATE.sectors).forEach(k => {
      STATE.sectors[k].occupancy = 0;
    });

    if (STATE.selectedSector) {
      renderSectorDetails(STATE.selectedSector);
    }
    
    updateDashboardCounters();
    logConsole('Stadium cleared. Occupancy counts reset.');
  });

  // Ingress Speed slider
  const speedSlider = document.getElementById('ingress-speed-slider');
  speedSlider.addEventListener('input', () => {
    STATE.simulation.ingressSpeed = parseInt(speedSlider.value);
    document.getElementById('ingress-speed-val').textContent = `${speedSlider.value}x`;
  });

  // Match control triggers
  const btnStartMatch = document.getElementById('btn-start-match');
  const scoreboard = document.getElementById('match-scoreboard-live');

  btnStartMatch.addEventListener('click', () => {
    if (STATE.simulation.matchActive) return;
    
    STATE.simulation.matchActive = true;
    STATE.simulation.matchTimer = 0;
    STATE.simulation.scoreA = 0;
    STATE.simulation.scoreB = 0;
    
    document.getElementById('score-team-a').textContent = '0';
    document.getElementById('score-team-b').textContent = '0';
    document.getElementById('live-match-timer').textContent = '00:00';
    
    scoreboard.classList.remove('hidden');
    document.getElementById('event-timer-status').textContent = 'LIVE MATCH';
    document.getElementById('event-timer-status').classList.add('danger');

    logConsole('Match Kickoff Event Triggered!');
    addNotification('success', 'Match has kicked off. Simulation active.');

    STATE.simulation.matchTimerInterval = setInterval(simulateMatchTime, 800);
  });

  document.getElementById('btn-team-a-score').addEventListener('click', () => {
    if (!STATE.simulation.matchActive) return;
    STATE.simulation.scoreA++;
    document.getElementById('score-team-a').textContent = STATE.simulation.scoreA;
    logConsole(`Goal scored by ${STATE.events[0].homeTeam}!`);
    addNotification('success', `GOAL! ${STATE.events[0].homeTeam} score! ${STATE.simulation.scoreA}-${STATE.simulation.scoreB}`);
    simulateConcessionsSpike();
  });

  document.getElementById('btn-team-b-score').addEventListener('click', () => {
    if (!STATE.simulation.matchActive) return;
    STATE.simulation.scoreB++;
    document.getElementById('score-team-b').textContent = STATE.simulation.scoreB;
    logConsole(`Goal scored by ${STATE.events[0].awayTeam}!`);
    addNotification('success', `GOAL! ${STATE.events[0].awayTeam} score! ${STATE.simulation.scoreA}-${STATE.simulation.scoreB}`);
    simulateConcessionsSpike();
  });

  document.getElementById('btn-end-match').addEventListener('click', () => {
    if (!STATE.simulation.matchActive) return;
    
    STATE.simulation.matchActive = false;
    clearInterval(STATE.simulation.matchTimerInterval);
    
    document.getElementById('event-timer-status').textContent = 'FULL TIME';
    document.getElementById('event-timer-status').classList.remove('danger');
    
    logConsole(`Full Time: Final Score ${STATE.simulation.scoreA} - ${STATE.simulation.scoreB}`);
    addNotification('info', `Match ended. final score ${STATE.simulation.scoreA} - ${STATE.simulation.scoreB}`);
  });

  // Emergency triggers
  document.getElementById('btn-sim-alert').addEventListener('click', () => {
    setSystemIntegrity('WARNING', 'Turnstile Gate Inflow Congestion Detected at West Stand.');
  });

  document.getElementById('btn-sim-emergency').addEventListener('click', () => {
    setSystemIntegrity('EMERGENCY', 'Emergency Evacuation Drill Triggered.');
  });

  document.getElementById('reset-alert-btn').addEventListener('click', () => {
    setSystemIntegrity('NORMAL', 'Security condition restored.');
  });
}

// --- Live Ticking Subsystems ---
function simulateIngressTick() {
  let rateOfEntry = 0;
  const baseRate = STATE.simulation.ingressSpeed * 25;

  Object.keys(STATE.sectors).forEach(k => {
    const s = STATE.sectors[k];
    if (s.occupancy < s.ticketsSold) {
      const enteredVal = Math.min(Math.round(baseRate + Math.random() * 15), s.ticketsSold - s.occupancy);
      s.occupancy += enteredVal;
      rateOfEntry += enteredVal;
    }
  });

  // Feed turnstile rate graph
  updateTurnstileInflowChart(rateOfEntry);
  updateDashboardCounters();

  if (STATE.selectedSector) {
    renderSectorDetails(STATE.selectedSector);
  }

  // Trigger random concessions checkout
  if (Math.random() > 0.4) {
    simulateConcessionPurchases();
  }
}

function simulateMatchTime() {
  STATE.simulation.matchTimer++;
  const minutes = STATE.simulation.matchTimer;
  document.getElementById('live-match-timer').textContent = `${String(minutes).padStart(2, '0')}:00`;
  
  if (minutes >= 90) {
    // End Match
    document.getElementById('btn-end-match').click();
  }

  // Simulate random goals during match simulation
  if (Math.random() > 0.98) {
    if (Math.random() > 0.5) {
      document.getElementById('btn-team-a-score').click();
    } else {
      document.getElementById('btn-team-b-score').click();
    }
  }
}

function simulateConcessionPurchases() {
  const stallIdx = Math.floor(Math.random() * STATE.concessions.length);
  const stall = STATE.concessions[stallIdx];
  
  if (stall.stock > 0) {
    const qty = Math.floor(Math.random() * 2) + 1;
    stall.stock = Math.max(0, stall.stock - qty);
    stall.sales += qty;
    stall.revenue += qty * stall.price;
    STATE.simulation.concessionsSalesCount += qty;

    renderConcessionsTable();
    updateDashboardCounters();
    updateConcessionsPieChart();

    if (stall.stock <= 5) {
      addNotification('warning', `Low inventory at ${stall.name}: ${stall.topItem} low.`);
    }
  }
}

function simulateConcessionsSpike() {
  logConsole('Crowd goal celebration sparks food/beverage retail spikes.');
  for (let i = 0; i < 5; i++) {
    simulateConcessionPurchases();
  }
}

// --- System status warnings evacuations ---
function setSystemIntegrity(level, message) {
  STATE.systemStatus = level;
  
  const statusIndicator = document.getElementById('system-status-indicator');
  const statusText = document.getElementById('system-status-text');
  const banner = document.getElementById('emergency-banner');
  const bannerText = document.getElementById('emergency-banner-text');

  statusIndicator.className = 'status-indicator';
  statusText.className = 'status-badge';

  if (level === 'NORMAL') {
    statusIndicator.classList.add('active');
    statusText.textContent = 'SYSTEM NORMAL';
    banner.classList.add('hidden');
    logConsole(`Alert status cleared: ${message}`);
  } else if (level === 'WARNING') {
    statusIndicator.classList.add('warning');
    statusText.classList.add('warning');
    statusText.textContent = 'SYSTEM WARNING';
    banner.classList.remove('hidden');
    bannerText.textContent = message;
    logConsole(`Warning Level Active: ${message}`, 'warn');
    addNotification('warning', message);
  } else if (level === 'EMERGENCY') {
    statusIndicator.classList.add('danger');
    statusText.classList.add('danger');
    statusText.textContent = 'EMERGENCY STATE';
    banner.classList.remove('hidden');
    bannerText.textContent = message;
    logConsole(`CRITICAL SYSTEM ALARM: ${message}`, 'alert');
    addNotification('warning', `ALERT: ${message}`);
  }
}

// --- Console Log Box ---
function logConsole(message, type = 'system') {
  const box = document.getElementById('console-box');
  const time = new Date().toLocaleTimeString();
  const line = document.createElement('div');
  line.className = `console-line ${type}`;
  line.textContent = `[${time}] ${message}`;
  
  box.appendChild(line);
  box.scrollTop = box.scrollHeight;
}

// --- Counters Updates ---
function updateDashboardCounters() {
  // Total occupancy
  let totalCap = 0;
  let totalOcc = 0;
  let totalTicketRev = 0;
  
  Object.keys(STATE.sectors).forEach(k => {
    const s = STATE.sectors[k];
    totalCap += s.capacity;
    totalOcc += s.occupancy;
    totalTicketRev += s.ticketsSold * s.price;
  });

  const occPct = totalCap > 0 ? (totalOcc / totalCap) * 100 : 0;
  
  document.getElementById('stat-occupancy').textContent = `${totalOcc.toLocaleString()} / ${totalCap.toLocaleString()}`;
  document.getElementById('occupancy-progress').style.width = `${occPct}%`;
  document.getElementById('occupancy-percentage').textContent = `${occPct.toFixed(1)}% Capacity Filled`;

  // Update dynamic ticket projection
  document.getElementById('stat-revenue').textContent = `$${totalTicketRev.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

  // Concessions revenue totals
  let concessionRev = 0;
  STATE.concessions.forEach(c => {
    concessionRev += c.revenue;
  });

  document.getElementById('stat-concessions-rev').textContent = `$${concessionRev.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  document.getElementById('concessions-orders-count').textContent = `${STATE.simulation.concessionsSalesCount} purchases recorded`;

  // Sidebar dynamic stats
  document.getElementById('sidebar-gates-open').textContent = STATE.systemStatus === 'EMERGENCY' ? '0/16 (LOCKED)' : '16/16';
  document.getElementById('sidebar-security-status').textContent = STATE.systemStatus === 'EMERGENCY' ? 'Evacuation Alert' : 'Active';

  // Current Live event overview update
  document.getElementById('event-tickets-sold-summary').textContent = `${totalOcc.toLocaleString()} Checked-in Fans`;

  // Dynamic ticket Target progress ring
  const monthlyGoal = 2500000;
  const currentSalesTotal = totalTicketRev + concessionRev;
  const targetPct = Math.min(100, Math.round((currentSalesTotal / monthlyGoal) * 100));
  
  document.getElementById('ticket-target-pct').textContent = `${targetPct}%`;
  document.getElementById('ticket-current-sales-usd').textContent = `$${currentSalesTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

// --- Dynamic Charts Configurations ---
function initCharts() {
  const ctxInflow = document.getElementById('turnstile-chart').getContext('2d');
  
  turnstileChart = new Chart(ctxInflow, {
    type: 'line',
    data: {
      labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      datasets: [{
        label: 'Inflow rate (fans/min)',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { display: false },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#9ca3af', font: { size: 9 } }
        }
      }
    }
  });

  const ctxPie = document.getElementById('concession-pie-chart').getContext('2d');
  
  concessionsChart = new Chart(ctxPie, {
    type: 'doughnut',
    data: {
      labels: ['Food', 'Beverages', 'Merchandise'],
      datasets: [{
        data: [6545, 6075, 9350],
        backgroundColor: ['#10b981', '#3b82f6', '#8b5cf6'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { color: '#9ca3af', boxWidth: 12, font: { size: 11 } }
        }
      }
    }
  });
}

function updateTurnstileInflowChart(newRate) {
  if (!turnstileChart) return;
  
  // Shift chart values
  const dataset = turnstileChart.data.datasets[0].data;
  dataset.shift();
  dataset.push(newRate);

  // Update rates label
  document.getElementById('stat-turnstile-rate').textContent = `${newRate} / min`;

  turnstileChart.update();
}

function updateConcessionsPieChart() {
  if (!concessionsChart) return;

  const totals = { Food: 0, Beverages: 0, Merchandise: 0 };
  
  STATE.concessions.forEach(c => {
    if (totals[c.type] !== undefined) {
      totals[c.type] += c.revenue;
    }
  });

  concessionsChart.data.datasets[0].data = [
    totals.Food,
    totals.Beverages,
    totals.Merchandise
  ];
  concessionsChart.update();
}

// --- Render Table Methods ---
function renderEventsTable() {
  const tbody = document.getElementById('events-table-body');
  tbody.innerHTML = '';

  STATE.events.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <strong style="color: white; display: block;">${e.homeTeam} vs ${e.awayTeam}</strong>
        <span style="font-size: 0.7rem; color: #9ca3af;">Base price: $${e.basePrice}</span>
      </td>
      <td>${e.date} (${e.time})</td>
      <td>${e.capacityLimit.toLocaleString()}</td>
      <td>${e.ticketsSold.toLocaleString()}</td>
      <td>$${e.basePrice}</td>
      <td><strong>$${e.revenue.toLocaleString()}</strong></td>
      <td>
        <span class="status-tag ${e.status === 'LIVE MATCH' || e.status === 'PRE-MATCH INGRESS' ? 'danger' : 'success'}">${e.status}</span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderConcessionsTable() {
  const tbody = document.getElementById('concession-table-body');
  tbody.innerHTML = '';

  STATE.concessions.forEach(c => {
    const tr = document.createElement('tr');
    
    // Status text
    let statusClass = 'success';
    let statusText = 'Normal';
    if (c.stock === 0) {
      statusClass = 'danger';
      statusText = 'OUT OF STOCK';
    } else if (c.stock < 10) {
      statusClass = 'warning';
      statusText = 'LOW STOCK';
    }

    tr.innerHTML = `
      <td><strong>${c.name}</strong></td>
      <td>${c.type}</td>
      <td>${c.topItem}</td>
      <td>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div class="progress-bar-small" style="width: 50px;"><div style="width: ${c.stock}%; background: var(--accent-green)"></div></div>
          <span>${c.stock} pcs</span>
        </div>
      </td>
      <td>${c.sales} sales</td>
      <td><span class="status-tag ${statusClass}">${statusText}</span></td>
      <td><strong>$${c.revenue.toLocaleString()}</strong></td>
    `;
    tbody.appendChild(tr);
  });
}

// --- Modal Popup Dialog Form ---
function initEventModal() {
  const modal = document.getElementById('event-modal');
  const openBtn = document.getElementById('open-new-event-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const cancelBtn = document.getElementById('btn-cancel-modal');
  const form = document.getElementById('new-event-form');

  openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  
  const closeModal = () => modal.classList.add('hidden');
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const teamA = document.getElementById('modal-team-a').value;
    const teamB = document.getElementById('modal-team-b').value;
    const dateVal = document.getElementById('modal-date').value;
    const timeVal = document.getElementById('modal-time').value;
    const priceVal = parseFloat(document.getElementById('modal-ticket-price').value);

    // Mock sales parameters
    const tickets = Math.floor(Math.random() * 20000) + 10000;
    const newEvent = {
      id: STATE.events.length + 1,
      homeTeam: teamA,
      awayTeam: teamB,
      logoA: teamA.substring(0,2).toUpperCase(),
      logoB: teamB.substring(0,2).toUpperCase(),
      date: dateVal,
      time: timeVal,
      capacityLimit: 60000,
      ticketsSold: tickets,
      basePrice: priceVal,
      revenue: tickets * priceVal,
      status: 'SCHEDULED'
    };

    STATE.events.push(newEvent);
    renderEventsTable();
    closeModal();
    form.reset();

    logConsole(`New event scheduled: ${teamA} vs ${teamB} on ${dateVal}`);
    addNotification('success', `New match scheduled: ${teamA} vs ${teamB}`);
  });
}
