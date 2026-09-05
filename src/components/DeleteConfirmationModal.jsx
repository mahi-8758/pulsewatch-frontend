function DeleteConfirmationModal({ isOpen, onClose, onConfirm, monitorName, isDeleting = false }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>Delete Monitor</h3>
          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close"
            disabled={isDeleting}
          >
            ×
          </button>
        </div>

        <div className="delete-modal-body">
          <p>
            Are you sure you want to delete <strong>{monitorName}</strong>? This action cannot be undone.
          </p>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="danger-button"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
