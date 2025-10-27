import { useEffect, useState } from 'react'
import EditableCell from '../components/EditableCell'
import AddFormModal from '../components/AddFormModal'
import EditModal from '../components/EditModal'
import './PageStyles.css'

const Sales = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingSale, setEditingSale] = useState(null)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const [sales, setSales] = useState([
    { id: 1, customer: 'ABC Corp', product: 'Laptop Pro 15', quantity: 5, amount: '$6,495', salesperson: 'John Doe', date: '2024-12-01', status: 'Completed' },
    { id: 2, customer: 'XYZ Tech', product: 'Monitor 27"', quantity: 10, amount: '$5,990', salesperson: 'Jane Smith', date: '2024-12-02', status: 'Completed' },
    { id: 3, customer: 'ABC Industry', product: 'Office Chair', quantity: 20, amount: '$5,980', salesperson: 'Bob Johnson', date: '2024-12-03', status: 'Pending' },
    { id: 4, customer: 'XYZ Company', product: 'USB-C Cable', quantity: 50, amount: '$950', salesperson: 'Alice Brown', date: '2024-12-04', status: 'Completed' },
    { id: 5, customer: 'ABC Corp', product: 'Keyboard Mechanical', quantity: 15, amount: '$2,235', salesperson: 'Charlie Wilson', date: '2024-12-05', status: 'Processing' },
    { id: 6, customer: 'XYZ Tech', product: 'Wireless Mouse', quantity: 30, amount: '$1,470', salesperson: 'Diana Prince', date: '2024-12-06', status: 'Completed' },
    { id: 7, customer: 'ABC Industry', product: 'Desk Lamp', quantity: 25, amount: '$1,975', salesperson: 'Edward Lee', date: '2024-12-07', status: 'Completed' },
    { id: 8, customer: 'XYZ Company', product: 'Printer Paper', quantity: 100, amount: '$2,900', salesperson: 'Fiona Green', date: '2024-12-08', status: 'Pending' },
  ])

  const handleUpdate = (id, field, value) => {
    setSales(sales.map(sale => 
      sale.id === id ? { ...sale, [field]: value } : sale
    ))
  }

  const handleEdit = (sale) => {
    setEditingSale(sale)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = (formData) => {
    setSales(sales.map(sale => 
      sale.id === editingSale.id ? { ...sale, ...formData } : sale
    ))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      setSales(sales.filter(sale => sale.id !== id))
    }
  }

  const handleAddNew = (formData) => {
    const newSale = {
      id: Date.now(),
      customer: formData.customer || 'ABC Corp',
      product: formData.product || 'New Product',
      quantity: formData.quantity || 1,
      amount: formData.amount || '$0',
      salesperson: formData.salesperson || 'Sales Rep',
      date: formData.date || '2024-12-10',
      status: formData.status || 'Pending'
    }
    setSales([newSale, ...sales])
  }

  const formFields = [
    { name: 'customer', label: 'Customer', placeholder: 'ABC Corp', required: true },
    { name: 'product', label: 'Product', placeholder: 'Product Name' },
    { name: 'quantity', label: 'Quantity', placeholder: '1' },
    { name: 'amount', label: 'Amount', placeholder: '$0' },
    { name: 'salesperson', label: 'Salesperson', placeholder: 'Sales Rep' },
    { name: 'date', label: 'Date', placeholder: '2024-12-10' },
  ]

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.salesperson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = statusFilter === 'All' || sale.status === statusFilter
    
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return <div className="page-loading">Loading...</div>
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Sales</h1>
        <p className="page-subtitle">Track your sales records (Click cells to edit)</p>
      </div>

      <div className="page-actions">
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ Add New Sale</button>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search sales..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Processing</option>
        </select>
      </div>

      <div className="data-card">
        <table className="data-table full-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Salesperson</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale.id}>
                <td><EditableCell value={sale.customer} onUpdate={handleUpdate} field="customer" rowId={sale.id} /></td>
                <td><EditableCell value={sale.product} onUpdate={handleUpdate} field="product" rowId={sale.id} /></td>
                <td><EditableCell value={sale.quantity} onUpdate={handleUpdate} field="quantity" rowId={sale.id} /></td>
                <td><EditableCell value={sale.amount} onUpdate={handleUpdate} field="amount" rowId={sale.id} /></td>
                <td><EditableCell value={sale.salesperson} onUpdate={handleUpdate} field="salesperson" rowId={sale.id} /></td>
                <td><EditableCell value={sale.date} onUpdate={handleUpdate} field="date" rowId={sale.id} /></td>
                <td><span className={`status-badge ${sale.status.toLowerCase()}`}>{sale.status}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit" onClick={() => handleEdit(sale)}>✏️</button>
                    <button className="btn-icon" title="Delete" onClick={() => handleDelete(sale.id)}>🗑️</button>
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
        title="Add New Sale"
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        fields={formFields}
        initialData={editingSale}
        title="Edit Sale"
      />
    </div>
  )
}

export default Sales

