export const MOCK_DATA = {
  alerts: [
    { id: 'ALT-001', title: 'Flash Flood Warning', severity: 'critical', location: 'Chennai, Tamil Nadu', time: '2026-08-20 02:05', description: 'Water levels exceeded danger mark at Adyar River. Immediate evacuation of low-lying areas ordered.' },
    { id: 'ALT-002', title: 'Cyclone Landfall Expected', severity: 'high', location: 'Puri, Odisha', time: '2026-08-20 01:30', description: 'Cyclone expected to make landfall within 12 hours. Wind speeds up to 150 km/h.' },
    { id: 'ALT-003', title: 'Aftershock Advisory', severity: 'medium', location: 'Guwahati, Assam', time: '2026-08-19 22:10', description: 'Aftershocks of magnitude 3.2–4.0 expected in the next 24 hours.' },
    { id: 'ALT-004', title: 'Power Grid Failure', severity: 'high', location: 'Kolkata, West Bengal', time: '2026-08-19 20:45', description: 'Major substation failure affecting 2.3 lakh households.' },
    { id: 'ALT-005', title: 'Road Closure — NH48', severity: 'low', location: 'Pune, Maharashtra', time: '2026-08-19 18:00', description: 'Landslide debris cleared. One lane operational, expect delays.' },
  ],
  incidents: [
    { id: 'INC-2401', type: 'Flood', title: 'Chennai Flood', location: 'Chennai, TN', severity: 'High', status: 'Active', updated: '10 min ago', affected: 12500, teams: 8 },
    { id: 'INC-2402', type: 'Cyclone', title: 'Odisha Cyclone', location: 'Bhubaneswar, OD', severity: 'Medium', status: 'Monitoring', updated: '2 hrs ago', affected: 45000, teams: 12 },
    { id: 'INC-2403', type: 'Earthquake', title: 'Assam Earthquake', location: 'Guwahati, AS', severity: 'Low', status: 'Resolved', updated: '1 day ago', affected: 3200, teams: 3 },
  ],
  resources: [
    { id: 'RES-001', name: 'Ambulance Unit A1', type: 'Ambulance', status: 'Deployed', location: 'Chennai, TN', assigned: 'INC-2401', capacity: '75%' },
    { id: 'RES-002', name: 'NDRF Team Bravo', type: 'Rescue', status: 'Standby', location: 'NDRF HQ, Arakkonam', assigned: '—', capacity: '100%' },
    { id: 'RES-003', name: 'Relief Kit Batch 47', type: 'Relief', status: 'In Transit', location: 'En route to Chennai', assigned: 'INC-2401', capacity: '40%' },
    { id: 'RES-004', name: 'Medical Camp M3', type: 'Hospital', status: 'Active', location: 'Puri, OD', assigned: 'INC-2402', capacity: '62%' },
    { id: 'RES-005', name: 'Helicopter H2', type: 'Rescue', status: 'Deployed', location: 'Guwahati, AS', assigned: 'INC-2403', capacity: '50%' },
  ],
  predictions: [
    { id: 'PRD-01', type: 'Flood', label: 'Flood probability', value: 0.85, displayValue: '85%' },
    { id: 'PRD-02', type: 'Cyclone', label: 'Cyclone probability', value: 0.40, displayValue: '40%' },
    { id: 'PRD-03', type: 'Earthquake', label: 'Earthquake probability', value: 0.15, displayValue: '15%' },
  ],
  recommendations: [
    { id: 'REC-01', text: 'Deploy rescue teams to Chennai Sector B', priority: 'High' },
    { id: 'REC-02', text: 'Open relief camps at 3 additional locations in Odisha', priority: 'High' },
    { id: 'REC-03', text: 'Issue emergency alert for coastal districts of Tamil Nadu', priority: 'Medium' },
    { id: 'REC-04', text: 'Allocate medical resources from Bangalore reserve', priority: 'Medium' },
  ],
  recentPredictions: [
    { id: 'RP-01', title: 'Adyar River embankment breach', location: 'Chennai North', confidence: '94%', status: 'Verified', time: 'Today, 08:30' },
    { id: 'RP-02', title: 'Urban flooding — T. Nagar', location: 'Chennai Central', confidence: '87%', status: 'Verified', time: 'Today, 07:15' },
    { id: 'RP-03', title: 'Wind damage to coastal structures', location: 'Puri Coast', confidence: '72%', status: 'Pending', time: 'Yesterday, 22:40' },
  ],
  stats: {
    activeIncidents: 3,
    resourcesDeployed: 28,
    criticalAlerts: 2,
    peopleAffected: 60700,
  },

  // ── New data for dual-workspace ──

  hospitals: [
    { id: 'H-01', name: 'Rajiv Gandhi Government Hospital', coords: { lat: 13.0878, lng: 80.2785 }, distance: '2.1 km', beds: 120, available: 34, phone: '044-25305000' },
    { id: 'H-02', name: 'Apollo Hospital, Greams Road', coords: { lat: 13.0606, lng: 80.2555 }, distance: '3.4 km', beds: 200, available: 67, phone: '044-28293333' },
    { id: 'H-03', name: 'Stanley Medical College Hospital', coords: { lat: 13.1114, lng: 80.2870 }, distance: '4.8 km', beds: 180, available: 22, phone: '044-25281665' },
    { id: 'H-04', name: 'SRMC Hospital', coords: { lat: 12.9887, lng: 80.2271 }, distance: '6.2 km', beds: 150, available: 51, phone: '044-44002000' },
    { id: 'H-05', name: 'Institute of Child Health', coords: { lat: 13.0762, lng: 80.2773 }, distance: '1.9 km', beds: 80, available: 15, phone: '044-28194000' },
  ],

  shelters: [
    { id: 'S-01', name: 'Marina Beach Community Hall', coords: { lat: 13.0500, lng: 80.2824 }, distance: '1.3 km', capacity: 500, occupancy: 320, status: 'Open' },
    { id: 'S-02', name: 'T. Nagar Corporation School', coords: { lat: 13.0418, lng: 80.2341 }, distance: '2.8 km', capacity: 300, occupancy: 298, status: 'Full' },
    { id: 'S-03', name: 'Kodambakkam Relief Center', coords: { lat: 13.0524, lng: 80.2258 }, distance: '3.5 km', capacity: 400, occupancy: 180, status: 'Open' },
    { id: 'S-04', name: 'Velachery Multipurpose Hall', coords: { lat: 12.9815, lng: 80.2180 }, distance: '5.1 km', capacity: 250, occupancy: 95, status: 'Open' },
    { id: 'S-05', name: 'Adyar Community Center', coords: { lat: 13.0063, lng: 80.2574 }, distance: '4.0 km', capacity: 350, occupancy: 350, status: 'Full' },
  ],

  teams: [
    { id: 'T-01', name: 'NDRF Alpha', type: 'Rescue', members: 12, status: 'Deployed', location: 'T. Nagar' },
    { id: 'T-02', name: 'NDRF Bravo', type: 'Rescue', members: 10, status: 'En Route', location: 'Velachery' },
    { id: 'T-03', name: 'Medical Unit M3', type: 'Medical', members: 6, status: 'Deployed', location: 'Kodambakkam' },
    { id: 'T-04', name: 'Fire Dept. Unit 7', type: 'Fire', members: 8, status: 'Standby', location: 'Station HQ' },
    { id: 'T-05', name: 'Civil Defense C1', type: 'Relief', members: 15, status: 'Standby', location: 'SDMA Office' },
  ],

  resourcePool: [
    { key: 'ambulances', name: 'Ambulances', icon: 'ambulance', available: 35, deployed: 12 },
    { key: 'rescue', name: 'Rescue Teams', icon: 'account-group', available: 8, deployed: 3 },
    { key: 'medical', name: 'Medical Units', icon: 'medical-bag', available: 15, deployed: 6 },
    { key: 'camps', name: 'Relief Camps', icon: 'tent', available: 10, deployed: 5 },
  ],
};
