import "./AdminNavigation.css";
import { Link } from "react-router-dom";

const AdminNavigation = () => {
  const isDashbord = true;

  return (
    <div className="navigation">
      <div className="container navigation__hero">
        <Link to="/">
          <img
            alt="Logo"
            className="navigation__logo"
            src="/static/images/navbar-logo.svg"
          />
        </Link>
        <nav className="navigation__categories">
          <ul>
            <li
              className={`navigation__link ${
                isDashbord ? "navigation__link_active" : ""
              }`}
            >
              <Link to={"/admin/dashboard"}>Aналітика</Link>
            </li>
          </ul>
        </nav>
        <ul>
          <li className="navigation__cart">
            <Link to="/">
              <img
                src={"/static/images/shopping-cart.svg"}
                alt="Shopping Cart"
              />
            </Link>
          </li>
          <li>
            <Link to="/favourites">
              <img src={"/static/images/favourites.svg"} alt="Favourites" />
            </Link>
          </li>
          <li>
            <Link to="/admin/dashboard">
              <img src={"/static/images/fi_user.svg"} alt="User" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavigation;
