import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaSchool, FaHeartbeat, FaCar, FaBalanceScale } from 'react-icons/fa';
import { useLanguage } from './LanguageProvider';
import { fetchFromCMS } from '@/lib/strapi';

const sectorIcons = {
  education: <FaSchool className="text-xl text-blue-800 dark:text-blue-400" />,
  health: <FaHeartbeat className="text-xl text-green-800 dark:text-green-400" />,
  transport: <FaCar className="text-xl text-yellow-800 dark:text-yellow-400" />,
  justice: <FaBalanceScale className="text-xl text-purple-800 dark:text-purple-400" />,
};

function getSectorIcon(slug, name) {
  const key = (slug || name || '').toLowerCase();
  if (key.includes('education') || key.includes('تعليم')) return sectorIcons.education;
  if (key.includes('health') || key.includes('صحة')) return sectorIcons.health;
  if (key.includes('transport') || key.includes('نقل')) return sectorIcons.transport;
  return sectorIcons.justice;
}

export default function SectorsSection() {
  const { language } = useLanguage();
  const t = (en, ar) => (language === 'en' ? en : ar);
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    async function loadSectors() {
      try {
        const data = await fetchFromCMS('sectors-alqtaeats', {
          query: { locale: language },
        });

        const mapped = (data || [])
          .map((s) => ({
            id: s.id ?? s.documentId,
            name: s.name ?? s.attributes?.name ?? '',
            slug: s.slug ?? s.attributes?.slug ?? '',
          }))
          .filter((s) => s.slug && s.name);

        setSectors(mapped);
      } catch (err) {
        console.error('Failed to load sectors from CMS', err);
      }
    }

    loadSectors();
  }, [language]);

  if (!sectors.length) return null;

  return (
    <section id="SectorsSection" className="max-w-7xl mx-auto px-4 mb-12">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">
        {t('Explore Sectors', 'استكشف القطاعات')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sectors.map((sector) => (
          <Link key={sector.id} href={`/sectors/${sector.slug}`} passHref>
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 flex items-center gap-4 hover:shadow-md transition cursor-pointer">
              <div>{getSectorIcon(sector.slug, sector.name)}</div>
              <div>
                <h3 className="text-lg font-semibold capitalize dark:text-white">
                  {sector.name}
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
