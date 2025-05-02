import { Routes, Route } from "react-router-dom";
import CreateForm from "../pages/CreateForm";
import ListPage from "../pages/ListPage";
import DetailPage from "../pages/DetailPage";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreateForm />} />
      <Route path="/applications" element={<ListPage />} />
      <Route path="/applications/:id" element={<DetailPage />} />
    </Routes>
  );
}