import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Leads from './pages/Leads'
import ToDoTasks from './pages/ToDoTasks'
import User from './pages/User'
import Authorization from './pages/Authorization'
import Inventory from './pages/Inventory'
import Sales from './pages/Sales'
import Transcript from './pages/Transcript'
import CashBook from './pages/CashBook'
import Vouchers from './pages/Vouchers'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/todo-tasks" element={<ToDoTasks />} />
            <Route path="/user" element={<User />} />
            <Route path="/authorization" element={<Authorization />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/transcript" element={<Transcript />} />
            <Route path="/cash-book" element={<CashBook />} />
            <Route path="/vouchers" element={<Vouchers />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

