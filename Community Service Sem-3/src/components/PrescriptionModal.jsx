import { useState } from 'react';
import { X, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PATIENTS, MEDICATIONS, TIME_SLOTS } from '../data/mockData';

export default function PrescriptionModal() {
  const { state, dispatch } = useApp();
  const [form, setForm] = useState({
    patientId: '',
    medication: '',
    dosage: '',
    route: 'Oral',
    frequency: 'Once daily',
    timeSlot: '08:00',
    startDate: new Date().toISOString().split('T')[0],
  });
  const [riskCheck, setRiskCheck] = useState(null); // null | 'checking' | 'safe' | 'risk'
  const [riskMessage, setRiskMessage] = useState('');
  const [patientSearch, setPatientSearch] = useState('');
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);

  if (!state.prescriptionModalOpen) return null;

  const patientList = state?.patients || PATIENTS;

  const filteredPatientsForSearch = patientList.filter(p =>
    p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    p.id.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const handlePatientSelect = (p) => {
    setForm(f => ({ ...f, patientId: p.id }));
    setPatientSearch(`${p.name} (${p.id})`);
    setShowPatientDropdown(false);
    setRiskCheck(null);
  };

  const handleMedicationSelect = (medName) => {
    const med = MEDICATIONS.find(m => m.name === medName);
    if (med) {
      setForm(f => ({ ...f, medication: med.name, dosage: med.defaultDosage, route: med.route }));
    } else {
      setForm(f => ({ ...f, medication: medName }));
    }
    setRiskCheck(null);
  };

  const runRiskCheck = () => {
    setRiskCheck('checking');
    setTimeout(() => {
      // Simulate ML risk check
      const patient = patientList.find(p => p.id === form.patientId);
      if (!patient) {
        setRiskCheck('safe');
        setRiskMessage('No patient-specific risk data available.');
        return;
      }
      // Check for known interactions & timing overlaps
      const hasSameMedAtSlot = patient.schedule.some(
        s => s.medication.toLowerCase() === form.medication.toLowerCase() && s.timeSlot === form.timeSlot
      );
      const isMero = form.medication.toLowerCase().includes('mero');
      const hasMeroInSchedule = patient.schedule.some(s => s.medication.toLowerCase().includes('mero'));
      const isTazact = form.medication.toLowerCase().includes('tazact');
      const hasTazactInSchedule = patient.schedule.some(s => s.medication.toLowerCase().includes('tazact'));

      if (hasSameMedAtSlot) {
        setRiskCheck('risk');
        setRiskMessage(`⚠️ Duplicate Dose Alert: ${form.medication} is already scheduled for ${patient.name} at ${form.timeSlot}. Administration would cause immediate double-dosing.`);
      } else if (isMero && hasMeroInSchedule && form.timeSlot === '12:00') {
        setRiskCheck('risk');
        setRiskMessage(`⚠️ Timing Overlap Alert: Meropenem requires standard Q8H spacing. 12:00 PM creates an unsafe 4-hour window with 08:00 AM dose in patient with ${patient.diagnoses.join(', ')}.`);
      } else if (isTazact && hasTazactInSchedule && form.timeSlot === '12:00') {
        setRiskCheck('risk');
        setRiskMessage(`⚠️ High Risk Interval: Piperacillin/Tazobactam (Tazact) requires minimum 6–8h spacing. 12:00 PM dose violates extended interval guidelines.`);
      } else {
        setRiskCheck('safe');
        setRiskMessage('✓ ML Analysis Complete: No severe contraindications detected. Prescription is safe to proceed.');
      }
    }, 1500);
  };

  const handleSubmit = () => {
    if (!form.patientId || !form.medication || !form.dosage) return;
    dispatch({
      type: 'ADD_PRESCRIPTION',
      payload: {
        patientId: form.patientId,
        medication: form.medication,
        dosage: form.dosage,
        route: form.route,
        timeSlot: form.timeSlot,
      },
    });
    setForm({ patientId: '', medication: '', dosage: '', route: 'Oral', frequency: 'Once daily', timeSlot: '08:00', startDate: new Date().toISOString().split('T')[0] });
    setPatientSearch('');
    setRiskCheck(null);
  };

  return (
    <>
      <div className="modal-backdrop" onClick={() => dispatch({ type: 'CLOSE_PRESCRIPTION_MODAL' })} />
      <div className="prescription-modal">
        {/* Header */}
        <div className="prescription-modal-header">
          <h2 className="prescription-modal-title">New Prescription Entry</h2>
          <button onClick={() => dispatch({ type: 'CLOSE_PRESCRIPTION_MODAL' })} className="prescription-modal-close">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="prescription-form">
          {/* Patient */}
          <div className="form-group">
            <label className="form-label">Patient</label>
            <div className="form-autocomplete">
              <input
                type="text"
                className="form-input"
                placeholder="Search patient by name or ID..."
                value={patientSearch}
                onChange={e => { setPatientSearch(e.target.value); setShowPatientDropdown(true); }}
                onFocus={() => setShowPatientDropdown(true)}
              />
              {showPatientDropdown && patientSearch && (
                <div className="form-autocomplete-dropdown">
                  {filteredPatientsForSearch.map(p => (
                    <button key={p.id} className="form-autocomplete-item" onClick={() => handlePatientSelect(p)}>
                      <span className="form-autocomplete-name">{p.name}</span>
                      <span className="form-autocomplete-id">{p.id} • Bed {p.bed}</span>
                    </button>
                  ))}
                  {filteredPatientsForSearch.length === 0 && (
                    <p className="form-autocomplete-empty">No patients found</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Medication */}
          <div className="form-group">
            <label className="form-label">Medication</label>
            <select className="form-select" value={form.medication} onChange={e => handleMedicationSelect(e.target.value)}>
              <option value="">Select medication...</option>
              {MEDICATIONS.map(m => (
                <option key={m.id} value={m.name}>{m.name} — {m.defaultDosage} ({m.category})</option>
              ))}
            </select>
          </div>

          {/* Dosage & Route */}
          <div className="form-row">
            <div className="form-group form-group--half">
              <label className="form-label">Dosage</label>
              <input type="text" className="form-input" placeholder="e.g. 500mg" value={form.dosage} onChange={e => setForm(f => ({ ...f, dosage: e.target.value }))} />
            </div>
            <div className="form-group form-group--half">
              <label className="form-label">Administration Route</label>
              <select className="form-select" value={form.route} onChange={e => setForm(f => ({ ...f, route: e.target.value }))}>
                <option value="Oral">Oral</option>
                <option value="IV">IV (Intravenous)</option>
                <option value="Subcutaneous">Subcutaneous</option>
                <option value="Intramuscular">Intramuscular</option>
                <option value="Topical">Topical</option>
              </select>
            </div>
          </div>

          {/* Frequency & Time */}
          <div className="form-row">
            <div className="form-group form-group--half">
              <label className="form-label">Frequency</label>
              <select className="form-select" value={form.frequency} onChange={e => setForm(f => ({ ...f, frequency: e.target.value }))}>
                <option value="Once daily">Once daily</option>
                <option value="Twice daily">Twice daily (BID)</option>
                <option value="Three times daily">Three times daily (TID)</option>
                <option value="Four times daily">Four times daily (QID)</option>
                <option value="Every 8 hours">Every 8 hours (Q8H)</option>
                <option value="Every 12 hours">Every 12 hours (Q12H)</option>
                <option value="PRN">As needed (PRN)</option>
              </select>
            </div>
            <div className="form-group form-group--half">
              <label className="form-label">Time Slot</label>
              <select className="form-select" value={form.timeSlot} onChange={e => setForm(f => ({ ...f, timeSlot: e.target.value }))}>
                {TIME_SLOTS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Start Date */}
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input type="date" className="form-input" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
          </div>

          {/* Risk Check Result */}
          {riskCheck && (
            <div className={`risk-check-result ${riskCheck === 'risk' ? 'risk-check--danger' : riskCheck === 'safe' ? 'risk-check--safe' : 'risk-check--loading'}`}>
              {riskCheck === 'checking' ? (
                <><Loader2 size={16} className="spin" /> Running ML risk evaluation...</>
              ) : riskCheck === 'safe' ? (
                <><CheckCircle2 size={16} /> {riskMessage}</>
              ) : (
                <><AlertCircle size={16} /> {riskMessage}</>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="prescription-form-actions">
            <button
              className="btn btn--secondary"
              onClick={runRiskCheck}
              disabled={!form.patientId || !form.medication || riskCheck === 'checking'}
            >
              {riskCheck === 'checking' ? <><Loader2 size={14} className="spin" /> Checking...</> : 'Run ML Risk Check'}
            </button>
            <button
              className="btn btn--primary"
              onClick={handleSubmit}
              disabled={!form.patientId || !form.medication || !form.dosage}
            >
              Submit Prescription
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
