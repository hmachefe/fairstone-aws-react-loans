import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateForm from "./pages/CreateForm";
import ListPage   from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <Link to="/">Create</Link> |{" "}
        <Link to="/applications">List</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CreateForm />} />
        <Route path="/applications" element={<ListPage />} />
        <Route path="/applications/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
