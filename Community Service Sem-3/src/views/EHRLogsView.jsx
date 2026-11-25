import { FileInput, CheckCircle2, XCircle, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

const statusConfig = {
  success: { icon: CheckCircle2, className: 'ehr-status--success', label: 'Success' },
  failed: { icon: XCircle, className: 'ehr-status--failed', label: 'Failed' },
  warning: { icon: AlertTriangle, className: 'ehr-status--warning', label: 'Warning' },
  processing: { icon: Loader2, className: 'ehr-status--processing', label: 'Processing' },
};

export default function EHRLogsView() {
  const { state } = useApp();
  const logs = state.ehrLogs;

  const successCount = logs.filter(l => l.status === 'success').length;
  const failedCount = logs.filter(l => l.status === 'failed').length;
  const warningCount = logs.filter(l => l.status === 'warning').length;

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (ts) => {
    const d = new Date(ts);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="ehr-logs-view">
      <div className="ehr-header">
        <div>
          <h2 className="ehr-title">EHR Ingestion Logs</h2>
          <p className="ehr-subtitle">Real-time prescription data pipeline from connected EHR systems</p>
        </div>
        <button className="btn btn--secondary btn--with-icon">
          <RefreshCw size={14} />
          Refresh Logs
        </button>
      </div>

      {/* Summary Pills */}
      <div className="ehr-summary-pills">
        <div className="ehr-pill ehr-pill--total">
          <FileInput size={14} />
          <span>{logs.length} Total Events</span>
        </div>
        <div className="ehr-pill ehr-pill--success">
          <CheckCircle2 size={14} />
          <span>{successCount} Successful</span>
        </div>
        <div className="ehr-pill ehr-pill--failed">
          <XCircle size={14} />
          <span>{failedCount} Failed</span>
        </div>
        <div className="ehr-pill ehr-pill--warning">
          <AlertTriangle size={14} />
          <span>{warningCount} Warnings</span>
        </div>
      </div>

      {/* Log Table */}
      <div className="ehr-table-wrapper">
        <table className="ehr-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Source System</th>
              <th>Patient</th>
              <th>Medication</th>
              <th>Action</th>
              <th>Status</th>
              <th>Processing Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => {
              const sc = statusConfig[log.status] || statusConfig.success;
              const Icon = sc.icon;
              return (
                <tr key={log.id} className={log.status === 'failed' ? 'ehr-row--failed' : ''}>
                  <td>
                    <div className="ehr-timestamp">
                      <span className="ehr-timestamp-date">{formatDate(log.timestamp)}</span>
                      <span className="ehr-timestamp-time">{formatTime(log.timestamp)}</span>
                    </div>
                  </td>
                  <td>
                    <span className="ehr-source">{log.source}</span>
                  </td>
                  <td>
                    <div className="ehr-patient-cell">
                      <span className="ehr-patient-name">{log.patient}</span>
                      <span className="ehr-patient-id">{log.patientId}</span>
                    </div>
                  </td>
                  <td className="ehr-medication">{log.medication}</td>
                  <td className="ehr-action">{log.action}</td>
                  <td>
                    <span className={`ehr-status-badge ${sc.className}`}>
                      <Icon size={12} className={log.status === 'processing' ? 'spin' : ''} />
                      {sc.label}
                    </span>
                  </td>
                  <td className="ehr-processing-time">{log.processingTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Error Detail (for failed rows) */}
      {logs.filter(l => l.status === 'failed').map(log => (
        <div key={log.id} className="ehr-error-detail">
          <XCircle size={14} />
          <div>
            <p className="ehr-error-title">Failed: {log.action} — {log.medication} for {log.patient}</p>
            <p className="ehr-error-message">{log.errorMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
