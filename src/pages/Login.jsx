import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('Demo login successful')
    setTimeout(() => navigate('/dashboard'), 600)
  }

  return (
    <div className="page-shell page-compact">
      <header className="site-header">
        <div className="container nav-wrap">
          <Link to="/" className="brand">
            <span className="brand-mark">P</span>
            <span>PulseWatch</span>
          </Link>
        </div>
      </header>

      <main className="container auth-wrap">
        <section className="auth-card">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@college.edu"
                required
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </label>

            <button type="submit" className="primary-button full-width">Login</button>
          </form>

          {message && <p className="demo-message">{message}</p>}

          <p className="auth-link">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Login
