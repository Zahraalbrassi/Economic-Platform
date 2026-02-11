import Head from 'next/head';
import HeroCarousel from '@/components/HeroCarousel';
import React from 'react';
import AboutPlatform from '@/components/AboutPlatform';
import SectorsSection from '@/components/SectorsSection';
import LatestReportsSection from '@/components/LatestReportsSection';
import ContactUs from '@/components/ContactUs';
import { useLanguage } from '@/components/LanguageProvider';
import { makeT } from '@/lib/i18n';

export default function Index() {
  const { language } = useLanguage();
  const t = makeT(language);

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