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

  // 1. Ждем, пока данные загрузятся. 
  // Если данных нет (null/undefined) или идет загрузка — показываем индикатор
  if (isLoading || !data || !data.data) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Загрузка...</div>;
  }

  // Для удобства создаем короткую переменную для атрибутов
  const attr = data.data.attributes;

  // 2. Если атрибутов нет (ошибка прав в Strapi), не падаем
  if (!attr) {
    return <div>Данные не найдены в Strapi. Проверьте публикацию и права Public.</div>;
  }

  return (
    <Layout className="home">
      <Header
        productsDiscountButton={attr.products_discount_button}
        isLoading={isLoading}
        products={attr.products_discount?.data || []}
      />
      <div className="container">
        <HomeCategory
          isLoading={isLoading}
          // Используем опциональную цепочку ?. на случай, если ссылки нет
          productNewLink={attr.product_new_link?.data?.attributes}
          productNewLinkText={attr.product_new_link_text}
          title={attr.product_new_title}
          products={attr.product_new?.data || []}
        />
        <Line />
        <Congratulation congratulation={attr.congratulation} />
        <Line />
        <HomeDesc homeDescs={attr.home_descs?.data || []} />
        <Line />
        <HomeCards cards={attr.cards || []} />
      </div>
    </Layout>
  );
};

export default Home;
