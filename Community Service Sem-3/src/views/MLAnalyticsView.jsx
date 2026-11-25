import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ShieldAlert, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RISK_TREND_DATA, ALERT_DISTRIBUTION } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

const PATIENT_COLORS = {
  jitender: '#22c55e',
  munnaSingh: '#f97316',
  roushan: '#a855f7',
  baldevSingh: '#eab308',
  krishnaDevi: '#f43f5e',
};

const PATIENT_LABELS = {
  jitender: 'Jitender',
  munnaSingh: 'Munna Singh',
  roushan: 'Roushan',
  baldevSingh: 'Baldev Singh',
  krishnaDevi: 'Krishna Devi',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="chart-tooltip-entry" style={{ color: entry.color }}>
          {PATIENT_LABELS[entry.dataKey] || entry.dataKey}: {entry.value}%
        </p>
      ))}
    </div>
  );
};

const BarTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{payload[0].payload.category}</p>
      <p className="chart-tooltip-entry">{payload[0].value} alerts</p>
    </div>
  );
};

export default function MLAnalyticsView() {
  const { state, dispatch } = useApp();
  const activeAlerts = state.riskAlerts.filter(a => a.status === 'active');
  const allAlerts = state.riskAlerts;

  return (
    <div className="ml-analytics-view">
      <div className="ml-header">
        <div>
          <h2 className="ml-title">ML Risk Analytics</h2>
          <p className="ml-subtitle">Predictive drug event risk monitoring powered by scikit-learn ensemble models</p>
        </div>
        <div className="ml-header-stats">
          <div className="ml-stat">
            <ShieldAlert size={16} className="ml-stat-icon ml-stat-icon--active" />
            <span className="ml-stat-value">{activeAlerts.length}</span>
            <span className="ml-stat-label">Active Alerts</span>
          </div>
          <div className="ml-stat">
            <TrendingUp size={16} className="ml-stat-icon ml-stat-icon--total" />
            <span className="ml-stat-value">{allAlerts.length}</span>
            <span className="ml-stat-label">Total Flagged</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="ml-charts-grid">
        {/* Risk Trend */}
        <div className="ml-chart-card">
          <h3 className="ml-chart-title">
            <TrendingUp size={16} /> 7-Day Risk Score Trends
          </h3>
          <div className="ml-chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={RISK_TREND_DATA} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => PATIENT_LABELS[value] || value} />
                {Object.entries(PATIENT_COLORS).map(([key, color]) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={color}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alert Distribution */}
        <div className="ml-chart-card">
          <h3 className="ml-chart-title">
            <AlertTriangle size={16} /> Alert Distribution by Category
          </h3>
          <div className="ml-chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={ALERT_DISTRIBUTION} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="category" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<BarTooltip />} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {ALERT_DISTRIBUTION.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Active Alerts Table */}
      <div className="ml-alerts-section">
        <h3 className="ml-alerts-title">
          <ShieldAlert size={16} /> Active Risk Alerts
        </h3>
        <div className="ml-alerts-table-wrapper">
          <table className="ml-alerts-table">
            <thead>
              <tr>
                <th>Severity</th>
                <th>Patient</th>
                <th>Type</th>
                <th>Drug Pair</th>
                <th>Risk Score</th>
                <th>Time Slot</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allAlerts.map(alert => (
                <tr key={alert.id} className={alert.status === 'dismissed' ? 'ml-alert-dismissed' : ''}>
                  <td>
                    <span className={`ml-severity-pill ${alert.severity === 'critical' ? 'ml-severity--critical' : 'ml-severity--high'}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="ml-alert-patient">
                      <span className="ml-alert-patient-name">{alert.patientName}</span>
                      <span className="ml-alert-patient-id">{alert.patientId}</span>
                    </div>
                  </td>
                  <td>{alert.type}</td>
                  <td>
                    <span className="ml-drug-pair">{alert.drugA} ↔ {alert.drugB}</span>
                  </td>
                  <td>
                    <div className="ml-risk-score-cell">
                      <div className="ml-risk-bar">
                        <div
                          className="ml-risk-bar-fill"
                          style={{ width: `${alert.riskScore}%`, backgroundColor: alert.riskScore >= 80 ? '#f43f5e' : '#f97316' }}
                        />
                      </div>
                      <span className="ml-risk-score-text">{alert.riskScore}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="ml-timeslot">
                      <Clock size={12} /> {alert.timeSlot}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={alert.status === 'active' ? 'high-risk' : 'administered'} small />
                  </td>
                  <td>
                    {alert.status === 'active' ? (
                      <button
                        className="ml-view-btn"
                        onClick={() => dispatch({ type: 'OPEN_RISK_PANEL', payload: alert })}
                      >
                        View Details
                      </button>
                    ) : (
                      <span className="ml-resolved-label">Resolved</span>
                    )}
                  </td>
                </tr>
              ))}
              {allAlerts.length === 0 && (
                <tr>
                  <td colSpan={8} className="ml-alerts-empty">No risk alerts at this time.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
