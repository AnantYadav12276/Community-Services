import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function MetricCard({ icon: Icon, label, value, trend, trendLabel, variant = 'default' }) {
  const variantClasses = {
    default: 'metric-card--default',
    success: 'metric-card--success',
    warning: 'metric-card--warning',
    danger: 'metric-card--danger',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = variant === 'danger'
    ? (trend === 'up' ? 'metric-trend--danger-up' : 'metric-trend--success')
    : (trend === 'up' ? 'metric-trend--success' : trend === 'down' ? 'metric-trend--danger' : 'metric-trend--neutral');

  return (
    <div className={`metric-card ${variantClasses[variant]}`}>
      <div className="metric-card-header">
        <div className={`metric-card-icon ${variantClasses[variant]}-icon`}>
          <Icon size={20} />
        </div>
        {trend && (
          <div className={`metric-trend ${trendColor}`}>
            <TrendIcon size={14} />
            <span>{trendLabel}</span>
          </div>
        )}
      </div>
      <p className="metric-card-value">{value}</p>
      <p className="metric-card-label">{label}</p>
    </div>
  );
}
