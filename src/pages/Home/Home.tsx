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
  // Добавь 'error' в деструктуризацию, чтобы видеть проблемы с CORS или сетью
  const { data, isLoading, error } = useHomeData();

  // 1. Если произошла ошибка запроса
  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
        <h3>Ошибка загрузки данных</h3>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Обновить страницу</button>
      </div>
    );
  }

  // 2. Ждем, пока данные загрузятся. 
  // Проверяем наличие data.data (структура Strapi 4)
  if (isLoading || !data || !data.data) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>Загрузка контента...</p>
        {/* Если загрузка висит слишком долго, покажем, что пришло */}
        {!isLoading && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    );
  }

  // Короткая переменная для атрибутов
  const attr = data.data.attributes;

  // 3. Если атрибутов нет
  if (!attr) {
    return <div style={{ textAlign: 'center' }}>Данные не найдены. Проверьте статус "Published" в Strapi.</div>;
  }

  return (
    <Layout className="home">
      <Header
        productsDiscountButton={attr.products_discount_button}
        isLoading={isLoading}
        // Защита от undefined через || []
        products={attr.products_discount?.data || []}
      />
      <div className="container">
        <HomeCategory
          isLoading={isLoading}
          // Берем атрибуты ссылки, если они есть
          productNewLink={attr.product_new_link?.data?.attributes}
          productNewLinkText={attr.product_new_link_text}
          title={attr.product_new_title}
          products={attr.product_new?.data || []}
        />
        <Line />
        
        {/* Рендерим блоки только если в них есть данные */}
        {attr.congratulation && (
          <>
            <Congratulation congratulation={attr.congratulation} />
            <Line />
          </>
        )}

        <HomeDesc homeDescs={attr.home_descs?.data || []} />
        <Line />
        
        <HomeCards cards={attr.cards || []} />
      </div>
    </Layout>
  );
};

export default Home;