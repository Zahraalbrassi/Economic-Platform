import Head from 'next/head';
import HeroCarousel from '@/components/HeroCarousel';
import React from 'react';
import AboutPlatform from '@/components/AboutPlatform';
import { sectorReports } from '@/data/reports';
import Link from 'next/link';
import { FaSchool, FaHeartbeat, FaCar, FaBalanceScale } from 'react-icons/fa';
import SectorsSection from '@/components/SectorsSection';
import LatestReportsSection from '@/components/LatestReportsSection';
import ContactUs from '@/components/ContactUs';
import { useLanguage } from '@/components/LanguageProvider';

const sectorIcons = {
  education: <FaSchool className="text-xl text-blue-800" />,
  health: <FaHeartbeat className="text-xl text-green-800" />,
  transport: <FaCar className="text-xl text-yellow-800" />,
 
};


export default function Index() {
  const { language } = useLanguage();

  const t = (en, ar) => (language === 'en' ? en : ar);

  const allReports = Object.entries(sectorReports).flatMap(([sector, reports]) =>
    reports.map(report => ({ ...report, sector }))
  );
  const latestReports = allReports.slice(0, 2);

  return (
    <>
      <Head>
        <title>{t('Home | Economic Platform', 'الرئيسية | المنصة الاقتصادية')}</title>
        <meta
          name="description"
          content={t(
            "Explore reports, data, and projects across Libya’s economic sectors.",
            "استكشف التقارير والبيانات والمشاريع عبر القطاعات الاقتصادية في ليبيا."
          )}
        />
      </Head>

      <div>
        <section className="py-20">
          <HeroCarousel />
        </section>

        {/* Example: pass language down if needed */}
        <AboutPlatform />

        {/* Explore Sectors heading could also use t() inside SectorsSection */}
        <SectorsSection />

        <LatestReportsSection />
        <ContactUs />
      </div>
    </>
  );
}