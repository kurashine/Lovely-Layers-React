import { FC } from "react";
import Line from "../Line/Line";

import { useFooterData } from "../../hooks/api/useFooterData";

import "./Footer.css";

const Footer: FC = () => {
  const { data } = useFooterData();

  if (!data) {
    return null;
  }

  return (
    <div className="container">
      <Line />
      <div className="footer">
        <div className="footer__links-wrapper">
          <p>{data.data.attributes.social_links_title}</p>
          <div className="footer__links">
            {data.data.attributes.social_links.map(({ href, icon, id }) => (
              <a
                key={id}
                target="_blank"
                rel="noreferrer"
                href={href}
                className="footer__link"
              >
                <img
                  src={process.env.REACT_APP_API_URL + icon.data.attributes.url}
                  alt={icon.data.attributes.alternativeText}
                />
              </a>
            ))}
          </div>
        </div>
        <div className="footer__suppot">
          <p>{data.data.attributes.support_block.title}</p>
          <a
            href={`tel:${data.data.attributes.support_block.link.replaceAll(
              " ",
              ""
            )}`}
          >
            {data.data.attributes.support_block.link}
          </a>
        </div>
        <p className="footer__copyright">{data.data.attributes.copyright}</p>
      </div>
    </div>
  );
};

export default Footer;
