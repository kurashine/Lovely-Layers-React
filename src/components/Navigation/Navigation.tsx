import Skeleton from "react-loading-skeleton";
import { useCategoriesData } from "../../hooks/api/useCategoriesData";
import "./Navigation.css";
import { Link, useParams, useLocation } from "react-router-dom";
import { useCart } from "../../hooks/logic/useCart";

const Navigation = () => {
  const { data, isLoading } = useCategoriesData();
  let { slug } = useParams();
  const { pathname } = useLocation();

  const isFavPage = pathname.includes("favourites");
  const isCartPage = pathname.includes("cart");

  const { products } = useCart();

  const productsInCart = products.length;

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
            {isLoading
              ? [0, 1, 2, 3].map((key) => (
                  <li key={key}>
                    <Skeleton highlightColor="#595959" width={40} />
                  </li>
                ))
              : data.map(({ attributes, id }) => {
                  const isActive = attributes.slug === slug;
                  const route = `/categories/${attributes.slug}`;

                  return (
                    <li
                      className={`navigation__link ${
                        isActive ? "navigation__link_active" : ""
                      }`}
                      key={id}
                    >
                      <Link to={route}>{attributes.label}</Link>
                    </li>
                  );
                })}
          </ul>
        </nav>
        <ul>
          <li className="navigation__cart">
            <Link to="/cart">
              <span className="navigation__products-count">
                {productsInCart}
              </span>
              <img
                src={
                  isCartPage
                    ? "/static/images/shopping-cart-active.svg"
                    : "/static/images/shopping-cart.svg"
                }
                alt="Shopping Cart"
              />
            </Link>
          </li>
          <li>
            <Link to="/favourites">
              <img
                src={
                  isFavPage
                    ? "/static/images/favourities-nav-heart-active.svg"
                    : "/static/images/favourites.svg"
                }
                alt="Favourites"
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
