import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatDashBoard from "./pages/ChatDashboard";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatDashBoard />} />
      <Route path="/login" element={< LoginPage />} />
    </Routes>
  );
}

export default App
