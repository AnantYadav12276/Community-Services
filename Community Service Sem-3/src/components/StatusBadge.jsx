import { CheckCircle2, Clock, AlertTriangle, ShieldAlert } from 'lucide-react';

const statusConfig = {
  administered: {
    className: 'badge--administered',
    icon: CheckCircle2,
    label: 'Administered',
  },
  pending: {
    className: 'badge--pending',
    icon: Clock,
    label: 'Pending',
  },
  delayed: {
    className: 'badge--delayed',
    icon: AlertTriangle,
    label: 'Delayed',
  },
  'high-risk': {
    className: 'badge--high-risk',
    icon: ShieldAlert,
    label: 'High Risk',
  },
};

export default function StatusBadge({ status, small = false, onClick }) {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={`status-badge ${config.className} ${small ? 'status-badge--small' : ''}`}
      disabled={!onClick}
    >
      <Icon size={small ? 10 : 12} />
      <span>{config.label}</span>
    </button>
  );
}
