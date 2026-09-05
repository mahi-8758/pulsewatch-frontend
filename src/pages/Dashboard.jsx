import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AddMonitor from '../components/AddMonitor'
import Footer from '../components/Footer'
import IncidentList from '../components/IncidentList'
import MonitorCard from '../components/MonitorCard'
import { initialIncidents, initialMonitors, responseTimeData } from '../data/mockData'

function Dashboard() {
  const [monitors, setMonitors] = useState(initialMonitors)
  const [incidents] = useState(initialIncidents)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newMonitor, setNewMonitor] = useState({ name: '', url: '' })

  const stats = useMemo(() => {
    const total = monitors.length
    const online = monitors.filter((monitor) => monitor.status === 'UP').length
    const down = total - online
    const averageResponse = monitors
      .filter((monitor) => monitor.status === 'UP' && typeof monitor.responseTime === 'number')
      .reduce((sum, monitor) => sum + monitor.responseTime, 0)

    return {
      total,
      online,
      down,
      averageResponse:
        online > 0 ? Math.round(averageResponse / online) : 0,
    }
  }, [monitors])

  const handleAddMonitor = () => {
    const name = newMonitor.name.trim()
    const url = newMonitor.url.trim()

    if (!name || !url) {
      return
    }

    const monitor = {
      id: Date.now(),
      name,
      url,
      status: 'UP',
      responseTime: 180,
      lastChecked: 'just now',
    }

    setMonitors((previous) => [monitor, ...previous])
    setNewMonitor({ name: '', url: '' })
    setIsModalOpen(false)
  }

  return (
    <div className="page-shell dashboard-page">
      <header className="dashboard-header">
        <div className="container dash-wrap">
          <div className="brand-wrap">
            <span className="brand-mark">P</span>
            <span className="brand-name">PulseWatch</span>
          </div>

          <div className="dashboard-title-wrap">
            <span>Dashboard</span>
          </div>

          <div className="header-actions">
            <span className="demo-tag">Demo Mode</span>
            <Link to="/" className="secondary-button small-button">Logout</Link>
          </div>
        </div>
      </header>

      <main className="container dashboard-main">
        <section className="dashboard-top">
          <div>
            <p className="eyebrow">Monitoring Overview</p>
            <h1>Website &amp; API Monitoring</h1>
            <p className="lead small">
              View current status, quick uptime summaries, and recent incidents in a simple local demo.
            </p>
          </div>

          <button type="button" className="primary-button" onClick={() => setIsModalOpen(true)}>
            + Add Monitor
          </button>
        </section>

        <section className="stats-grid">
          <div className="stat-box">
            <p>Total Monitors</p>
            <h3>{stats.total}</h3>
          </div>
          <div className="stat-box">
            <p>Online</p>
            <h3>{stats.online}</h3>
          </div>
          <div className="stat-box">
            <p>Down</p>
            <h3>{stats.down}</h3>
          </div>
          <div className="stat-box">
            <p>Average Response Time</p>
            <h3>{stats.averageResponse} ms</h3>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="left-col">
            <div className="panel monitor-panel">
              <div className="panel-header">
                <h2>Your Monitors</h2>
              </div>

              <div className="monitor-list">
                {monitors.map((monitor) => (
                  <MonitorCard key={monitor.id} monitor={monitor} />
                ))}
              </div>
            </div>
          </div>

          <div className="right-col">
            <IncidentList incidents={incidents} />

            <div className="panel response-panel">
              <div className="panel-header">
                <h2>Response Time</h2>
                <span>Last 10 checks</span>
              </div>

              <div className="response-bars" aria-label="Response time chart">
                {responseTimeData.map((value, index) => (
                  <div key={`${value}-${index}`} className="bar-column">
                    <div className="bar-fill" style={{ height: `${value}%` }}></div>
                    <span>{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <AddMonitor
        isOpen={isModalOpen}
        onClose={() => {
          setNewMonitor({ name: '', url: '' })
          setIsModalOpen(false)
        }}
        onAddMonitor={handleAddMonitor}
        formData={newMonitor}
        setFormData={setNewMonitor}
      />

      <Footer />
    </div>
  )
}

export default Dashboard
