function MonitorCard({ monitor, onDelete }) {
  const isUp = monitor.status === 'UP'

  return (
    <article className="monitor-card">
      <div className="monitor-main">
        <div>
          <p className="monitor-name">{monitor.name}</p>
          <p className="monitor-url">{monitor.url}</p>
        </div>

        <div className="monitor-actions-header">
          <span className={`status-badge ${isUp ? 'up' : 'down'}`}>
            {monitor.status}
          </span>
          {onDelete && (
            <button
              type="button"
              className="delete-button"
              onClick={() => onDelete(monitor)}
              title="Delete monitor"
              aria-label={`Delete ${monitor.name}`}
            >
              Delete
            </button>
          )}
        </div>
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
