import { FC } from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

import "./Layout.css";

type Props = {
  withFooter?: boolean;
  className?: string;
  sidebarComponent?: JSX.Element;
  children: string | JSX.Element | JSX.Element[];
};

const Layout: FC<Props> = ({
  children,
  className = "",
  sidebarComponent,
  withFooter = true,
}) => {
  return (
    <div className={`layout ${className}`}>
      <Navigation />
      {sidebarComponent ? (
        <div className="layout__sidear-wrapper">
          {sidebarComponent}
          {children}
        </div>
      ) : (
        children
      )}
      {withFooter && <Footer />}
    </div>
  );
};

export default Layout;
