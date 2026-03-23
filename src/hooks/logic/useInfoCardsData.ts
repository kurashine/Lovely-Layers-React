import { useState, useEffect } from "react";

export interface InfoCardData {
  id: string;
  icon: string; // Путь к иконке
  title: string; // Заголовок карточки
  value: string; // Значение карточки
  tooltipInfo?: string; // Подсказка, если нужна
}

export const useInfoCardsData = (fil: "WEEKLY" | "MONTHLY" | "YEARLY") => {
  const [infoCardsData, setInfoCardsData] = useState<InfoCardData[]>([]);

  useEffect(() => {
    // Мокаем данные для InfoCards
    const mockData: Record<"WEEKLY" | "MONTHLY" | "YEARLY", InfoCardData[]> = {
      WEEKLY: [
        {
          id: "1",
          icon: "/static/images/Frame 141.png",
          title: "Загальний дохід",
          value: "8.400 грн",
          tooltipInfo: "Дохід за весь період роботи",
        },
        {
          id: "2",
          icon: "/static/images/Frame 141 (1).png",
          title: "Чистий прибуток",
          value: "3.000 грн",
          tooltipInfo: "Прибуток після вирахування витрат",
        },
        {
          id: "3",
          icon: "/static/images/Frame 141 (2).png",
          title: "Кількість проданих товарів",
          value: "4",
          tooltipInfo: "Загальна кількість проданих товарів",
        },
        {
          id: "4",
          icon: "/static/images/Frame 141 (3).png",
          title: "Кількість відвідувачів",
          value: "24",
          tooltipInfo: "Кількість унікальних відвідувачів за місяць",
        },
        {
          id: "5",
          icon: "/static/images/Frame 141 (4).png",
          title: "Валовий прибуток",
          value: "4.400 грн",
          tooltipInfo: "Валовий прибуток до вирахування витрат",
        },
        {
          id: "6",
          icon: "/static/images/Frame 141 (5).png",
          title: "Коефіцієнт ROI",
          value: "214%",
          tooltipInfo: "Рентабельність інвестицій (ROI)",
        },
        {
          id: "7",
          icon: "/static/images/Frame 141 (6).png",
          title: "Сума збитків",
          value: "5.400 грн",
          tooltipInfo: "Загальна сума витрат за період",
        },
        {
          id: "8",
          icon: "/static/images/Frame 141 (7).png",
          title: "Середній час на сайті",
          value: "3хв 45с",
          tooltipInfo: "Середній час, проведений користувачем на сайті",
        },
      ],
      MONTHLY: [
        {
          id: "1",
          icon: "/static/images/Frame 141.png",
          title: "Загальний дохід",
          value: "34.300 грн",
          tooltipInfo: "Дохід за весь період роботи",
        },
        {
          id: "2",
          icon: "/static/images/Frame 141 (1).png",
          title: "Чистий прибуток",
          value: "9.900 грн",
          tooltipInfo: "Прибуток після вирахування витрат",
        },
        {
          id: "3",
          icon: "/static/images/Frame 141 (2).png",
          title: "Кількість проданих товарів",
          value: "19",
          tooltipInfo: "Загальна кількість проданих товарів",
        },
        {
          id: "4",
          icon: "/static/images/Frame 141 (3).png",
          title: "Кількість відвідувачів",
          value: "548",
          tooltipInfo: "Кількість унікальних відвідувачів за місяць",
        },
        {
          id: "5",
          icon: "/static/images/Frame 141 (4).png",
          title: "Валовий прибуток",
          value: "15.300 грн",
          tooltipInfo: "Валовий прибуток до вирахування витрат",
        },
        {
          id: "6",
          icon: "/static/images/Frame 141 (5).png",
          title: "Коефіцієнт ROI",
          value: "198%",
          tooltipInfo: "Рентабельність інвестицій (ROI)",
        },
        {
          id: "7",
          icon: "/static/images/Frame 141 (6).png",
          title: "Сума збитків",
          value: "24.400 грн",
          tooltipInfo: "Загальна сума витрат за період",
        },
        {
          id: "8",
          icon: "/static/images/Frame 141 (7).png",
          title: "Середній час на сайті",
          value: "1хв 58с",
          tooltipInfo: "Середній час, проведений користувачем на сайті",
        },
      ],
      YEARLY: [
        {
          id: "1",
          icon: "/static/images/Frame 141.png",
          title: "Загальний дохід",
          value: "128.800 грн",
          tooltipInfo: "Дохід за весь період роботи",
        },
        {
          id: "2",
          icon: "/static/images/Frame 141 (1).png",
          title: "Чистий прибуток",
          value: "69.900 грн",
          tooltipInfo: "Прибуток після вирахування витрат",
        },
        {
          id: "3",
          icon: "/static/images/Frame 141 (2).png",
          title: "Кількість проданих товарів",
          value: "33",
          tooltipInfo: "Загальна кількість проданих товарів",
        },
        {
          id: "4",
          icon: "/static/images/Frame 141 (3).png",
          title: "Кількість відвідувачів",
          value: "981",
          tooltipInfo: "Кількість унікальних відвідувачів за місяць",
        },
        {
          id: "5",
          icon: "/static/images/Frame 141 (4).png",
          title: "Валовий прибуток",
          value: "80.300 грн",
          tooltipInfo: "Валовий прибуток до вирахування витрат",
        },
        {
          id: "6",
          icon: "/static/images/Frame 141 (5).png",
          title: "Коефіцієнт ROI",
          value: "165%",
          tooltipInfo: "Рентабельність інвестицій (ROI)",
        },
        {
          id: "7",
          icon: "/static/images/Frame 141 (6).png",
          title: "Сума збитків",
          value: "34.700 грн",
          tooltipInfo: "Загальна сума витрат за період",
        },
        {
          id: "8",
          icon: "/static/images/Frame 141 (7).png",
          title: "Середній час на сайті",
          value: "1хв 24с",
          tooltipInfo: "Середній час, проведений користувачем на сайті",
        },
      ],
    };

    // Устанавливаем данные в состояние
    setInfoCardsData(mockData[fil]);
  }, [fil]);

  return infoCardsData;
};
