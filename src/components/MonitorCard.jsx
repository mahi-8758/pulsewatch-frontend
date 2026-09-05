function MonitorCard({ monitor }) {
  const isUp = monitor.status === 'UP'

  return (
    <article className="monitor-card">
      <div className="monitor-main">
        <div>
          <p className="monitor-name">{monitor.name}</p>
          <p className="monitor-url">{monitor.url}</p>
        </div>

        <span className={`status-badge ${isUp ? 'up' : 'down'}`}>
          {monitor.status}
        </span>
      </div>

      <div className="monitor-meta">
        <div>
          <span className="meta-label">Response</span>
          <strong>{monitor.responseTime} ms</strong>
        </div>
        <div>
          <span className="meta-label">Last checked</span>
          <strong>{monitor.lastChecked}</strong>
        </div>
      </div>
    </article>
  )
}

export default MonitorCard
