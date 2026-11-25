import { useApp } from '../context/AppContext';
import { TIME_SLOTS } from '../data/mockData';
import { CalendarClock, Info } from 'lucide-react';
import { useState } from 'react';

const statusColors = {
  administered: { bg: '#065f46', border: '#059669', text: '#a7f3d0' },
  pending: { bg: '#78350f', border: '#d97706', text: '#fde68a' },
  delayed: { bg: '#7c2d12', border: '#ea580c', text: '#fed7aa' },
  'high-risk': { bg: '#881337', border: '#e11d48', text: '#fecdd3' },
  empty: { bg: '#0f172a', border: '#1e293b', text: '#475569' },
};

export default function ScheduleMatrixView() {
  const { state, dispatch, filteredPatients } = useApp();
  const patients = filteredPatients();
  const [hoveredCell, setHoveredCell] = useState(null);

  return (
    <div className="schedule-matrix-view">
      <div className="schedule-header">
        <div>
          <h2 className="schedule-title">
            <CalendarClock size={22} /> Schedule Matrix
          </h2>
          <p className="schedule-subtitle">
            Full-day medication schedule overview — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="schedule-legend">
          {Object.entries(statusColors).filter(([k]) => k !== 'empty').map(([status, colors]) => (
            <div key={status} className="schedule-legend-item">
              <div className="schedule-legend-swatch" style={{ backgroundColor: colors.bg, borderColor: colors.border }} />
              <span className="schedule-legend-label">{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="schedule-grid-wrapper">
        <div className="schedule-grid">
          {/* Header */}
          <div className="schedule-grid-header">
            <div className="schedule-grid-patient-col">Patient</div>
            {TIME_SLOTS.map(slot => (
              <div key={slot} className="schedule-grid-slot-col">{slot}</div>
            ))}
          </div>

          {/* Rows */}
          {patients.map(patient => (
            <div key={patient.id} className="schedule-grid-row">
              <div className="schedule-grid-patient">
                <div className="schedule-patient-avatar-sm">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="schedule-patient-name">{patient.name}</p>
                  <p className="schedule-patient-bed">Bed {patient.bed}</p>
                </div>
              </div>

              {TIME_SLOTS.map(slot => {
                const entries = patient.schedule.filter(s => s.timeSlot === slot);
                const cellKey = `${patient.id}-${slot}`;
                const isHovered = hoveredCell === cellKey;

                if (entries.length === 0) {
                  return (
                    <div key={slot} className="schedule-grid-cell schedule-grid-cell--empty">
                      <span className="schedule-cell-dash">—</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={slot}
                    className="schedule-grid-cell"
                    onMouseEnter={() => setHoveredCell(cellKey)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {entries.map((entry, i) => {
                      const colors = statusColors[entry.status] || statusColors.empty;
                      return (
                        <div
                          key={i}
                          className={`schedule-cell-block ${entry.status === 'high-risk' ? 'schedule-cell-block--pulse' : ''}`}
                          style={{ backgroundColor: colors.bg, borderColor: colors.border, color: colors.text }}
                          onClick={() => {
                            if (entry.status === 'high-risk') {
                              const alert = state.riskAlerts.find(a => a.patientId === patient.id && a.timeSlot === slot);
                              if (alert) dispatch({ type: 'OPEN_RISK_PANEL', payload: alert });
                            }
                          }}
                        >
                          <span className="schedule-cell-drug">{entry.medication}</span>
                          <span className="schedule-cell-dosage">{entry.dosage}</span>
                        </div>
                      );
                    })}

                    {/* Tooltip */}
                    {isHovered && (
                      <div className="schedule-tooltip">
                        <p className="schedule-tooltip-title">{patient.name} — {slot}</p>
                        {entries.map((entry, i) => (
                          <div key={i} className="schedule-tooltip-entry">
                            <p className="schedule-tooltip-drug">{entry.medication} {entry.dosage}</p>
                            <p className="schedule-tooltip-meta">{entry.route} • {entry.status}</p>
                            {entry.administeredBy && (
                              <p className="schedule-tooltip-admin">By {entry.administeredBy} at {entry.administeredAt}</p>
                            )}
                            {entry.riskReason && (
                              <p className="schedule-tooltip-risk">⚠ {entry.riskReason}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="schedule-info-bar">
        <Info size={14} />
        <span>Click on any high-risk cell to view the ML risk analysis. Hover over cells for medication details.</span>
      </div>
    </div>
  );
}
