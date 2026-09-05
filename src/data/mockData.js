export const initialMonitors = [
  {
    id: 1,
    name: 'My Portfolio',
    url: 'https://example.com',
    status: 'UP',
    responseTime: 182,
    lastChecked: '2 minutes ago',
  },
  {
    id: 2,
    name: 'Demo API',
    url: 'https://api.example.com',
    status: 'DOWN',
    responseTime: null,
    lastChecked: '1 minute ago',
  },
  {
    id: 3,
    name: 'Learning Portal',
    url: 'https://portal.college.edu',
    status: 'UP',
    responseTime: 245,
    lastChecked: '5 minutes ago',
  },
]

export const initialIncidents = [
  {
    id: 1,
    title: 'Demo API went down',
    time: 'Today, 12:20 PM',
    type: 'down',
  },
  {
    id: 2,
    title: 'Demo API recovered',
    time: 'Today, 12:28 PM',
    type: 'up',
  },
]

export const responseTimeData = [80, 120, 160, 95, 200, 180, 150, 140, 210, 175]
