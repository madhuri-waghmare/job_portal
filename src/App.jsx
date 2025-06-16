import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobList from "./pages/JobList";
import AdminPanel from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";
import Logout from "./pages/Logout";

function App() {
  return (
    <Router>

      <div className="app-container">
        <Header />
        <main className="hero">
          <Routes>
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/jobs" element={<AdminPanel />} />
        </Route>
            <Route  path="/" element={<Home />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route  path="/logout" element={<Logout />} />
          </Routes>
        </main>
        <Footer />
      </div>

    </Router>
  );
}

export default App;
