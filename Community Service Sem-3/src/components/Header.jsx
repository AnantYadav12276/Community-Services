import { Search, Bell, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WARDS } from '../data/mockData';

export default function Header() {
  const { state, dispatch } = useApp();

  return (
    <header className="header">
      <div className="header-left">
        {/* Ward Selector */}
        <div className="header-ward-selector">
          <label className="header-ward-label">Ward</label>
          <div className="header-ward-dropdown-wrapper">
            <select
              value={state.activeWard}
              onChange={e => dispatch({ type: 'SET_ACTIVE_WARD', payload: e.target.value })}
              className="header-ward-dropdown"
            >
              <option value="all">All Wards</option>
              {WARDS.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
            <ChevronDown size={14} className="header-ward-dropdown-icon" />
          </div>
        </div>
      </div>

      <div className="header-right">
        {/* Search */}
        <div className="header-search">
          <Search size={16} className="header-search-icon" />
          <input
            type="text"
            placeholder="Search patients, medications, IDs..."
            value={state.searchQuery}
            onChange={e => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
            className="header-search-input"
          />
        </div>

        {/* Alert Bell */}
        <button
          className="header-bell"
          onClick={() => {
            if (state.riskAlerts.filter(a => a.status === 'active').length > 0) {
              dispatch({ type: 'OPEN_RISK_PANEL', payload: state.riskAlerts.find(a => a.status === 'active') });
            }
          }}
        >
          <Bell size={20} />
          {state.notifications > 0 && (
            <span className="header-bell-badge">{state.notifications}</span>
          )}
        </button>

        {/* Date */}
        <div className="header-date">
          <p className="header-date-label">Today</p>
          <p className="header-date-value">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>
    </header>
  );
}
