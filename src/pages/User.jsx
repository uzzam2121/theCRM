import { useEffect, useState } from 'react'
import EditableCell from '../components/EditableCell'
import AddFormModal from '../components/AddFormModal'
import EditModal from '../components/EditModal'
import './PageStyles.css'

const User = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'email@example.com', phone: '11111111', role: 'Admin', department: 'Sales', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'email@example.com', phone: '11111111', role: 'Manager', department: 'Marketing', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'email@example.com', phone: '11111111', role: 'User', department: 'Sales', status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'email@example.com', phone: '11111111', role: 'User', department: 'Support', status: 'Inactive' },
    { id: 5, name: 'Charlie Wilson', email: 'email@example.com', phone: '11111111', role: 'Manager', department: 'Operations', status: 'Active' },
    { id: 6, name: 'Ellie Paul', email: 'email@example.com', phone: '11111111', role: 'User', department: 'Sales', status: 'Active' },
    { id: 7, name: 'Edward Lee', email: 'email@example.com', phone: '11111111', role: 'Admin', department: 'IT', status: 'Active' },
    { id: 8, name: 'Fiona Green', email: 'email@example.com', phone: '11111111', role: 'User', department: 'HR', status: 'Active' },
  ])

  const handleUpdate = (id, field, value) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, [field]: value } : user
    ))
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = (formData) => {
    setUsers(users.map(user => 
      user.id === editingUser.id ? { ...user, ...formData } : user
    ))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id))
    }
  }

  const handleAddNew = (formData) => {
    const newUser = {
      id: Date.now(),
      name: formData.name || 'New User',
      email: formData.email || 'email@example.com',
      phone: formData.phone || '11111111',
      role: formData.role || 'User',
      department: formData.department || 'Sales',
      status: formData.status || 'Active'
    }
    setUsers([newUser, ...users])
  }

  const formFields = [
    { name: 'name', label: 'Name', placeholder: 'Full Name', required: true },
    { name: 'email', label: 'Email', placeholder: 'email@example.com' },
    { name: 'phone', label: 'Phone', placeholder: '11111111' },
    { name: 'department', label: 'Department', placeholder: 'Sales' },
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = statusFilter === 'All' || user.status === statusFilter
    
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return <div className="page-loading">Loading...</div>
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Users</h1>
        <p className="page-subtitle">Manage system users (Click cells to edit)</p>
      </div>

      <div className="page-actions">
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ Add New User</button>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="data-card">
        <table className="data-table full-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td><EditableCell value={user.name} onUpdate={handleUpdate} field="name" rowId={user.id} /></td>
                <td><EditableCell value={user.email} onUpdate={handleUpdate} field="email" rowId={user.id} /></td>
                <td><EditableCell value={user.phone} onUpdate={handleUpdate} field="phone" rowId={user.id} /></td>
                <td><span className="role-badge">{user.role}</span></td>
                <td><EditableCell value={user.department} onUpdate={handleUpdate} field="department" rowId={user.id} /></td>
                <td><span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit" onClick={() => handleEdit(user)}>✏️</button>
                    <button className="btn-icon" title="Delete" onClick={() => handleDelete(user.id)}>🗑️</button>
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
        title="Add New User"
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        fields={formFields}
        initialData={editingUser}
        title="Edit User"
      />
    </div>
  )
}

export default User

