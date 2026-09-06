import { getIdToken } from './auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function transformMonitor(monitor) {
  const status = monitor.lastStatus || monitor.status || 'unknown'
  return {
    id: monitor.targetId || monitor.id,
    name: monitor.label || monitor.name,
    url: monitor.url,
    status: status.toUpperCase(),
    responseTime: monitor.responseTimeMs ?? monitor.responseTime ?? 0,
    lastChecked: monitor.checkedAt || monitor.lastChecked || 'Not checked yet',
  }
}

function transformIncident(incident, monitor) {
  const status = (incident.status || incident.type || '').toUpperCase()
  return {
    id: `${incident.targetId}-${incident.startedAt}`,
    name: incident.label || monitor?.name || 'Monitor',
    time: incident.startedAt || incident.time,
    type: status === 'DOWN' ? 'DOWN' : 'BACK UP',
  }
}

async function request(path, options = {}) {
  const token = await getIdToken()
  if (!token) throw new Error('Your session has expired. Please log in again.')

  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        ...options.headers,
      },
    })
  } catch {
    throw new Error('Unable to connect to the PulseWatch API.')
  }

  let data = null
  try {
    data = await response.json()
  } catch {
    if (!response.ok) throw new Error('Unable to connect to the PulseWatch API.')
  }

  if (!response.ok) throw new Error(data?.message || 'The PulseWatch API rejected the request.')
  return data
}

export async function getMonitors() {
  const data = await request('/targets')
  if (!Array.isArray(data)) throw new Error('Invalid monitor response from the PulseWatch API.')
  return data.map(transformMonitor)
}

export async function createMonitor(monitor) {
  const data = await request('/targets', {
    method: 'POST',
    body: JSON.stringify({ label: monitor.name || monitor.label, url: monitor.url }),
  })
  return {
    id: data.targetId,
    name: monitor.name || monitor.label,
    url: monitor.url,
    status: 'UNKNOWN',
    responseTime: 0,
    lastChecked: 'Not checked yet',
  }
}

export async function getIncidents(targetId, monitor) {
  const data = await request(`/incidents/${encodeURIComponent(targetId)}`)
  if (!Array.isArray(data)) throw new Error('Invalid incidents response from the PulseWatch API.')
  return data.map((incident) => transformIncident(incident, monitor))
}

export async function getHistory(targetId) {
  const data = await request(`/history/${encodeURIComponent(targetId)}`)
  if (!Array.isArray(data)) throw new Error('Invalid history response from the PulseWatch API.')
  return data
}

export async function deleteMonitor(targetId) {
  return await request(`/targets/${encodeURIComponent(targetId)}`, {
    method: 'DELETE',
  })
}

export async function checkMonitor(targetId) {
  return await request(`/targets/${encodeURIComponent(targetId)}/check`, {
    method: 'POST',
  })
}
