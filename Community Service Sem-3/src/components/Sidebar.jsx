import { Activity, CalendarClock, BrainCircuit, FileInput, Pill, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NAV_ITEMS = [
  { id: 'live-ward', label: 'Live Ward View', icon: Activity },
  { id: 'schedule-matrix', label: 'Schedule Matrix', icon: CalendarClock },
  { id: 'ml-analytics', label: 'ML Risk Analytics', icon: BrainCircuit },
  { id: 'ehr-logs', label: 'EHR Ingestion Logs', icon: FileInput },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Pill size={22} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="sidebar-logo-title">MedGuard</h1>
          <p className="sidebar-logo-subtitle">The Signature Hospital</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <p className="sidebar-nav-label">Navigation</p>
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = state.activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => dispatch({ type: 'SET_ACTIVE_VIEW', payload: item.id })}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {isActive && <ChevronRight size={14} className="sidebar-nav-arrow" />}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="sidebar-user">
        <div className="sidebar-user-avatar">RN</div>
        <div>
          <p className="sidebar-user-name">Nurse R. Patel</p>
          <p className="sidebar-user-role">ICU — Shift A</p>
        </div>
      </div>
    </aside>
  );
}
