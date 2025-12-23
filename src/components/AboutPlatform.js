import React from "react";
import { useLanguage } from "./LanguageProvider";

export default function AboutPlatform() {
  const { language } = useLanguage();
  const t = (en, ar) => (language === "en" ? en : ar);

  return (
    <section id="about" className=" py-16 px-6 md:px-20 dark:text-white ">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6  ">
          {t("About the Platform", "حول المنصة")}
        </h2>
        <p className="dark:text-white text-lg mb-10 ">
          {t(
            "The Economic Platform is a centralized digital hub that provides data, insights, and reports on key economic sectors in Libya. Designed to support decision-makers, researchers, and development organizations, it empowers users with accessible and reliable information.",
            "المنصة الاقتصادية هي مركز رقمي موحد يوفر البيانات والرؤى والتقارير حول القطاعات الاقتصادية الرئيسية في ليبيا، لدعم صناع القرار والباحثين وجهات التنمية بمعلومات موثوقة وسهلة الوصول."
          )}
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-md transition hover:scale-105 hover:z-10 hover:shadow-x ">
            <h3 className="font-semibold text-lg mb-2 dark:text-white hover:text-red-700">
              {t("Economic Data", "البيانات الاقتصادية")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t(
                "Explore sector-specific data and statistics in one place.",
                "استكشف بيانات وإحصاءات القطاعات المختلفة في مكان واحد."
              )}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-md transition hover:scale-105 hover:z-10 hover:shadow-x">
            <h3 className="font-semibold text-lg mb-2 dark:text-white hover:text-red-700">
              {t("Reports", "التقارير")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t(
                "Access downloadable reports and research publications.",
                "الوصول إلى التقارير والمنشورات البحثية القابلة للتحميل."
              )}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-md transition hover:scale-105 hover:z-10 hover:shadow-x">
            <h3 className="font-semibold text-lg mb-2 dark:text-white hover:text-red-700">
              {t("Initiatives", "المبادرات")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t(
                "Discover economic development projects and initiatives.",
                "اكتشف مشاريع ومبادرات التنمية الاقتصادية."
              )}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-md transition hover:scale-105 hover:z-10 hover:shadow-x">
            <h3 className="font-semibold text-lg mb-2 dark:text-white hover:text-red-700">
              {t("Easy Navigation", "سهولة التصفح")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t(
                "Clean interface for both public users and professionals.",
                "واجهة بسيطة وواضحة للمستخدمين والجمهور والمتخصصين."
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
