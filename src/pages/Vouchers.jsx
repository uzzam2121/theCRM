import { useEffect, useState } from 'react'
import EditableCell from '../components/EditableCell'
import AddFormModal from '../components/AddFormModal'
import EditModal from '../components/EditModal'
import './PageStyles.css'

const Vouchers = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingVoucher, setEditingVoucher] = useState(null)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const [vouchers, setVouchers] = useState([
    { id: 1, voucherNo: 'VOUCH-001', type: 'Credit', amount: '$500', description: 'Customer Refund', status: 'Approved', date: '2024-12-10', approvedBy: 'John Doe' },
    { id: 2, voucherNo: 'VOUCH-002', type: 'Debit', amount: '$1,200', description: 'Utility Payment', status: 'Approved', date: '2024-12-10', approvedBy: 'Jane Smith' },
    { id: 3, voucherNo: 'VOUCH-003', type: 'Credit', amount: '$300', description: 'Discount Adjustment', status: 'Pending', date: '2024-12-09', approvedBy: '-' },
    { id: 4, voucherNo: 'VOUCH-004', type: 'Debit', amount: '$800', description: 'Equipment Purchase', status: 'Approved', date: '2024-12-09', approvedBy: 'Bob Johnson' },
    { id: 5, voucherNo: 'VOUCH-005', type: 'Credit', amount: '$200', description: 'Commission Payment', status: 'Rejected', date: '2024-12-08', approvedBy: 'Alice Brown' },
    { id: 6, voucherNo: 'VOUCH-006', type: 'Debit', amount: '$2,500', description: 'Software License', status: 'Approved', date: '2024-12-08', approvedBy: 'Charlie Wilson' },
    { id: 7, voucherNo: 'VOUCH-007', type: 'Credit', amount: '$150', description: 'Adjustment Credit', status: 'Pending', date: '2024-12-07', approvedBy: '-' },
    { id: 8, voucherNo: 'VOUCH-008', type: 'Debit', amount: '$600', description: 'Marketing Expenses', status: 'Approved', date: '2024-12-07', approvedBy: 'Ellie Paul' },
  ])

  const handleUpdate = (id, field, value) => {
    setVouchers(vouchers.map(voucher => 
      voucher.id === id ? { ...voucher, [field]: value } : voucher
    ))
  }

  const handleEdit = (voucher) => {
    setEditingVoucher(voucher)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = (formData) => {
    setVouchers(vouchers.map(voucher => 
      voucher.id === editingVoucher.id ? { ...voucher, ...formData } : voucher
    ))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this voucher?')) {
      setVouchers(vouchers.filter(voucher => voucher.id !== id))
    }
  }

  const handleAddNew = (formData) => {
    const newVoucher = {
      id: Date.now(),
      voucherNo: `VOUCH-${String(vouchers.length + 1).padStart(3, '0')}`,
      type: formData.type || 'Credit',
      amount: formData.amount || '$0',
      description: formData.description || 'New Voucher',
      status: formData.status || 'Pending',
      date: formData.date || '2024-12-10',
      approvedBy: formData.approvedBy || '-'
    }
    setVouchers([newVoucher, ...vouchers])
  }

  const formFields = [
    { name: 'description', label: 'Description', placeholder: 'Voucher Description', required: true },
    { name: 'amount', label: 'Amount', placeholder: '$0' },
    { name: 'date', label: 'Date', placeholder: '2024-12-10' },
    { name: 'approvedBy', label: 'Approved By', placeholder: 'Approver Name' },
  ]

  const filteredVouchers = vouchers.filter(voucher => {
    const matchesSearch = voucher.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = statusFilter === 'All' || voucher.status === statusFilter
    
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return <div className="page-loading">Loading...</div>
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Vouchers</h1>
        <p className="page-subtitle">Manage financial vouchers (Click cells to edit)</p>
      </div>

      <div className="page-actions">
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ Create New Voucher</button>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search vouchers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="data-card">
        <table className="data-table full-table">
          <thead>
            <tr>
              <th>Voucher No</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date</th>
              <th>Approved By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td>{voucher.voucherNo}</td>
                <td><span className={`status-badge ${voucher.type.toLowerCase()}`}>{voucher.type}</span></td>
                <td><EditableCell value={voucher.amount} onUpdate={handleUpdate} field="amount" rowId={voucher.id} /></td>
                <td><EditableCell value={voucher.description} onUpdate={handleUpdate} field="description" rowId={voucher.id} /></td>
                <td><span className={`status-badge ${voucher.status.toLowerCase()}`}>{voucher.status}</span></td>
                <td><EditableCell value={voucher.date} onUpdate={handleUpdate} field="date" rowId={voucher.id} /></td>
                <td><EditableCell value={voucher.approvedBy} onUpdate={handleUpdate} field="approvedBy" rowId={voucher.id} /></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit" onClick={() => handleEdit(voucher)}>✏️</button>
                    <button className="btn-icon" title="Delete" onClick={() => handleDelete(voucher.id)}>🗑️</button>
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
        title="Create New Voucher"
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        fields={formFields}
        initialData={editingVoucher}
        title="Edit Voucher"
      />
    </div>
  )
}

export default Vouchers

