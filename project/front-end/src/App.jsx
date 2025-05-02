import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import MainRoutes from "./routes/MainRoutes";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <MainRoutes />
      </main>
    </BrowserRouter>
  );
}