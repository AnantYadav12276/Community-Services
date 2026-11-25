import { useState } from 'react';
import { ChevronDown, ChevronUp, Syringe, User, Stethoscope, Thermometer, Heart, Wind } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useApp } from '../context/AppContext';
import { TIME_SLOTS, RISK_ALERTS } from '../data/mockData';

export default function PatientRow({ patient }) {
  const [expanded, setExpanded] = useState(false);
  const { state, dispatch } = useApp();

  const getScheduleForSlot = (slot) => {
    return patient.schedule.filter(s => s.timeSlot === slot);
  };

  const initials = patient.name.split(' ').map(n => n[0]).join('');

  const handleBadgeClick = (entry) => {
    if (entry.status === 'high-risk') {
      const alert = (state?.riskAlerts || RISK_ALERTS).find(a => a.patientId === patient.id && a.timeSlot === entry.timeSlot);
      if (alert) {
        dispatch({ type: 'OPEN_RISK_PANEL', payload: alert });
      }
    }
  };

  const handleAdminister = (entry) => {
    dispatch({
      type: 'ADMINISTER_DOSE',
      payload: { patientId: patient.id, timeSlot: entry.timeSlot, medication: entry.medication },
    });
  };

  return (
    <div className={`patient-row ${expanded ? 'patient-row--expanded' : ''}`}>
      {/* Main Row */}
      <div className="patient-row-main" onClick={() => setExpanded(!expanded)}>
        {/* Patient Info */}
        <div className="patient-row-info">
          <div className="patient-avatar">{initials}</div>
          <div className="patient-details">
            <div className="patient-name-row">
              <h3 className="patient-name">{patient.name}</h3>
              <span className="patient-id">{patient.id}</span>
            </div>
            <div className="patient-meta">
              <span>{patient.age}y • {patient.gender}</span>
              <span className="patient-meta-sep">|</span>
              <span>Bed {patient.bed}</span>
              <span className="patient-meta-sep">|</span>
              <span>{patient.physician}</span>
            </div>
            <div className="patient-diagnoses">
              {patient.diagnoses.map((d, i) => (
                <span key={i} className="patient-diagnosis-tag">{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Cells */}
        <div className="patient-timeline">
          {TIME_SLOTS.map(slot => {
            const entries = getScheduleForSlot(slot);
            return (
              <div key={slot} className="patient-timeline-cell">
                {entries.length === 0 ? (
                  <span className="patient-timeline-empty">—</span>
                ) : (
                  entries.map((entry, i) => (
                    <div key={i} className="patient-timeline-entry">
                      <span className="patient-timeline-drug">{entry.medication}</span>
                      <StatusBadge
                        status={entry.status}
                        small
                        onClick={entry.status === 'high-risk' ? (e) => { e.stopPropagation(); handleBadgeClick(entry); } : undefined}
                      />
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>

        {/* Expand toggle */}
        <button className="patient-row-toggle">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Expanded Detail */}
      {expanded && (
        <div className="patient-row-detail">
          {/* Vitals */}
          <div className="patient-vitals-section">
            <h4 className="patient-detail-title">
              <Stethoscope size={14} /> Vitals
            </h4>
            <div className="patient-vitals-grid">
              <div className="patient-vital">
                <Heart size={14} className="vital-icon vital-icon--bp" />
                <div>
                  <p className="vital-label">Blood Pressure</p>
                  <p className="vital-value">{patient.vitals.bp} mmHg</p>
                </div>
              </div>
              <div className="patient-vital">
                <Thermometer size={14} className="vital-icon vital-icon--temp" />
                <div>
                  <p className="vital-label">Temperature</p>
                  <p className="vital-value">{patient.vitals.temp}°F</p>
                </div>
              </div>
              <div className="patient-vital">
                <Heart size={14} className="vital-icon vital-icon--hr" />
                <div>
                  <p className="vital-label">Heart Rate</p>
                  <p className="vital-value">{patient.vitals.hr} bpm</p>
                </div>
              </div>
              <div className="patient-vital">
                <Wind size={14} className="vital-icon vital-icon--spo2" />
                <div>
                  <p className="vital-label">SpO₂</p>
                  <p className="vital-value">{patient.vitals.spo2}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Medication Log */}
          <div className="patient-medlog-section">
            <h4 className="patient-detail-title">
              <Syringe size={14} /> Medication Schedule
            </h4>
            <table className="patient-medlog-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Medication</th>
                  <th>Dosage</th>
                  <th>Route</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {patient.schedule.map((entry, i) => (
                  <tr key={i}>
                    <td className="medlog-time">{entry.timeSlot}</td>
                    <td className="medlog-drug">{entry.medication}</td>
                    <td>{entry.dosage}</td>
                    <td>{entry.route}</td>
                    <td>
                      <StatusBadge
                        status={entry.status}
                        small
                        onClick={entry.status === 'high-risk' ? () => handleBadgeClick(entry) : undefined}
                      />
                    </td>
                    <td>
                      {entry.status === 'pending' || entry.status === 'delayed' ? (
                        <button
                          className="medlog-administer-btn"
                          onClick={() => handleAdminister(entry)}
                        >
                          Administer
                        </button>
                      ) : entry.status === 'administered' ? (
                        <span className="medlog-administered-info">
                          <User size={10} /> {entry.administeredBy} at {entry.administeredAt}
                        </span>
                      ) : entry.status === 'high-risk' ? (
                        <button
                          className="medlog-review-btn"
                          onClick={() => handleBadgeClick(entry)}
                        >
                          Review Risk
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
