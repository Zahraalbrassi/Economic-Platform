import Link from 'next/link';
import { sectorReports } from '@/data/reports';
import { FaSchool, FaHeartbeat, FaCar, FaBalanceScale } from 'react-icons/fa';
import { useLanguage } from './LanguageProvider';

const sectorIcons = {
  education: <FaSchool className="text-xl text-blue-800 dark:text-blue-400" />,
  health: <FaHeartbeat className="text-xl text-green-800 dark:text-green-400" />,
  transport: <FaCar className="text-xl text-yellow-800 dark:text-yellow-400" />,
  justice: <FaBalanceScale className="text-xl text-purple-800 dark:text-purple-400" />,
};

const sectorLabels = {
  education: { en: 'Education', ar: 'التعليم' },
  health: { en: 'Health', ar: 'الصحة' },
  transport: { en: 'Transport', ar: 'النقل' },
  justice: { en: 'Justice', ar: 'العدالة' },
};

export default function SectorsSection() {
  const { language } = useLanguage();
  const t = (en, ar) => (language === 'en' ? en : ar);

  return (
    <section id="SectorsSection" className="max-w-7xl mx-auto px-4 mb-12">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">
        {t('Explore Sectors', 'استكشف القطاعات')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.keys(sectorReports).map((sector) => (
          <Link key={sector} href={`/sectors/${sector}`} passHref>
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 flex items-center gap-4 hover:shadow-md transition cursor-pointer">
              <div>{sectorIcons[sector]}</div>
              <div>
                <h3 className="text-lg font-semibold capitalize dark:text-white">
                  {language === 'en'
                    ? sectorLabels[sector]?.en || sector
                    : sectorLabels[sector]?.ar || sector}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('View sector insights', 'عرض بيانات القطاع')}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
