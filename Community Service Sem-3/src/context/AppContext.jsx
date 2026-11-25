import { createContext, useContext, useReducer, useCallback } from 'react';
import { PATIENTS, RISK_ALERTS, EHR_LOGS } from '../data/mockData';

const AppContext = createContext(null);

const initialState = {
  patients: PATIENTS,
  riskAlerts: RISK_ALERTS,
  ehrLogs: EHR_LOGS,
  activeWard: 'all',
  activeView: 'live-ward',
  searchQuery: '',
  selectedPatient: null,
  riskPanelOpen: false,
  selectedAlert: null,
  prescriptionModalOpen: false,
  notifications: RISK_ALERTS.filter(a => a.status === 'active').length,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_WARD':
      return { ...state, activeWard: action.payload };

    case 'SET_ACTIVE_VIEW':
      return { ...state, activeView: action.payload };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SELECT_PATIENT':
      return { ...state, selectedPatient: action.payload };

    case 'TOGGLE_PATIENT':
      return {
        ...state,
        selectedPatient: state.selectedPatient === action.payload ? null : action.payload,
      };

    case 'ADMINISTER_DOSE': {
      const { patientId, timeSlot, medication } = action.payload;
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const updatedPatients = state.patients.map(p => {
        if (p.id !== patientId) return p;
        return {
          ...p,
          schedule: p.schedule.map(s => {
            if (s.timeSlot === timeSlot && s.medication === medication && s.status !== 'administered') {
              return { ...s, status: 'administered', administeredBy: 'Current User', administeredAt: timeStr };
            }
            return s;
          }),
        };
      });
      return { ...state, patients: updatedPatients };
    }

    case 'OPEN_RISK_PANEL':
      return { ...state, riskPanelOpen: true, selectedAlert: action.payload };

    case 'CLOSE_RISK_PANEL':
      return { ...state, riskPanelOpen: false, selectedAlert: null };

    case 'OPEN_PRESCRIPTION_MODAL':
      return { ...state, prescriptionModalOpen: true };

    case 'CLOSE_PRESCRIPTION_MODAL':
      return { ...state, prescriptionModalOpen: false };

    case 'ADD_PRESCRIPTION': {
      const { patientId, medication, dosage, route, timeSlot } = action.payload;
      const updatedPatients = state.patients.map(p => {
        if (p.id !== patientId) return p;
        return {
          ...p,
          schedule: [...p.schedule, { timeSlot, medication, dosage, route, status: 'pending' }],
        };
      });
      const newLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        source: 'Manual Entry',
        patient: state.patients.find(p => p.id === patientId)?.name || patientId,
        patientId,
        medication: `${medication} ${dosage}`,
        action: 'Prescription Added',
        status: 'success',
        processingTime: '50ms',
      };
      return {
        ...state,
        patients: updatedPatients,
        ehrLogs: [newLog, ...state.ehrLogs],
        prescriptionModalOpen: false,
      };
    }

    case 'DISMISS_ALERT': {
      const alertId = action.payload;
      const updatedAlerts = state.riskAlerts.map(a =>
        a.id === alertId ? { ...a, status: 'dismissed' } : a
      );
      return {
        ...state,
        riskAlerts: updatedAlerts,
        notifications: updatedAlerts.filter(a => a.status === 'active').length,
        riskPanelOpen: false,
        selectedAlert: null,
      };
    }

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const filteredPatients = useCallback(() => {
    let pts = state.patients;
    if (state.activeWard !== 'all') {
      pts = pts.filter(p => p.ward === state.activeWard);
    }
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      pts = pts.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.schedule.some(s => s.medication.toLowerCase().includes(q))
      );
    }
    return pts;
  }, [state.patients, state.activeWard, state.searchQuery]);

  return (
    <AppContext.Provider value={{ state, dispatch, filteredPatients }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
