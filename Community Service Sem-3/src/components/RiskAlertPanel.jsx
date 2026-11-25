import { X, ShieldAlert, AlertTriangle, Clock, FileText, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export default function RiskAlertPanel() {
  const { state, dispatch } = useApp();
  const [overrideNote, setOverrideNote] = useState('');
  const [showOverrideInput, setShowOverrideInput] = useState(false);
  const alert = state.selectedAlert;

  if (!state.riskPanelOpen || !alert) return null;

  const severityConfig = {
    critical: { className: 'risk-severity--critical', label: 'CRITICAL' },
    high: { className: 'risk-severity--high', label: 'HIGH' },
    medium: { className: 'risk-severity--medium', label: 'MEDIUM' },
  };

  const sev = severityConfig[alert.severity] || severityConfig.medium;

  const riskScoreColor = alert.riskScore >= 80 ? '#f43f5e' : alert.riskScore >= 60 ? '#f97316' : '#eab308';
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (alert.riskScore / 100) * circumference;

  const handleOverride = () => {
    if (overrideNote.trim()) {
      dispatch({ type: 'DISMISS_ALERT', payload: alert.id });
      setOverrideNote('');
      setShowOverrideInput(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="risk-panel-backdrop" onClick={() => dispatch({ type: 'CLOSE_RISK_PANEL' })} />

      {/* Panel */}
      <div className="risk-panel">
        {/* Header */}
        <div className="risk-panel-header">
          <div className="risk-panel-header-left">
            <ShieldAlert size={20} className="risk-panel-header-icon" />
            <div>
              <h2 className="risk-panel-title">ML Risk Alert</h2>
              <p className="risk-panel-subtitle">{alert.patientName} • {alert.patientId}</p>
            </div>
          </div>
          <button onClick={() => dispatch({ type: 'CLOSE_RISK_PANEL' })} className="risk-panel-close">
            <X size={20} />
          </button>
        </div>

        {/* Severity + Score */}
        <div className="risk-panel-score-section">
          <div className="risk-panel-gauge">
            <svg viewBox="0 0 120 120" className="risk-gauge-svg">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#1e293b" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="54" fill="none"
                stroke={riskScoreColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 60 60)"
                className="risk-gauge-progress"
              />
              <text x="60" y="55" textAnchor="middle" className="risk-gauge-value" fill={riskScoreColor}>
                {alert.riskScore}%
              </text>
              <text x="60" y="72" textAnchor="middle" className="risk-gauge-label" fill="#94a3b8">
                Risk Score
              </text>
            </svg>
          </div>
          <div className="risk-panel-meta">
            <span className={`risk-severity-badge ${sev.className}`}>
              <AlertTriangle size={12} /> {sev.label}
            </span>
            <h3 className="risk-panel-alert-title">{alert.title}</h3>
            <p className="risk-panel-alert-type">
              <Clock size={12} /> {alert.type} • Slot: {alert.timeSlot}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="risk-panel-section">
          <p className="risk-panel-description">{alert.description}</p>
        </div>

        {/* Conflict */}
        <div className="risk-panel-section">
          <h4 className="risk-panel-section-title">
            <AlertTriangle size={14} /> Conflict Analysis
          </h4>
          <div className="risk-panel-conflict">
            <div className="risk-conflict-drug">{alert.drugA}</div>
            <ArrowRight size={16} className="risk-conflict-arrow" />
            <div className="risk-conflict-drug">{alert.drugB}</div>
          </div>
          <ul className="risk-panel-details-list">
            {alert.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="risk-panel-section">
          <h4 className="risk-panel-section-title">
            <FileText size={14} /> Recommendations
          </h4>
          <ul className="risk-panel-recommendations">
            {alert.recommendations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        {/* Override Input */}
        {showOverrideInput && (
          <div className="risk-panel-section">
            <label className="risk-override-label">Clinician Override Note</label>
            <textarea
              className="risk-override-textarea"
              rows={3}
              placeholder="Enter clinical justification for override..."
              value={overrideNote}
              onChange={e => setOverrideNote(e.target.value)}
            />
          </div>
        )}

        {/* Actions */}
        <div className="risk-panel-actions">
          {!showOverrideInput ? (
            <button className="risk-action-btn risk-action-btn--override" onClick={() => setShowOverrideInput(true)}>
              Override with Note
            </button>
          ) : (
            <button
              className="risk-action-btn risk-action-btn--confirm"
              onClick={handleOverride}
              disabled={!overrideNote.trim()}
            >
              Confirm Override
            </button>
          )}
          <button
            className="risk-action-btn risk-action-btn--reschedule"
            onClick={() => dispatch({ type: 'DISMISS_ALERT', payload: alert.id })}
          >
            Reschedule Dose
          </button>
          <button
            className="risk-action-btn risk-action-btn--cancel"
            onClick={() => dispatch({ type: 'DISMISS_ALERT', payload: alert.id })}
          >
            Cancel Prescription
          </button>
        </div>
      </div>
    </>
  );
}
