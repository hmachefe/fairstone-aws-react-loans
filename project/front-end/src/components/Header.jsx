import Nav from "./Nav";
import logo from "../assets/logo.jpeg";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <img src={logo} alt="Fairstone Logo" className="logo" />
        <Nav />
      </div>
    </header>
  );
}