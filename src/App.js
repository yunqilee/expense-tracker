import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth";
import { ExpenseTracker } from "./pages/expense-tracker";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route path="/expense-tracker" element={<ExpenseTracker />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
