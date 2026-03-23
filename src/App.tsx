import { router } from "./routes/public";
import { RouterProvider } from "react-router-dom";

import { SWRConfig } from "swr";
import SwrConfigs from "./constants/SwrConfigs";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const App = () => {
  return (
    <SWRConfig value={SwrConfigs}>
      <RouterProvider router={router} />
    </SWRConfig>
  );
};

export default App;
