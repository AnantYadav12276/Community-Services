import { Users, CalendarCheck, TrendingUp, ShieldAlert, Plus } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import PatientRow from '../components/PatientRow';
import { useApp } from '../context/AppContext';
import { TIME_SLOTS } from '../data/mockData';

export default function LiveWardView() {
  const { state, dispatch, filteredPatients } = useApp();
  const patients = filteredPatients();

  // Compute metrics
  const totalPatients = patients.length;
  const totalDoses = patients.reduce((sum, p) => sum + p.schedule.length, 0);
  const administeredDoses = patients.reduce((sum, p) => sum + p.schedule.filter(s => s.status === 'administered').length, 0);
  const adherenceRate = totalDoses > 0 ? Math.round((administeredDoses / totalDoses) * 100) : 0;
  const highRiskFlags = state.riskAlerts.filter(a => a.status === 'active').length;

  return (
    <div className="live-ward-view">
      {/* Metric Cards */}
      <div className="metric-cards-grid">
        <MetricCard
          icon={Users}
          label="Active Patients"
          value={totalPatients}
          trend="up"
          trendLabel="+2 today"
          variant="default"
        />
        <MetricCard
          icon={CalendarCheck}
          label="Scheduled Doses Today"
          value={totalDoses}
          trend="up"
          trendLabel="+8 vs yesterday"
          variant="default"
        />
        <MetricCard
          icon={TrendingUp}
          label="On-Time Adherence"
          value={`${adherenceRate}%`}
          trend="up"
          trendLabel="+3.2%"
          variant="success"
        />
        <MetricCard
          icon={ShieldAlert}
          label="High-Risk ML Flags"
          value={highRiskFlags}
          trend={highRiskFlags > 0 ? 'up' : 'down'}
          trendLabel={highRiskFlags > 0 ? `${highRiskFlags} active` : 'None'}
          variant="danger"
        />
      </div>

      {/* Timeline Header */}
      <div className="timeline-section">
        <div className="timeline-header">
          <div className="timeline-header-left">
            <h2 className="timeline-title">Patient Medication Timeline</h2>
            <p className="timeline-subtitle">{patients.length} patients • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <button
            className="btn btn--primary btn--with-icon"
            onClick={() => dispatch({ type: 'OPEN_PRESCRIPTION_MODAL' })}
          >
            <Plus size={16} />
            Add Prescription
          </button>
        </div>

        {/* Timeline Grid */}
        <div className="timeline-grid">
          {/* Column Headers */}
          <div className="timeline-columns-header">
            <div className="timeline-col-patient">Patient Information</div>
            {TIME_SLOTS.map(slot => (
              <div key={slot} className="timeline-col-slot">{slot}</div>
            ))}
            <div className="timeline-col-expand"></div>
          </div>

          {/* Patient Rows */}
          <div className="timeline-rows">
            {patients.length === 0 ? (
              <div className="timeline-empty">
                <p>No patients found matching your search criteria.</p>
              </div>
            ) : (
              patients.map(patient => (
                <PatientRow key={patient.id} patient={patient} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
