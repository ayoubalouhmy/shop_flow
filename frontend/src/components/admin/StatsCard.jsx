const ArrowUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

/**
 * StatsCard – Reusable KPI card
 * @param {string}  label     - Card label (e.g. "Total Sales")
 * @param {string}  value     - Main value to display
 * @param {string}  change    - Change string (e.g. "+12.5%")
 * @param {boolean} up        - true = positive trend (green), false = negative (red)
 * @param {node}    icon      - SVG icon element
 * @param {string}  iconBg    - Background color for icon container
 * @param {string}  iconColor - Icon color
 */
export default function StatsCard({ label, value, change, up = true, icon, iconBg, iconColor }) {
  return (
    <div className="sf-stats-card">
      <div className="sf-stats-card-top">
        <span className="sf-stats-card-label">{label}</span>
        {icon && (
          <div
            className="sf-stats-card-icon"
            style={{ background: iconBg || "var(--sf-primary-muted)", color: iconColor || "var(--sf-primary)" }}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="sf-stats-card-value">{value}</div>

      {change && (
        <div className={`sf-stats-card-change ${up ? "up" : "down"}`}>
          {up ? <ArrowUpIcon /> : <ArrowDownIcon />}
          <span>{change}</span>
          <span style={{ color: "var(--sf-muted)", fontWeight: 400, marginLeft: 2 }}>
            vs mois dernier
          </span>
        </div>
      )}
    </div>
  );
}