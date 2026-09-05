function SummaryCard({ label, value, detail }) {
  return (
    <div className="summary-card">
      <p className="summary-label">{label}</p>
      <h3>{value}</h3>
      <span>{detail}</span>
    </div>
  )
}

export default SummaryCard
