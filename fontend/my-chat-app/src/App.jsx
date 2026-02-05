import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatDashBoard from "./pages/ChatDashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatDashBoard />} />
    </Routes>
  );
}

export default App
