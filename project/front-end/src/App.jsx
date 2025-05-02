// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateForm from "./pages/CreateForm";
import ListPage   from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import logo       from "./assets/logo.jpeg";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <div className="header-inner">
          <img src={logo} alt="Fairstone Logo" className="logo" />
          <nav className="nav">
            <Link to="/">Create</Link>
            <span className="divider">|</span>
            <Link to="/applications">List</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<CreateForm />} />
          <Route path="/applications" element={<ListPage />} />
          <Route path="/applications/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
