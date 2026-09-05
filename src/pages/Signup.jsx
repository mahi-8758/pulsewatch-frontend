import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.')
      setSuccess('')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      setSuccess('')
      return
    }

    setError('')
    setSuccess('Demo account created successfully. Please login to continue.')
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
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </label>

            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@college.edu"
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
              />
            </label>

            <label>
              <span>Confirm Password</span>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </label>

            <button type="submit" className="primary-button full-width">Create Account</button>
          </form>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          {success && (
            <p className="auth-link">
              <Link to="/login">Go to Login</Link>
            </p>
          )}

          {!success && (
            <p className="auth-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Signup
