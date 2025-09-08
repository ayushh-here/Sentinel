// Sentinel Disaster Monitoring System - JavaScript

// Application data
const appData = {
  alerts: [
    {
      id: "ALT001",
      type: "Flood",
      severity: "Critical",
      location: "Mumbai, Maharashtra",
      coordinates: [19.0760, 72.8777],
      time: "2025-09-08 14:30",
      source: "IoT Sensors",
      description: "Water level rising rapidly in Mithi River basin",
      status: "Active",
      affectedPopulation: 25000
    },
    {
      id: "ALT002", 
      type: "Earthquake",
      severity: "High",
      location: "Delhi NCR",
      coordinates: [28.6139, 77.2090],
      time: "2025-09-08 13:45",
      source: "AI Prediction Model",
      description: "Seismic activity detected, magnitude 4.2 predicted",
      status: "Monitoring",
      affectedPopulation: 50000
    },
    {
      id: "ALT003",
      type: "Cyclone",
      severity: "Medium",
      location: "Visakhapatnam, Andhra Pradesh", 
      coordinates: [17.6868, 83.2185],
      time: "2025-09-08 12:15",
      source: "Weather Station",
      description: "Cyclonic formation detected 200km offshore",
      status: "Watch",
      affectedPopulation: 15000
    }
  ],
  citizenReports: [
    {
      id: "CR001",
      type: "Flood",
      reporter: "Raj Singh",
      location: "Andheri, Mumbai",
      coordinates: [19.1136, 72.8697],
      time: "2025-09-08 14:45",
      description: "Roads completely flooded, unable to move vehicles",
      photos: ["flood_andheri_1.jpg", "flood_andheri_2.jpg"],
      verificationStatus: "Verified via Google Lens",
      locationVerified: true,
      priority: "High"
    },
    {
      id: "CR002",
      type: "Fire", 
      reporter: "Priya Sharma",
      location: "Connaught Place, Delhi",
      coordinates: [28.6304, 77.2177],
      time: "2025-09-08 11:30",
      description: "Smoke visible from building, fire department needed",
      photos: ["fire_cp_1.jpg"],
      verificationStatus: "Pending Verification",
      locationVerified: true,
      priority: "Critical"
    },
    {
      id: "CR003",
      type: "Landslide",
      reporter: "Anonymous",
      location: "Shimla, Himachal Pradesh", 
      coordinates: [31.1048, 77.1734],
      time: "2025-09-08 09:20",
      description: "Road blocked due to landslide after heavy rains",
      photos: ["landslide_shimla_1.jpg"],
      verificationStatus: "Rejected - Location Mismatch", 
      locationVerified: false,
      priority: "Medium"
    }
  ],
  responseTeams: [
    {
      id: "RT001",
      type: "Fire Brigade",
      location: "Bandra Fire Station",
      coordinates: [19.0596, 72.8295],
      status: "Deployed",
      destination: "Andheri Flood Zone",
      eta: "15 minutes",
      personnel: 8
    },
    {
      id: "RT002",
      type: "NDRF Team",
      location: "Vasant Kunj",
      coordinates: [28.5244, 77.1590], 
      status: "Standby",
      destination: "Delhi NCR",
      eta: "30 minutes",
      personnel: 25
    },
    {
      id: "RT003",
      type: "Medical Team",
      location: "King George Hospital",
      coordinates: [17.7231, 83.3106],
      status: "Ready",
      destination: "Visakhapatnam",
      eta: "10 minutes", 
      personnel: 12
    }
  ],
  guidelines: [
    {
      disaster: "flood",
      doList: ["Move to higher ground", "Turn off electricity", "Keep emergency kit ready", "Follow official evacuation routes"],
      dontList: ["Don't walk through flowing water", "Don't drive through flooded areas", "Don't touch electrical equipment", "Don't drink flood water"]
    },
    {
      disaster: "earthquake",
      doList: ["Drop, Cover, Hold On", "Stay away from windows", "Exit building if safe", "Check for injuries"],
      dontList: ["Don't use elevators", "Don't stand in doorways", "Don't run during shaking", "Don't light matches"]
    },
    {
      disaster: "fire", 
      doList: ["Call fire department immediately", "Evacuate quickly", "Crawl under smoke", "Check doors for heat"],
      dontList: ["Don't use elevators", "Don't open hot doors", "Don't go back inside", "Don't break windows unnecessarily"]
    }
  ]
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Sentinel application...');
  
  initNavigation();
  populateAlerts();
  populateCitizenReports();
  populateResponseTeams();
  populateGuidelines('flood');
  initChart();
  initModal();
  initMapMarkers();
  initActionButtons();
  startRealTimeUpdates();
  
  console.log('Application initialized successfully');
});

// Navigation functionality
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');
  
  console.log('Found navigation buttons:', navButtons.length);
  console.log('Found sections:', sections.length);
  
  navButtons.forEach((button, index) => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Navigation clicked:', this.getAttribute('data-section'));
      
      const targetSection = this.getAttribute('data-section');
      showSection(targetSection);
      
      // Update active nav button
      navButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  console.log('Switching to section:', sectionId);
  
  sections.forEach(section => {
    section.classList.remove('active');
    section.style.display = 'none';
  });
  
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    targetSection.style.display = 'block';
    console.log('Section activated:', sectionId);
  } else {
    console.error('Section not found:', sectionId);
  }
}

// Populate alerts section
function populateAlerts() {
  const alertsGrid = document.getElementById('alertsGrid');
  if (!alertsGrid) {
    console.error('Alerts grid not found');
    return;
  }
  
  alertsGrid.innerHTML = '';
  
  appData.alerts.forEach(alert => {
    const alertCard = createAlertCard(alert);
    alertsGrid.appendChild(alertCard);
  });
  
  console.log('Populated alerts:', appData.alerts.length);
}

function createAlertCard(alert) {
  const card = document.createElement('div');
  card.className = `alert-card ${alert.severity.toLowerCase()}`;
  card.style.cursor = 'pointer';
  card.innerHTML = `
    <div class="alert-header">
      <div class="alert-type">${alert.type}</div>
      <span class="alert-severity ${alert.severity.toLowerCase()}">${alert.severity}</span>
    </div>
    <div class="alert-body">
      <div class="alert-location">📍 ${alert.location}</div>
      <div class="alert-description">${alert.description}</div>
      <div class="alert-meta">
        <span>Source: ${alert.source}</span>
        <span>${alert.time}</span>
      </div>
    </div>
  `;
  
  card.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Alert card clicked:', alert.id);
    showAlertDetails(alert);
  });
  
  return card;
}

function showAlertDetails(alert) {
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  
  modalTitle.textContent = `${alert.type} Alert - ${alert.severity}`;
  modalBody.innerHTML = `
    <div class="alert-details">
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Location:</strong> ${alert.location}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Time:</strong> ${alert.time}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Source:</strong> ${alert.source}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Status:</strong> ${alert.status}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Affected Population:</strong> ${alert.affectedPopulation.toLocaleString()}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Description:</strong> ${alert.description}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Coordinates:</strong> ${alert.coordinates[0]}, ${alert.coordinates[1]}
      </div>
    </div>
    <div style="margin-top: 20px; display: flex; gap: 12px;">
      <button class="btn btn--primary deploy-response-btn" data-alert-id="${alert.id}">Deploy Response Team</button>
      <button class="btn btn--secondary broadcast-alert-btn" data-alert-id="${alert.id}">Broadcast Alert</button>
    </div>
  `;
  showModal();
}

// Populate citizen reports
function populateCitizenReports() {
  const reportsGrid = document.getElementById('reportsGrid');
  if (!reportsGrid) {
    console.error('Reports grid not found');
    return;
  }
  
  reportsGrid.innerHTML = '';
  
  appData.citizenReports.forEach(report => {
    const reportCard = createReportCard(report);
    reportsGrid.appendChild(reportCard);
  });
  
  console.log('Populated citizen reports:', appData.citizenReports.length);
}

function createReportCard(report) {
  const card = document.createElement('div');
  card.className = 'report-card';
  card.style.cursor = 'pointer';
  
  const verificationClass = report.verificationStatus.includes('Verified') ? 'verified' : 
                           report.verificationStatus.includes('Pending') ? 'pending' : 'rejected';
  
  card.innerHTML = `
    <div class="report-header">
      <div class="report-info">
        <h4>${report.type} Report</h4>
        <div class="report-meta">
          By: ${report.reporter} | ${report.time}<br>
          📍 ${report.location}
        </div>
      </div>
      <span class="verification-badge ${verificationClass}">
        ${report.verificationStatus}
      </span>
    </div>
    <div class="report-body">
      <div class="report-description">${report.description}</div>
      <div class="report-actions">
        <button class="btn btn--sm btn--primary view-report-btn" data-report-id="${report.id}">View Details</button>
        ${verificationClass === 'pending' ? '<button class="btn btn--sm btn--secondary verify-report-btn" data-report-id="' + report.id + '">Verify</button>' : ''}
      </div>
    </div>
  `;
  
  card.addEventListener('click', function(e) {
    e.preventDefault();
    if (!e.target.classList.contains('btn')) {
      console.log('Report card clicked:', report.id);
      viewReportDetails(report.id);
    }
  });
  
  return card;
}

function viewReportDetails(reportId) {
  const report = appData.citizenReports.find(r => r.id === reportId);
  if (!report) return;
  
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  
  modalTitle.textContent = `Citizen Report - ${report.type}`;
  modalBody.innerHTML = `
    <div class="report-details">
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Reporter:</strong> ${report.reporter}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Location:</strong> ${report.location}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Time:</strong> ${report.time}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Priority:</strong> ${report.priority}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Verification Status:</strong> ${report.verificationStatus}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Location Verified:</strong> ${report.locationVerified ? 'Yes (Google Lens)' : 'No'}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Description:</strong> ${report.description}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Photos:</strong> ${report.photos.length} attached (Google Lens verified)
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Coordinates:</strong> ${report.coordinates[0]}, ${report.coordinates[1]}
      </div>
    </div>
    <div style="margin-top: 20px; display: flex; gap: 12px; flex-wrap: wrap;">
      ${report.verificationStatus.includes('Pending') ? 
        '<button class="btn btn--primary approve-report-btn" data-report-id="' + report.id + '">Approve Report</button>' +
        '<button class="btn btn--secondary reject-report-btn" data-report-id="' + report.id + '">Reject Report</button>' : 
        '<button class="btn btn--primary create-alert-btn" data-report-id="' + report.id + '">Create Alert</button>'
      }
    </div>
  `;
  showModal();
}

// Populate response teams
function populateResponseTeams() {
  const teamsList = document.getElementById('teamsList');
  if (!teamsList) {
    console.error('Teams list not found');
    return;
  }
  
  teamsList.innerHTML = '';
  
  appData.responseTeams.forEach(team => {
    const teamItem = createTeamItem(team);
    teamsList.appendChild(teamItem);
  });
  
  console.log('Populated response teams:', appData.responseTeams.length);
}

function createTeamItem(team) {
  const item = document.createElement('div');
  item.className = 'team-item';
  item.style.cursor = 'pointer';
  item.innerHTML = `
    <div class="team-info">
      <h5>${team.type}</h5>
      <div class="team-status">
        ${team.location} → ${team.destination}<br>
        ETA: ${team.eta} | Personnel: ${team.personnel}
      </div>
    </div>
    <span class="team-status-badge ${team.status.toLowerCase()}">${team.status}</span>
  `;
  
  item.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Team item clicked:', team.id);
    showTeamDetails(team);
  });
  
  return item;
}

function showTeamDetails(team) {
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  
  modalTitle.textContent = `${team.type} - ${team.status}`;
  modalBody.innerHTML = `
    <div class="team-details">
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Type:</strong> ${team.type}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Current Location:</strong> ${team.location}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Destination:</strong> ${team.destination}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Status:</strong> ${team.status}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>ETA:</strong> ${team.eta}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Personnel:</strong> ${team.personnel}
      </div>
      <div class="detail-row" style="margin-bottom: 12px;">
        <strong>Coordinates:</strong> ${team.coordinates[0]}, ${team.coordinates[1]}
      </div>
    </div>
    <div style="margin-top: 20px; display: flex; gap: 12px;">
      <button class="btn btn--primary track-team-btn" data-team-id="${team.id}">Track on Google Maps</button>
      <button class="btn btn--secondary contact-team-btn" data-team-id="${team.id}">Contact Team</button>
    </div>
  `;
  showModal();
}

// Guidelines functionality
function populateGuidelines(disaster) {
  const guidelineData = appData.guidelines.find(g => g.disaster === disaster);
  if (!guidelineData) return;
  
  const guidelinesContent = document.getElementById('guidelinesContent');
  if (!guidelinesContent) return;
  
  guidelinesContent.innerHTML = `
    <div class="guideline-section">
      <h5>✅ What TO DO during ${disaster}:</h5>
      <ul class="guideline-list">
        ${guidelineData.doList.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
    <div class="guideline-section">
      <h5>❌ What NOT to do during ${disaster}:</h5>
      <ul class="guideline-list dont">
        ${guidelineData.dontList.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;
}

// Chart initialization
function initChart() {
  const ctx = document.getElementById('riskChart');
  if (!ctx) {
    console.log('Chart canvas not found');
    return;
  }
  
  try {
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Flood Risk', 'Earthquake Risk', 'Fire Risk', 'Cyclone Risk', 'Other'],
        datasets: [{
          data: [35, 25, 20, 15, 5],
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true
            }
          }
        }
      }
    });
    console.log('Chart initialized successfully');
  } catch (error) {
    console.error('Chart initialization error:', error);
  }
}

// Modal functionality
function initModal() {
  const modal = document.getElementById('detailModal');
  const modalClose = document.querySelector('.modal-close');
  
  if (!modal || !modalClose) {
    console.error('Modal elements not found');
    return;
  }
  
  modalClose.addEventListener('click', function(e) {
    e.preventDefault();
    hideModal();
  });
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      hideModal();
    }
  });
  
  // Escape key to close modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      hideModal();
    }
  });
}

function showModal() {
  const modal = document.getElementById('detailModal');
  if (modal) {
    modal.classList.remove('hidden');
    console.log('Modal opened');
  }
}

function hideModal() {
  const modal = document.getElementById('detailModal');
  if (modal) {
    modal.classList.add('hidden');
    console.log('Modal closed');
  }
}

// Initialize map markers
function initMapMarkers() {
  const mapMarkers = document.querySelectorAll('.map-marker');
  console.log('Found map markers:', mapMarkers.length);
  
  mapMarkers.forEach(marker => {
    marker.addEventListener('click', function(e) {
      e.preventDefault();
      const alertId = this.getAttribute('data-alert');
      console.log('Map marker clicked:', alertId);
      
      const alert = appData.alerts.find(a => a.id === alertId);
      if (alert) {
        showAlertDetails(alert);
      }
    });
  });
}

// Initialize action buttons
function initActionButtons() {
  // Dashboard quick action buttons
  const quickActionButtons = document.querySelectorAll('.action-btn');
  quickActionButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const action = this.textContent.trim();
      handleQuickAction(action);
    });
  });
  
  // SOS control buttons
  const sosButtons = document.querySelectorAll('.sos-controls .btn');
  sosButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const action = this.textContent.trim();
      handleSosAction(action);
    });
  });
  
  // Tab buttons for guidelines
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const disaster = this.getAttribute('data-disaster');
      
      // Update active tab
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Update content
      populateGuidelines(disaster);
    });
  });
  
  // Dynamic modal buttons (event delegation)
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('deploy-response-btn')) {
      e.preventDefault();
      const alertId = e.target.getAttribute('data-alert-id');
      deployResponse(alertId);
    } else if (e.target.classList.contains('broadcast-alert-btn')) {
      e.preventDefault();
      const alertId = e.target.getAttribute('data-alert-id');
      broadcastAlert(alertId);
    } else if (e.target.classList.contains('view-report-btn')) {
      e.preventDefault();
      const reportId = e.target.getAttribute('data-report-id');
      viewReportDetails(reportId);
    } else if (e.target.classList.contains('verify-report-btn')) {
      e.preventDefault();
      const reportId = e.target.getAttribute('data-report-id');
      verifyReport(reportId);
    } else if (e.target.classList.contains('approve-report-btn')) {
      e.preventDefault();
      const reportId = e.target.getAttribute('data-report-id');
      approveReport(reportId);
    } else if (e.target.classList.contains('reject-report-btn')) {
      e.preventDefault();
      const reportId = e.target.getAttribute('data-report-id');
      rejectReport(reportId);
    } else if (e.target.classList.contains('create-alert-btn')) {
      e.preventDefault();
      const reportId = e.target.getAttribute('data-report-id');
      createAlertFromReport(reportId);
    } else if (e.target.classList.contains('track-team-btn')) {
      e.preventDefault();
      const teamId = e.target.getAttribute('data-team-id');
      trackTeam(teamId);
    } else if (e.target.classList.contains('contact-team-btn')) {
      e.preventDefault();
      const teamId = e.target.getAttribute('data-team-id');
      contactTeam(teamId);
    }
  });
}

// Action handlers
function handleQuickAction(action) {
  switch(action) {
    case 'Broadcast Alert':
      alert('Critical alert broadcasted to all emergency services and citizens in affected areas');
      break;
    case 'Deploy Team':
      alert('Emergency response team deployment initiated. Teams will be dispatched to critical zones.');
      break;
    case 'Send SOS':
      alert('SOS messages with evacuation guidelines sent to all citizens in affected areas');
      break;
    case 'Update Status':
      alert('System status updated and synchronized with all connected IoT sensors and AI models');
      break;
    default:
      alert(`Action executed: ${action}`);
  }
}

function handleSosAction(action) {
  switch(action) {
    case 'Send Emergency Alert':
      alert('Emergency alert sent to all affected citizens with evacuation instructions and Google Maps routes');
      break;
    case 'Broadcast Guidelines':
      alert('Safety guidelines broadcasted to all registered mobile devices with location-specific instructions');
      break;
    case 'Update Helpline Numbers':
      alert('Helpline numbers updated and distributed to all citizens through the mobile app');
      break;
    default:
      alert(`SOS action executed: ${action}`);
  }
}

function deployResponse(alertId) {
  alert(`Response team deployed for alert ${alertId}. Google Maps integration activated for real-time tracking.`);
  hideModal();
}

function broadcastAlert(alertId) {
  alert(`Alert ${alertId} broadcasted to all affected areas with location-specific evacuation routes via Google Maps.`);
  hideModal();
}

function verifyReport(reportId) {
  alert(`Google Lens verification initiated for report ${reportId}. Location and photo authenticity being verified.`);
  
  // Update report status
  const report = appData.citizenReports.find(r => r.id === reportId);
  if (report) {
    report.verificationStatus = "Verified via Google Lens";
    populateCitizenReports();
  }
}

function approveReport(reportId) {
  alert(`Report ${reportId} approved. Location verified through Google Maps and Google Lens photo verification.`);
  hideModal();
}

function rejectReport(reportId) {
  alert(`Report ${reportId} rejected due to location verification failure or fake photo detection.`);
  hideModal();
}

function createAlertFromReport(reportId) {
  alert(`Official disaster alert created from citizen report ${reportId}. Emergency services notified.`);
  hideModal();
}

function trackTeam(teamId) {
  alert(`Opening Google Maps real-time tracking for team ${teamId}. Live GPS location and route optimization enabled.`);
  hideModal();
}

function contactTeam(teamId) {
  alert(`Establishing communication with team ${teamId}. Radio and mobile connectivity confirmed.`);
  hideModal();
}

// Real-time updates simulation
function startRealTimeUpdates() {
  // Update activity feed every 30 seconds
  setInterval(updateActivityFeed, 30000);
  
  // Update live indicators
  setInterval(updateLiveIndicators, 5000);
  
  console.log('Real-time updates started');
}

function updateActivityFeed() {
  const activities = [
    { time: getCurrentTime(), title: "IoT Sensor Update", desc: "Water level sensors reporting normal levels in Mumbai", status: "success" },
    { time: getCurrentTime(), title: "AI Prediction", desc: "Weather AI model updated with satellite data", status: "info" },
    { time: getCurrentTime(), title: "Team Movement", desc: "NDRF team repositioning to Delhi NCR", status: "warning" },
    { time: getCurrentTime(), title: "Citizen Report", desc: "New flood report received and verified via Google Lens", status: "success" },
    { time: getCurrentTime(), title: "System Update", desc: "Google Maps integration refreshed with live traffic", status: "info" }
  ];
  
  const randomActivity = activities[Math.floor(Math.random() * activities.length)];
  const activityFeed = document.getElementById('activityFeed');
  
  if (activityFeed) {
    const newItem = document.createElement('div');
    newItem.className = 'activity-item';
    newItem.innerHTML = `
      <div class="activity-time">${randomActivity.time}</div>
      <div class="activity-content">
        <div class="activity-title">${randomActivity.title}</div>
        <div class="activity-desc">${randomActivity.desc}</div>
      </div>
      <span class="status status--${randomActivity.status}">Live</span>
    `;
    
    activityFeed.insertBefore(newItem, activityFeed.firstChild);
    
    // Remove old items to keep feed manageable
    if (activityFeed.children.length > 5) {
      activityFeed.removeChild(activityFeed.lastChild);
    }
  }
}

function updateLiveIndicators() {
  const indicators = document.querySelectorAll('.live-indicator');
  indicators.forEach(indicator => {
    indicator.style.opacity = indicator.style.opacity === '0.5' ? '1' : '0.5';
  });
}

function getCurrentTime() {
  const now = new Date();
  return now.getHours().toString().padStart(2, '0') + ':' + 
         now.getMinutes().toString().padStart(2, '0');
}

// Filter functionality
document.addEventListener('change', function(e) {
  if (e.target.classList.contains('filter-select')) {
    console.log('Filter applied:', e.target.value);
    // This would typically filter the alerts based on the selected criteria
    // For now, we'll just log the filter value
  }
});

console.log('Sentinel application script loaded');