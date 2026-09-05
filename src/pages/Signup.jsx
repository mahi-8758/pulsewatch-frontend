import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { confirmSignUp, getReadableAuthError, resendConfirmationCode, signUp } from '../services/auth'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerification, setIsVerification] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
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
    setSuccess('')
    setIsSubmitting(true)
    try {
      await signUp(formData)
      setIsVerification(true)
      setSuccess('A verification code was sent to your email.')
    } catch (authError) {
      setError(getReadableAuthError(authError))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerification = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await confirmSignUp(formData.email, verificationCode)
      setIsVerification(false)
      setSuccess('Email verified successfully. Please login to continue.')
    } catch (authError) {
      setError(getReadableAuthError(authError))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    setError('')
    try {
      await resendConfirmationCode(formData.email)
      setSuccess('A new verification code was sent to your email.')
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
          <h1>Create Account</h1>
          {!isVerification ? <form onSubmit={handleSubmit} className="auth-form">
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

            <button type="submit" className="primary-button full-width" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form> : (
            <form onSubmit={handleVerification} className="auth-form">
              <p>Enter the verification code sent to {formData.email}.</p>
              <label>
                <span>Verification Code</span>
                <input value={verificationCode} onChange={(event) => setVerificationCode(event.target.value)} required />
              </label>
              <button type="submit" className="primary-button full-width" disabled={isSubmitting}>Verify Email</button>
              <button type="button" className="secondary-button full-width" onClick={handleResend} disabled={isSubmitting}>Resend Code</button>
            </form>
          )}

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          {success && !isVerification && (
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
