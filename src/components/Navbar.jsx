import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/leads', label: 'Leads', icon: '👥' },
    { path: '/todo-tasks', label: 'To Do Tasks', icon: '✅' },
    { path: '/user', label: 'User', icon: '👤' },
    { path: '/authorization', label: 'Authorization', icon: '🔐' },
    { path: '/inventory', label: 'Inventory', icon: '📦' },
    { path: '/sales', label: 'Sales', icon: '💰' },
    { path: '/transcript', label: 'Transcript', icon: '📝' },
    { path: '/cash-book', label: 'Cash Book', icon: '💵' },
    { path: '/vouchers', label: 'Vouchers', icon: '🎫' },
  ]

  return (
    <>
      <nav className="navbar">
        <div className="navbar-header">
          <h1 className="navbar-logo">
            <span className="logo-icon">📈</span>
            <span className="logo-text">MU CRM</span>
          </h1>
        </div>
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.path} className="navbar-item">
              <Link
                to={item.path}
                className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {location.pathname === item.path && (
                  <span className="active-indicator"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <div className="navbar-footer">
          <div className="user-profile">
            <div className="profile-avatar">U</div>
            <div className="profile-info">
              <div className="profile-name">Admin User</div>
              <div className="profile-email">email@example.com</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Mobile Overlay */}
      <div className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>

      {/* Mobile Navbar */}
      <nav className={`mobile-navbar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-navbar-header">
          <h1 className="mobile-navbar-logo">
            <span className="logo-icon">📈</span>
            <span className="logo-text">MU CRM</span>
          </h1>
          <button
            className="close-menu-button"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ✕
          </button>
        </div>
        <ul className="mobile-navbar-menu">
          {navItems.map((item) => (
            <li key={item.path} className="mobile-navbar-item">
              <Link
                to={item.path}
                className={`mobile-navbar-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Navbar

