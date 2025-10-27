import { useEffect, useState } from 'react'
import EditableCell from '../components/EditableCell'
import AddFormModal from '../components/AddFormModal'
import EditModal from '../components/EditModal'
import './PageStyles.css'

const CashBook = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-12-10', description: 'Payment from ABC Corp', amount: '$6,495', type: 'Income', category: 'Sales', balance: '$45,000' },
    { id: 2, date: '2024-12-10', description: 'Office Supplies Purchase', amount: '-$500', type: 'Expense', category: 'Supplies', balance: '$44,500' },
    { id: 3, date: '2024-12-09', description: 'Payment from XYZ Tech', amount: '$5,990', type: 'Income', category: 'Sales', balance: '$45,000' },
    { id: 4, date: '2024-12-09', description: 'Utility Bill Payment', amount: '-$1,200', type: 'Expense', category: 'Utilities', balance: '$38,810' },
    { id: 5, date: '2024-12-08', description: 'Payment from ABC Industry', amount: '$5,980', type: 'Income', category: 'Sales', balance: '$40,010' },
    { id: 6, date: '2024-12-08', description: 'Equipment Maintenance', amount: '-$800', type: 'Expense', category: 'Maintenance', balance: '$34,030' },
    { id: 7, date: '2024-12-07', description: 'Payment from XYZ Company', amount: '$950', type: 'Income', category: 'Sales', balance: '$34,830' },
    { id: 8, date: '2024-12-07', description: 'Software Subscription', amount: '-$2,500', type: 'Expense', category: 'Software', balance: '$33,880' },
  ])

  const handleUpdate = (id, field, value) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === id ? { ...transaction, [field]: value } : transaction
    ))
  }

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = (formData) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === editingTransaction.id ? { ...transaction, ...formData } : transaction
    ))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(transactions.filter(transaction => transaction.id !== id))
    }
  }

  const handleAddNew = (formData) => {
    const newTransaction = {
      id: Date.now(),
      date: formData.date || '2024-12-10',
      description: formData.description || 'New Transaction',
      amount: formData.amount || '$0',
      type: formData.type || 'Income',
      category: formData.category || 'Sales',
      balance: formData.balance || '$0'
    }
    setTransactions([newTransaction, ...transactions])
  }

  const formFields = [
    { name: 'description', label: 'Description', placeholder: 'Transaction Description', required: true },
    { name: 'amount', label: 'Amount', placeholder: '$0' },
    { name: 'category', label: 'Category', placeholder: 'Sales' },
    { name: 'date', label: 'Date', placeholder: '2024-12-10' },
  ]

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = typeFilter === 'All' || transaction.type === typeFilter
    
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return <div className="page-loading">Loading...</div>
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Cash Book</h1>
        <p className="page-subtitle">Track income and expenses (Click cells to edit)</p>
      </div>

      <div className="page-actions">
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ Add Transaction</button>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <select className="filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option>All</option>
          <option>Income</option>
          <option>Expense</option>
        </select>
      </div>

      <div className="data-card">
        <table className="data-table full-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td><EditableCell value={transaction.date} onUpdate={handleUpdate} field="date" rowId={transaction.id} /></td>
                <td><EditableCell value={transaction.description} onUpdate={handleUpdate} field="description" rowId={transaction.id} /></td>
                <td className={transaction.type === 'Income' ? 'amount-income' : 'amount-expense'}>
                  <EditableCell value={transaction.amount} onUpdate={handleUpdate} field="amount" rowId={transaction.id} />
                </td>
                <td><span className={`status-badge ${transaction.type.toLowerCase()}`}>{transaction.type}</span></td>
                <td><EditableCell value={transaction.category} onUpdate={handleUpdate} field="category" rowId={transaction.id} /></td>
                <td><EditableCell value={transaction.balance} onUpdate={handleUpdate} field="balance" rowId={transaction.id} /></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit" onClick={() => handleEdit(transaction)}>✏️</button>
                    <button className="btn-icon" title="Delete" onClick={() => handleDelete(transaction.id)}>🗑️</button>
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
        title="Add New Transaction"
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        fields={formFields}
        initialData={editingTransaction}
        title="Edit Transaction"
      />
    </div>
  )
}

export default CashBook

