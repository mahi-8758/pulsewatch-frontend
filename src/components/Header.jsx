function Header() {
  return (
    <header className="topbar">
      <div className="brand-wrap">
        <div className="brand-mark">P</div>
        <div>
          <p className="brand-name">PulseWatch</p>
        </div>
      </div>

      <nav className="nav" aria-label="Main navigation">
        <a href="#dashboard" className="nav-link active">
          Dashboard
        </a>
        <a href="#monitors" className="nav-link">
          Monitors
        </a>
        <a href="#incidents" className="nav-link">
          Incidents
        </a>
      </nav>

    </header>
  )
}

export default Header
