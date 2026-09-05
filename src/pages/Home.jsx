import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <div className="brand">
            <span className="brand-mark">P</span>
            <span>PulseWatch</span>
          </div>
          <nav className="nav-links" aria-label="Main navigation">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </nav>
        </div>
      </header>

      <main className="container home-main">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">PulseWatch</p>
            <h1>Website &amp; API Monitoring</h1>
            <p className="lead">
              PulseWatch helps students and teams monitor websites and APIs in real time,
              detect downtime quickly, and keep track of service health using a simple dashboard.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="primary-button">Get Started</Link>
              <Link to="/login" className="secondary-button">Login</Link>
            </div>
          </div>

          <div className="hero-card">
            <div className="mini-header">
              <span className="dot green"></span>
              <span>System Status</span>
            </div>
            <div className="mini-status">
              <strong>99.8%</strong>
              <span>Uptime</span>
            </div>
            <ul className="status-list">
              <li><span className="dot green"></span> Website online</li>
              <li><span className="dot yellow"></span> API check running</li>
              <li><span className="dot red"></span> 1 issue detected</li>
            </ul>
          </div>
        </section>

        <section className="info-panel">
          <h2>How PulseWatch works</h2>
          <div className="steps-grid">
            <div className="step-box">
              <span>1</span>
              <h3>Add a monitor</h3>
              <p>Enter the website or API URL you want to track.</p>
            </div>
            <div className="step-box">
              <span>2</span>
              <h3>Check status</h3>
              <p>The system checks whether the service is online or down.</p>
            </div>
            <div className="step-box">
              <span>3</span>
              <h3>Track incidents</h3>
              <p>See response time and recent issues in one simple dashboard.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
