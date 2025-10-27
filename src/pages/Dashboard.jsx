import { useEffect, useState } from 'react'
import './Dashboard.css'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const stats = [
    { label: 'Total Leads', value: '250', icon: '👥', color: '#0099ff' },
    { label: 'Active Tasks', value: '45', icon: '✅', color: '#00ff88' },
    { label: 'Sales Revenue', value: '$125K', icon: '💰', color: '#ff9900' },
    { label: 'Inventory Items', value: '1,234', icon: '📦', color: '#ff0099' },
  ]

  const recentLeads = [
    { id: 1, name: 'John Doe', company: 'ABC Corp', status: 'New', value: '$25K' },
    { id: 2, name: 'Jane Smith', company: 'XYZ Tech', status: 'Contacted', value: '$45K' },
    { id: 3, name: 'Bob Johnson', company: 'ABC Industry', status: 'Qualified', value: '$35K' },
    { id: 4, name: 'Alice Brown', company: 'XYZ Company', status: 'New', value: '$15K' },
  ]

  const recentTasks = [
    { id: 1, title: 'Follow up with ABC Corp', priority: 'High', dueDate: 'Today' },
    { id: 2, title: 'Prepare sales report', priority: 'Medium', dueDate: 'Tomorrow' },
    { id: 3, title: 'Update inventory', priority: 'Low', dueDate: 'Dec 15' },
    { id: 4, title: 'Schedule demo call', priority: 'High', dueDate: 'Today' },
  ]

  if (isLoading) {
    return <div className="page-loading">Loading...</div>
  }

  return (
    <div className="dashboard page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ '--card-color': stat.color }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Recent Leads</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="card-content">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.company}</td>
                    <td><span className={`status-badge ${lead.status.toLowerCase()}`}>{lead.status}</span></td>
                    <td>{lead.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2>Recent Tasks</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="card-content">
            <div className="tasks-list">
              {recentTasks.map((task) => (
                <div key={task.id} className="task-item">
                  <div className="task-content">
                    <h3>{task.title}</h3>
                    <p>Due: {task.dueDate}</p>
                  </div>
                  <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

