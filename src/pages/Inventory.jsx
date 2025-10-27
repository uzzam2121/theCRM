import { useEffect, useState } from 'react'
import EditableCell from '../components/EditableCell'
import AddFormModal from '../components/AddFormModal'
import EditModal from '../components/EditModal'
import './PageStyles.css'

const Inventory = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const [items, setItems] = useState([
    { id: 1, name: 'Laptop Pro 15', category: 'Electronics', quantity: 25, price: '$1,299', supplier: 'ABC Corp', status: 'In Stock' },
    { id: 2, name: 'Office Chair', category: 'Furniture', quantity: 45, price: '$299', supplier: 'XYZ Tech', status: 'In Stock' },
    { id: 3, name: 'Wireless Mouse', category: 'Electronics', quantity: 8, price: '$49', supplier: 'ABC Industry', status: 'Low Stock' },
    { id: 4, name: 'Desk Lamp', category: 'Furniture', quantity: 0, price: '$79', supplier: 'XYZ Company', status: 'Out of Stock' },
    { id: 5, name: 'USB-C Cable', category: 'Electronics', quantity: 120, price: '$19', supplier: 'ABC Corp', status: 'In Stock' },
    { id: 6, name: 'Monitor 27"', category: 'Electronics', quantity: 15, price: '$599', supplier: 'XYZ Tech', status: 'In Stock' },
    { id: 7, name: 'Keyboard Mechanical', category: 'Electronics', quantity: 3, price: '$149', supplier: 'ABC Industry', status: 'Low Stock' },
    { id: 8, name: 'Printer Paper', category: 'Office Supplies', quantity: 200, price: '$29', supplier: 'XYZ Company', status: 'In Stock' },
  ])

  const handleUpdate = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = (formData) => {
    setItems(items.map(item => 
      item.id === editingItem.id ? { ...item, ...formData } : item
    ))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const handleAddNew = (formData) => {
    const newItem = {
      id: Date.now(),
      name: formData.name || 'New Item',
      category: formData.category || 'Electronics',
      quantity: formData.quantity || 0,
      price: formData.price || '$0',
      supplier: formData.supplier || 'ABC Corp',
      status: formData.status || 'In Stock'
    }
    setItems([newItem, ...items])
  }

  const formFields = [
    { name: 'name', label: 'Item Name', placeholder: 'Item Name', required: true },
    { name: 'category', label: 'Category', placeholder: 'Electronics' },
    { name: 'quantity', label: 'Quantity', placeholder: '0' },
    { name: 'price', label: 'Price', placeholder: '$0' },
    { name: 'supplier', label: 'Supplier', placeholder: 'ABC Corp' },
  ]

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = statusFilter === 'All' || item.status.toLowerCase().replace(' ', '-') === statusFilter.toLowerCase().replace(' ', '-')
    
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return <div className="page-loading">Loading...</div>
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Inventory</h1>
        <p className="page-subtitle">Manage your inventory items (Click cells to edit)</p>
      </div>

      <div className="page-actions">
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ Add New Item</button>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search inventory..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      <div className="data-card">
        <table className="data-table full-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Supplier</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td><EditableCell value={item.name} onUpdate={handleUpdate} field="name" rowId={item.id} /></td>
                <td><EditableCell value={item.category} onUpdate={handleUpdate} field="category" rowId={item.id} /></td>
                <td><EditableCell value={item.quantity} onUpdate={handleUpdate} field="quantity" rowId={item.id} /></td>
                <td><EditableCell value={item.price} onUpdate={handleUpdate} field="price" rowId={item.id} /></td>
                <td><EditableCell value={item.supplier} onUpdate={handleUpdate} field="supplier" rowId={item.id} /></td>
                <td><span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit" onClick={() => handleEdit(item)}>✏️</button>
                    <button className="btn-icon" title="Delete" onClick={() => handleDelete(item.id)}>🗑️</button>
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
        title="Add New Item"
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        fields={formFields}
        initialData={editingItem}
        title="Edit Item"
      />
    </div>
  )
}

export default Inventory

