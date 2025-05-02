import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Create" },
  { to: "/applications", label: "Applications" },
];

export default function Nav() {
  return (
    <nav className="nav">
      {navItems.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `nav-link${isActive ? " active" : ""}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}