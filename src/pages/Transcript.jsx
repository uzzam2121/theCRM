import { useEffect, useState } from 'react'
import EditableCell from '../components/EditableCell'
import AddFormModal from '../components/AddFormModal'
import EditModal from '../components/EditModal'
import './PageStyles.css'

const Transcript = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTranscript, setEditingTranscript] = useState(null)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const [transcripts, setTranscripts] = useState([
    { id: 1, callId: 'CALL-001', customer: 'ABC Corp', agent: 'John Doe', duration: '15:30', date: '2024-12-10', type: 'Support', status: 'Completed' },
    { id: 2, callId: 'CALL-002', customer: 'XYZ Tech', agent: 'Jane Smith', duration: '08:45', date: '2024-12-10', type: 'Sales', status: 'Completed' },
    { id: 3, callId: 'CALL-003', customer: 'ABC Industry', agent: 'Bob Johnson', duration: '22:15', date: '2024-12-09', type: 'Support', status: 'Completed' },
    { id: 4, callId: 'CALL-004', customer: 'XYZ Company', agent: 'Alice Brown', duration: '12:20', date: '2024-12-09', type: 'Sales', status: 'Completed' },
    { id: 5, callId: 'CALL-005', customer: 'ABC Corp', agent: 'Charlie Wilson', duration: '05:10', date: '2024-12-08', type: 'Support', status: 'Failed' },
    { id: 6, callId: 'CALL-006', customer: 'XYZ Tech', agent: 'Ellie Paul', duration: '18:30', date: '2024-12-08', type: 'Sales', status: 'Completed' },
    { id: 7, callId: 'CALL-007', customer: 'ABC Industry', agent: 'Edward Lee', duration: '09:50', date: '2024-12-07', type: 'Support', status: 'Completed' },
    { id: 8, callId: 'CALL-008', customer: 'XYZ Company', agent: 'Fiona Green', duration: '11:25', date: '2024-12-07', type: 'Sales', status: 'Completed' },
  ])

  const handleUpdate = (id, field, value) => {
    setTranscripts(transcripts.map(transcript => 
      transcript.id === id ? { ...transcript, [field]: value } : transcript
    ))
  }

  const handleEdit = (transcript) => {
    setEditingTranscript(transcript)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = (formData) => {
    setTranscripts(transcripts.map(transcript => 
      transcript.id === editingTranscript.id ? { ...transcript, ...formData } : transcript
    ))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transcript?')) {
      setTranscripts(transcripts.filter(transcript => transcript.id !== id))
    }
  }

  const handleAddNew = (formData) => {
    const newTranscript = {
      id: Date.now(),
      callId: `CALL-${String(transcripts.length + 1).padStart(3, '0')}`,
      customer: formData.customer || 'ABC Corp',
      agent: formData.agent || 'Agent Name',
      duration: formData.duration || '00:00',
      date: formData.date || '2024-12-10',
      type: formData.type || 'Support',
      status: formData.status || 'Completed'
    }
    setTranscripts([newTranscript, ...transcripts])
  }

  const formFields = [
    { name: 'customer', label: 'Customer', placeholder: 'ABC Corp', required: true },
    { name: 'agent', label: 'Agent', placeholder: 'Agent Name' },
    { name: 'duration', label: 'Duration', placeholder: '00:00' },
    { name: 'date', label: 'Date', placeholder: '2024-12-10' },
  ]

  const filteredTranscripts = transcripts.filter(transcript => {
    const matchesSearch = transcript.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transcript.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transcript.callId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = typeFilter === 'All' || transcript.type === typeFilter
    
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return <div className="page-loading">Loading...</div>
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Transcript</h1>
        <p className="page-subtitle">View call transcripts and recordings (Click cells to edit)</p>
      </div>

      <div className="page-actions">
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>🔍 Generate Transcript</button>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search transcripts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <select className="filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option>All</option>
          <option>Sales</option>
          <option>Support</option>
        </select>
      </div>

      <div className="data-card">
        <table className="data-table full-table">
          <thead>
            <tr>
              <th>Call ID</th>
              <th>Customer</th>
              <th>Agent</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTranscripts.map((transcript) => (
              <tr key={transcript.id}>
                <td>{transcript.callId}</td>
                <td><EditableCell value={transcript.customer} onUpdate={handleUpdate} field="customer" rowId={transcript.id} /></td>
                <td><EditableCell value={transcript.agent} onUpdate={handleUpdate} field="agent" rowId={transcript.id} /></td>
                <td><EditableCell value={transcript.duration} onUpdate={handleUpdate} field="duration" rowId={transcript.id} /></td>
                <td><EditableCell value={transcript.date} onUpdate={handleUpdate} field="date" rowId={transcript.id} /></td>
                <td><span className="type-badge">{transcript.type}</span></td>
                <td><span className={`status-badge ${transcript.status.toLowerCase()}`}>{transcript.status}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit" onClick={() => handleEdit(transcript)}>✏️</button>
                    <button className="btn-icon" title="Delete" onClick={() => handleDelete(transcript.id)}>🗑️</button>
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
        title="Generate New Transcript"
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        fields={formFields}
        initialData={editingTranscript}
        title="Edit Transcript"
      />
    </div>
  )
}

export default Transcript

