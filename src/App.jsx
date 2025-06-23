import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import JobList from "./pages/JobList";
import AdminPanel from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Logout from "./pages/Logout";
import { AuthContext } from "./hooks/AuthContext";
import ApplyJob from "./pages/Applyjob";
import JobDetail from "./pages/JobDetail";
import { ThemeProvider } from "./hooks/ThemeContext";


const ProtectedRoute = ({ children }) => {
    const { role } = useContext(AuthContext); 
    return role ? children : <Login />;
  };
  

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <Router>
          <div className="app-container">
            <Header />

            <main className="hero">
              <Routes>
                <Route path="/admin/jobs" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/apply/:jobId" element={<ApplyJob />} />
                <Route path="/admin/jobs/:jobId" element={<JobDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider >
  );
}

export default App;