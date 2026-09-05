import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { confirmSignUp, getReadableAuthError, resendConfirmationCode, signIn } from '../services/auth'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [needsVerification, setNeedsVerification] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setIsSubmitting(true)
    try {
      await signIn(formData.email, formData.password)
      navigate('/dashboard')
    } catch (authError) {
      setError(getReadableAuthError(authError))
      setNeedsVerification(authError.code === 'UserNotConfirmedException')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerification = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setIsSubmitting(true)
    try {
      await confirmSignUp(formData.email, verificationCode)
      setNeedsVerification(false)
      setMessage('Email verified. You can now log in.')
      setVerificationCode('')
    } catch (authError) {
      setError(getReadableAuthError(authError))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    setError('')
    setMessage('')
    try {
      await resendConfirmationCode(formData.email)
      setMessage('A new verification code was sent to your email.')
    } catch (authError) {
      setError(getReadableAuthError(authError))
    }
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

            <button type="submit" className="primary-button full-width" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          {needsVerification && (
            <form onSubmit={handleVerification} className="auth-form">
              <label>
                <span>Verification Code</span>
                <input value={verificationCode} onChange={(event) => setVerificationCode(event.target.value)} required />
              </label>
              <button type="submit" className="primary-button full-width" disabled={isSubmitting}>Verify Email</button>
              <button type="button" className="secondary-button full-width" onClick={handleResend} disabled={isSubmitting}>
                Resend Code
              </button>
            </form>
          )}

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
