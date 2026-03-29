import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";

const About = () => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/about-page?populate=*`)
      .then(res => setContent(res.data.data.attributes))
      .catch(err => console.error(err));
  }, []);

  if (!content) return null;

  return (
    <Layout>
      <div className="container" style={{ padding: "40px 0" }}>
        <h1>{content.title}</h1>
        <div style={{ marginTop: "20px", lineHeight: "1.6" }}>
          {content.description}
        </div>
        {content.image?.data && (
          <img 
            src={process.env.REACT_APP_API_URL + content.image.data.attributes.url} 
            alt="About us" 
            style={{ maxWidth: "100%", marginTop: "20px" }}
          />
        )}
      </div>
    </Layout>
  );
};

export default About;
