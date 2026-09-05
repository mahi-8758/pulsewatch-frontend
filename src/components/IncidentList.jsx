function IncidentList({ incidents }) {
  if (!incidents.length) {
    return (
      <section className="panel" id="incidents">
        <div className="panel-header">
          <h2>Recent Incidents</h2>
        </div>
        <div className="empty-state">
          <p>No recent incidents.</p>
          <span>Everything looks healthy right now.</span>
        </div>
      </section>
    )
  }

  return (
    <section className="panel" id="incidents">
      <div className="panel-header">
        <h2>Recent Incidents</h2>
        <span>{incidents.length} events</span>
      </div>

      <ul className="incident-list">
        {incidents.map((incident) => (
          <li key={incident.id} className="incident-item">
            <div>
              <p className="incident-name">{incident.name}</p>
              <span className="incident-time">{incident.time}</span>
            </div>
            <span className={`incident-status ${incident.type === 'DOWN' ? 'down' : 'recovered'}`}>
              {incident.type}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default IncidentList
