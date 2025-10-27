import { useEffect, useState } from 'react'
import EditableCell from '../components/EditableCell'
import AddFormModal from '../components/AddFormModal'
import EditModal from '../components/EditModal'
import './PageStyles.css'

const Leads = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingLead, setEditingLead] = useState(null)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const [leads, setLeads] = useState([
    { id: 1, name: 'John Doe', company: 'ABC Corp', email: 'email@example.com', phone: '11111111', status: 'New', value: '$25K', source: 'Website' },
    { id: 2, name: 'Jane Smith', company: 'XYZ Tech', email: 'email@example.com', phone: '11111111', status: 'Contacted', value: '$45K', source: 'Social Media' },
    { id: 3, name: 'Bob Johnson', company: 'ABC Industry', email: 'email@example.com', phone: '11111111', status: 'Qualified', value: '$35K', source: 'Referral' },
    { id: 4, name: 'Alice Brown', company: 'XYZ Company', email: 'email@example.com', phone: '11111111', status: 'New', value: '$15K', source: 'Email' },
    { id: 5, name: 'Charlie Wilson', company: 'ABC Corp', email: 'email@example.com', phone: '11111111', status: 'Contacted', value: '$60K', source: 'Cold Call' },
    { id: 6, name: 'Diana Prince', company: 'XYZ Tech', email: 'email@example.com', phone: '11111111', status: 'Qualified', value: '$42K', source: 'Website' },
    { id: 7, name: 'Edward Lee', company: 'ABC Industry', email: 'email@example.com', phone: '11111111', status: 'New', value: '$28K', source: 'LinkedIn' },
    { id: 8, name: 'Fiona Green', company: 'XYZ Company', email: 'email@example.com', phone: '11111111', status: 'Qualified', value: '$55K', source: 'Referral' },
  ])

  const handleUpdate = (id, field, value) => {
    setLeads(leads.map(lead => 
      lead.id === id ? { ...lead, [field]: value } : lead
    ))
  }

  const handleEdit = (lead) => {
    setEditingLead(lead)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = (formData) => {
    setLeads(leads.map(lead => 
      lead.id === editingLead.id ? { ...lead, ...formData } : lead
    ))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(lead => lead.id !== id))
    }
  }

  const handleAddNew = (formData) => {
    const newLead = {
      id: Date.now(),
      name: formData.name || 'New Lead',
      company: formData.company || 'ABC Corp',
      email: formData.email || 'email@example.com',
      phone: formData.phone || '11111111',
      status: formData.status || 'New',
      value: formData.value || '$0',
      source: formData.source || 'Website'
    }
    setLeads([newLead, ...leads])
  }

  const formFields = [
    { name: 'name', label: 'Name', placeholder: 'Enter name', required: true },
    { name: 'company', label: 'Company', placeholder: 'ABC Corp' },
    { name: 'email', label: 'Email', placeholder: 'email@example.com' },
    { name: 'phone', label: 'Phone', placeholder: '11111111' },
    { name: 'value', label: 'Value', placeholder: '$0' },
    { name: 'source', label: 'Source', placeholder: 'Website' },
  ]

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = statusFilter === 'All' || lead.status === statusFilter
    
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return <div className="page-loading">Loading...</div>
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Leads</h1>
        <p className="page-subtitle">Manage and track your sales leads (Click cells to edit)</p>
      </div>

      <div className="page-actions">
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ Add New Lead</button>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
        </select>
      </div>

      <div className="data-card">
        <table className="data-table full-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Value</th>
              <th>Source</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id}>
                <td><EditableCell value={lead.name} onUpdate={handleUpdate} field="name" rowId={lead.id} /></td>
                <td><EditableCell value={lead.company} onUpdate={handleUpdate} field="company" rowId={lead.id} /></td>
                <td><EditableCell value={lead.email} onUpdate={handleUpdate} field="email" rowId={lead.id} /></td>
                <td><EditableCell value={lead.phone} onUpdate={handleUpdate} field="phone" rowId={lead.id} /></td>
                <td><span className={`status-badge ${lead.status.toLowerCase()}`}>{lead.status}</span></td>
                <td><EditableCell value={lead.value} onUpdate={handleUpdate} field="value" rowId={lead.id} /></td>
                <td><EditableCell value={lead.source} onUpdate={handleUpdate} field="source" rowId={lead.id} /></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit" onClick={() => handleEdit(lead)}>✏️</button>
                    <button className="btn-icon" title="Delete" onClick={() => handleDelete(lead.id)}>🗑️</button>
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
        title="Add New Lead"
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        fields={formFields}
        initialData={editingLead}
        title="Edit Lead"
      />
    </div>
  )
}

export default Leads

