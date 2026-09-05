import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand">
          <span className="brand-mark">P</span>
          <span>PulseWatch</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
