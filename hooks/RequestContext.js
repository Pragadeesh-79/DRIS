import React, { createContext, useContext, useState, useCallback } from 'react';

const RequestContext = createContext();

export const useRequests = () => useContext(RequestContext);

const INITIAL_REQUESTS = [
  {
    id: 'REQ-001',
    type: 'Flood',
    location: 'T. Nagar, Chennai',
    coords: { lat: 13.0418, lng: 80.2341 },
    time: '02:45 AM',
    priority: 'High',
    message: 'Water entering ground floor, need rescue boat.',
    status: 'accepted',
    assignedTeam: 'NDRF Alpha',
    eta: '15 min',
    resources: ['Rescue Boat', 'Ambulance'],
  },
  {
    id: 'REQ-002',
    type: 'Medical',
    location: 'Kodambakkam, Chennai',
    coords: { lat: 13.0524, lng: 80.2258 },
    time: '02:30 AM',
    priority: 'Critical',
    message: 'Elderly person needs oxygen supply urgently.',
    status: 'deployed',
    assignedTeam: 'Medical Unit M3',
    eta: '8 min',
    resources: ['Ambulance', 'Medical Kit'],
  },
  {
    id: 'REQ-003',
    type: 'Rescue',
    location: 'Velachery, Chennai',
    coords: { lat: 12.9815, lng: 80.2180 },
    time: '01:50 AM',
    priority: 'High',
    message: 'Family stranded on roof, water rising.',
    status: 'en_route',
    assignedTeam: 'NDRF Bravo',
    eta: '5 min',
    resources: ['Rescue Boat', 'Life Jackets'],
  },
];

let nextId = 4;

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  const addRequest = useCallback((type, message, extraInfo = {}) => {
    const id = `REQ-${String(nextId++).padStart(3, '0')}`;
    const now = new Date();
    const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();

    const priorityMap = {
      Medical: 'Critical',
      Fire: 'Critical',
      Rescue: 'High',
      Flood: 'High',
      Food: 'Medium',
      Other: 'Low',
    };

    const latJitter = (Math.random() - 0.5) * 0.02;
    const lngJitter = (Math.random() - 0.5) * 0.02;
    const lat = 13.0827 + latJitter;
    const lng = 80.2707 + lngJitter;

    const newReq = {
      id,
      type,
      location: `Auto-detected: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`,
      coords: { lat, lng },
      time,
      priority: priorityMap[type] || 'Medium',
      message: message || `${type} emergency reported.`,
      status: 'pending',
      assignedTeam: null,
      eta: null,
      resources: null,
      ...extraInfo,
    };

    setRequests((prev) => [newReq, ...prev]);
    return newReq;
  }, []);

  const acceptRequest = useCallback((id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: 'accepted', assignedTeam: 'NDRF Alpha', eta: '20 min' }
          : r
      )
    );
  }, []);

  const assignTeam = useCallback((id, team) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, assignedTeam: team } : r))
    );
  }, []);

  const deployResources = useCallback((id, resources) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: 'deployed', resources, eta: '15 min' }
          : r
      )
    );
  }, []);

  const markEnRoute = useCallback((id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'en_route', eta: '8 min' } : r
      )
    );
  }, []);

  const resolveRequest = useCallback((id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'resolved', eta: null } : r))
    );
  }, []);

  const rejectRequest = useCallback((id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    );
  }, []);

  return (
    <RequestContext.Provider
      value={{
        requests,
        addRequest,
        acceptRequest,
        assignTeam,
        deployResources,
        markEnRoute,
        resolveRequest,
        rejectRequest,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};
