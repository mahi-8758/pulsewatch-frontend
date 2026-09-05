function AddMonitor({ isOpen, onClose, onAddMonitor, formData, setFormData, isSubmitting = false }) {
  if (!isOpen) return null

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onAddMonitor()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Monitor</h3>
          <button 
            type="button" 
            className="close-button" 
            onClick={onClose} 
            aria-label="Close"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="monitor-form">
          <label>
            <span>Monitor Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Main Website"
              required
              disabled={isSubmitting}
            />
          </label>

          <label>
            <span>Website/API URL</span>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com"
              required
              disabled={isSubmitting}
            />
          </label>

          <div className="modal-actions">
            <button 
              type="button" 
              className="secondary-button" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="primary-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Monitor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMonitor
