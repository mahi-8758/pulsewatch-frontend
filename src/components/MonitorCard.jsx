function MonitorCard({ monitor, onCheck, onDelete, isChecking }) {
  const isUp = monitor.status === 'UP'
  const statusCodeDisplay = typeof monitor.statusCode === 'number'
    ? (monitor.statusCode > 0 ? `HTTP ${monitor.statusCode}` : 'HTTP 0')
    : null

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
          {onCheck && (
            <button
              type="button"
              className="check-button"
              onClick={() => onCheck(monitor)}
              disabled={isChecking}
              title="Check monitor now"
              aria-label={`Check ${monitor.name} now`}
            >
              {isChecking ? 'Checking...' : 'Check Now'}
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              className="delete-button"
              onClick={() => onDelete(monitor)}
              disabled={isChecking}
              title="Delete monitor"
              aria-label={`Delete ${monitor.name}`}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="monitor-meta">
        {statusCodeDisplay && (
          <div>
            <span className="meta-label">Status Code</span>
            <strong>{statusCodeDisplay}</strong>
          </div>
        )}
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
