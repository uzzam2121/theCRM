import { useEffect, useState } from 'react'
import EditableCell from '../components/EditableCell'
import AddFormModal from '../components/AddFormModal'
import EditModal from '../components/EditModal'
import './PageStyles.css'

const Authorization = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingAuth, setEditingAuth] = useState(null)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const [authorizations, setAuthorizations] = useState([
    { id: 1, user: 'John Doe', permission: 'Full Access', module: 'Dashboard', status: 'Granted', date: '2024-12-01' },
    { id: 2, user: 'Jane Smith', permission: 'Read Only', module: 'Sales', status: 'Granted', date: '2024-12-02' },
    { id: 3, user: 'Bob Johnson', permission: 'Read/Write', module: 'Inventory', status: 'Granted', date: '2024-12-03' },
    { id: 4, user: 'Alice Brown', permission: 'Read Only', module: 'Leads', status: 'Pending', date: '2024-12-04' },
    { id: 5, user: 'Charlie Wilson', permission: 'Full Access', module: 'Users', status: 'Granted', date: '2024-12-05' },
    { id: 6, user: 'Elie Paul', permission: 'Read/Write', module: 'Cash Book', status: 'Granted', date: '2024-12-06' },
    { id: 7, user: 'Edward Lee', permission: 'Read Only', module: 'Vouchers', status: 'Denied', date: '2024-12-07' },
    { id: 8, user: 'Fiona Green', permission: 'Read/Write', module: 'Authorization', status: 'Granted', date: '2024-12-08' },
  ])

  const handleUpdate = (id, field, value) => {
    setAuthorizations(authorizations.map(auth => 
      auth.id === id ? { ...auth, [field]: value } : auth
    ))
  }

  const handleEdit = (auth) => {
    setEditingAuth(auth)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = (formData) => {
    setAuthorizations(authorizations.map(auth => 
      auth.id === editingAuth.id ? { ...auth, ...formData } : auth
    ))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this authorization?')) {
      setAuthorizations(authorizations.filter(auth => auth.id !== id))
    }
  }

  const handleAddNew = (formData) => {
    const newAuth = {
      id: Date.now(),
      user: formData.user || 'New User',
      permission: formData.permission || 'Read Only',
      module: formData.module || 'Dashboard',
      status: formData.status || 'Pending',
      date: formData.date || '2024-12-10'
    }
    setAuthorizations([newAuth, ...authorizations])
  }

  const formFields = [
    { name: 'user', label: 'User', placeholder: 'User Name', required: true },
    { name: 'module', label: 'Module', placeholder: 'Dashboard' },
    { name: 'date', label: 'Date', placeholder: '2024-12-10' },
  ]

  const filteredAuthorizations = authorizations.filter(auth => {
    const matchesSearch = auth.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auth.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auth.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = statusFilter === 'All' || auth.status === statusFilter
    
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return <div className="page-loading">Loading...</div>
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Authorization</h1>
        <p className="page-subtitle">Manage user permissions and access (Click cells to edit)</p>
      </div>

      <div className="page-actions">
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ Grant New Authorization</button>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search authorizations..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Granted</option>
          <option>Pending</option>
          <option>Denied</option>
        </select>
      </div>

      <div className="data-card">
        <table className="data-table full-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Permission</th>
              <th>Module</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAuthorizations.map((auth) => (
              <tr key={auth.id}>
                <td><EditableCell value={auth.user} onUpdate={handleUpdate} field="user" rowId={auth.id} /></td>
                <td><span className="permission-badge">{auth.permission}</span></td>
                <td><EditableCell value={auth.module} onUpdate={handleUpdate} field="module" rowId={auth.id} /></td>
                <td><span className={`status-badge ${auth.status.toLowerCase()}`}>{auth.status}</span></td>
                <td><EditableCell value={auth.date} onUpdate={handleUpdate} field="date" rowId={auth.id} /></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit" onClick={() => handleEdit(auth)}>✏️</button>
                    <button className="btn-icon" title="Delete" onClick={() => handleDelete(auth.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddNew}
        fields={formFields}
        title="Grant New Authorization"
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        fields={formFields}
        initialData={editingAuth}
        title="Edit Authorization"
      />
    </div>
  )
}

export default Authorization

