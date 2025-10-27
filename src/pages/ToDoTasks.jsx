import { useEffect, useState } from 'react'
import EditableCell from '../components/EditableCell'
import AddFormModal from '../components/AddFormModal'
import EditModal from '../components/EditModal'
import './PageStyles.css'

const ToDoTasks = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Follow up with ABC Corp', assignee: 'John Doe', priority: 'High', dueDate: '2024-12-10', status: 'Pending' },
    { id: 2, title: 'Prepare sales report for Q4', assignee: 'Jane Smith', priority: 'Medium', dueDate: '2024-12-11', status: 'In Progress' },
    { id: 3, title: 'Update inventory database', assignee: 'Bob Johnson', priority: 'Low', dueDate: '2024-12-15', status: 'Pending' },
    { id: 4, title: 'Schedule demo call with XYZ Tech', assignee: 'Alice Brown', priority: 'High', dueDate: '2024-12-10', status: 'Completed' },
    { id: 5, title: 'Review and approve vouchers', assignee: 'Charlie Wilson', priority: 'Medium', dueDate: '2024-12-12', status: 'Pending' },
    { id: 6, title: 'Conduct training session', assignee: 'Diana Prince', priority: 'Low', dueDate: '2024-12-18', status: 'In Progress' },
    { id: 7, title: 'Send welcome email to new clients', assignee: 'Edward Lee', priority: 'Medium', dueDate: '2024-12-11', status: 'Pending' },
    { id: 8, title: 'Update website content', assignee: 'Fiona Green', priority: 'Low', dueDate: '2024-12-20', status: 'Pending' },
  ])

  const handleUpdate = (id, field, value) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, [field]: value } : task
    ))
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = (formData) => {
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...task, ...formData } : task
    ))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  const handleAddNew = (formData) => {
    const newTask = {
      id: Date.now(),
      title: formData.title || 'New Task',
      assignee: formData.assignee || 'User',
      priority: formData.priority || 'Medium',
      dueDate: formData.dueDate || '2024-12-31',
      status: formData.status || 'Pending'
    }
    setTasks([newTask, ...tasks])
  }

  const formFields = [
    { name: 'title', label: 'Task Title', placeholder: 'Task Title', required: true },
    { name: 'assignee', label: 'Assignee', placeholder: 'User Name' },
    { name: 'dueDate', label: 'Due Date', placeholder: '2024-12-31' },
  ]

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = statusFilter === 'All' || task.status.toLowerCase().replace(' ', '-') === statusFilter.toLowerCase().replace(' ', '-')
    
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return <div className="page-loading">Loading...</div>
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">To Do Tasks</h1>
        <p className="page-subtitle">Track and manage your tasks (Click cells to edit)</p>
      </div>

      <div className="page-actions">
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ Add New Task</button>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="data-card">
        <table className="data-table full-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Assignee</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td><EditableCell value={task.title} onUpdate={handleUpdate} field="title" rowId={task.id} /></td>
                <td><EditableCell value={task.assignee} onUpdate={handleUpdate} field="assignee" rowId={task.id} /></td>
                <td><span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span></td>
                <td><EditableCell value={task.dueDate} onUpdate={handleUpdate} field="dueDate" rowId={task.id} /></td>
                <td><span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit" onClick={() => handleEdit(task)}>✏️</button>
                    <button className="btn-icon" title="Delete" onClick={() => handleDelete(task.id)}>🗑️</button>
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
        title="Add New Task"
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        fields={formFields}
        initialData={editingTask}
        title="Edit Task"
      />
    </div>
  )
}

export default ToDoTasks

