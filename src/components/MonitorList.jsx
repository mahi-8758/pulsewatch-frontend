import MonitorCard from './MonitorCard'

function MonitorList({ monitors, onDelete }) {
  if (!monitors.length) {
    return (
      <section className="panel">
        <div className="panel-header">
          <h2>Monitors</h2>
        </div>
        <div className="empty-state">
          <p>No monitors yet.</p>
          <span>Add your first website or API to get started.</span>
        </div>
      </section>
    )
  }

  return (
    <section className="panel" id="monitors">
      <div className="panel-header">
        <h2>Monitors</h2>
        <span>{monitors.length} active</span>
      </div>

      <div className="monitor-list">
        {monitors.map((monitor) => (
          <MonitorCard key={monitor.id} monitor={monitor} onDelete={onDelete} />
        ))}
      </div>
    </section>
  )
}

export default MonitorList
