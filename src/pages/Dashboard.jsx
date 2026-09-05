import { useMemo, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AddMonitor from '../components/AddMonitor'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'
import Footer from '../components/Footer'
import IncidentList from '../components/IncidentList'
import MonitorCard from '../components/MonitorCard'
import { getMonitors, getIncidents, getHistory, createMonitor, deleteMonitor } from '../services/api'
import { signOut } from '../services/auth'

function Dashboard() {
  const [monitors, setMonitors] = useState([])
  const [incidents, setIncidents] = useState([])
  const [responseTimeData, setResponseTimeData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [monitorToDelete, setMonitorToDelete] = useState(null)
  const [newMonitor, setNewMonitor] = useState({ name: '', url: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()

  const refreshData = useCallback(async () => {
    try {
      setError(null)
      const monitorsData = await getMonitors()
      const incidentsByMonitor = await Promise.all(
        monitorsData.map((monitor) => getIncidents(monitor.id, monitor)),
      )
      const historyByMonitor = await Promise.all(
        monitorsData.map((monitor) => getHistory(monitor.id)),
      )
      const responseTimes = historyByMonitor
        .flat()
        .filter((result) => typeof result.responseTimeMs === 'number')
        .sort((first, second) => new Date(first.checkedAt) - new Date(second.checkedAt))
        .slice(-10)
        .map((result) => result.responseTimeMs)
      const highestResponseTime = Math.max(...responseTimes, 1)
      setMonitors(monitorsData)
      setIncidents(incidentsByMonitor.flat())
      setResponseTimeData(responseTimes.map((value) => Math.max(8, Math.round((value / highestResponseTime) * 100))))
    } catch (err) {
      setError(err.message || 'Unable to connect to the PulseWatch API.')
      console.error('Error loading data:', err)
    }
  }, [])

  // Fetch monitors on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await refreshData()
      setIsLoading(false)
    }

    fetchData()
  }, [refreshData])

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

  const handleAddMonitor = async () => {
    const name = newMonitor.name.trim()
    const url = newMonitor.url.trim()

    if (!name || !url) {
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      setSuccessMessage(null)
      await createMonitor({ name, url })
      setNewMonitor({ name: '', url: '' })
      setIsModalOpen(false)
      setSuccessMessage(`Monitor "${name}" added successfully.`)
      await refreshData()
    } catch (err) {
      setError(err.message || 'Failed to add monitor')
      console.error('Error adding monitor:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!monitorToDelete) return
    const targetToDelete = monitorToDelete

    try {
      setIsDeleting(true)
      setError(null)
      setSuccessMessage(null)
      await deleteMonitor(targetToDelete.id)
      setMonitors((previous) => previous.filter((m) => m.id !== targetToDelete.id))
      setMonitorToDelete(null)
      setSuccessMessage(`Monitor "${targetToDelete.name}" was successfully deleted.`)
      await refreshData()
    } catch (err) {
      setError(err.message || 'Failed to delete monitor')
      console.error('Error deleting monitor:', err)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleLogout = () => {
    signOut()
    navigate('/login')
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
            <button type="button" className="secondary-button small-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <main className="container dashboard-main">
        {successMessage && (
          <div style={{
            backgroundColor: '#ecfdf5',
            border: '1px solid #bbf7d0',
            color: '#166534',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span>{successMessage}</span>
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              style={{ background: 'none', border: 'none', color: '#166534', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ×
            </button>
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError(null)}
              style={{ background: 'none', border: 'none', color: '#991b1b', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ×
            </button>
          </div>
        )}

        <section className="dashboard-top">
          <div>
            <p className="eyebrow">Monitoring Overview</p>
            <h1>Website &amp; API Monitoring</h1>
            <p className="lead small">
              View current status, uptime summaries, and recent incidents from your AWS monitoring workspace.
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

              {isLoading ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
                  Loading monitors...
                </div>
              ) : monitors.length === 0 ? (
                <div className="empty-state">
                  <p>No monitors yet.</p>
                  <span>Add your first website or API to get started.</span>
                </div>
              ) : (
                <div className="monitor-list">
                  {monitors.map((monitor) => (
                    <MonitorCard
                      key={monitor.id}
                      monitor={monitor}
                      onDelete={(m) => setMonitorToDelete(m)}
                    />
                  ))}
                </div>
              )}
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
          setError(null)
        }}
        onAddMonitor={handleAddMonitor}
        formData={newMonitor}
        setFormData={setNewMonitor}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmationModal
        isOpen={Boolean(monitorToDelete)}
        onClose={() => setMonitorToDelete(null)}
        onConfirm={handleDeleteConfirm}
        monitorName={monitorToDelete?.name || ''}
        isDeleting={isDeleting}
      />

      <Footer />
    </div>
  )
}

export default Dashboard
