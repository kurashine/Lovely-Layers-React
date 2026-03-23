import Congratulation from "../../components/Congratulation/Congratulation";
import Header from "../../components/Header/Header";
import HomeCards from "../../components/HomeCards/HomeCards";
import HomeCategory from "../../components/HomeCategory/HomeCategory";
import HomeDesc from "../../components/HomeDesc/HomeDesc";
import Layout from "../../components/Layout/Layout";
import Line from "../../components/Line/Line";
import { useHomeData } from "../../hooks/api/useHomeData";

import "./Home.css";

const Home = () => {
  const { data, isLoading } = useHomeData();

  if (!data) {
    return null;
  }

  return (
    <Layout className="home">
      <Header
        productsDiscountButton={data.data.attributes.products_discount_button}
        isLoading={isLoading}
        products={data.data.attributes.products_discount.data}
      />
      <div className="container">
        <HomeCategory
          isLoading={isLoading}
          productNewLink={data.data.attributes.product_new_link.data.attributes}
          productNewLinkText={data.data.attributes.product_new_link_text}
          title={data.data.attributes.product_new_title}
          products={data.data.attributes.product_new.data}
        />
        <Line />
        <Congratulation congratulation={data.data.attributes.congratulation} />
        <Line />
        <HomeDesc homeDescs={data.data.attributes.home_descs.data} />
        <Line />
        <HomeCards cards={data.data.attributes.cards} />
      </div>
    </Layout>
  );
};

export default Home;
