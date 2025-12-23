import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchFromCMS } from '@/lib/strapi';
import { useLanguage } from './LanguageProvider';

export default function LatestReportsSection() {
  const { language } = useLanguage();
  const t = (en, ar) => (language === 'en' ? en : ar);
  const [latestReports, setLatestReports] = useState([]);

  useEffect(() => {
    async function loadLatestReports() {
      try {
        const data = await fetchFromCMS('reports-altqaryrs', {
          query: {
            populate: '*',
            sort: 'date:desc',
            locale: language,
          },
        });

        const mapped = (data || []).map((item) => {
          const routeId = item.documentId ?? item.id;
          const title = item.title ?? item.attributes?.title ?? '';
          const summary = item.summary ?? item.attributes?.summary ?? [];
          const sectorRel = item.sectors_alqtaeat ?? item.attributes?.sectors_alqtaeat;
          const sectorName = sectorRel?.name ?? sectorRel?.attributes?.name ?? null;

          return {
            id: String(routeId),
            title,
            description: blocksToPlainText(summary),
            sector: sectorName,
          };
        });

        setLatestReports(mapped.slice(0, 2));
      } catch (err) {
        console.error('Failed to load latest reports from CMS', err);
      }
    }

    loadLatestReports();
  }, [language]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-4 mb-12">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">
        {t('Latest Reports', 'أحدث التقارير')}
      </h2>

      <div className="grid gap-6 mb-6">
        {latestReports.map((report) => (
          <Link key={report.id} href={`/reports/${report.id}`}>
            <div className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition cursor-pointer bg-white dark:bg-gray-800">
              <h3 className="text-lg font-bold mb-2 dark:text-white">{report.title}</h3>
              {report.sector && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 capitalize">
                  {t('Sector', 'القطاع')}: {report.sector}
                </p>
              )}
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                {report.description.slice(0, 150)}...
              </p>
            </div>
          </Link>
        ))}
      </div>

    
      <div className="text-center">
        <Link href="/reports">
          <button className="bg-red-800 text-white px-6 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-700 ">
            {t('See More Reports', 'عرض المزيد من التقارير')}
          </button>
        </Link>
      </div>
    </section>
  );
}

function blocksToPlainText(blocks) {
  if (!Array.isArray(blocks)) return '';

  return blocks
    .map((block) => {
      if (Array.isArray(block.children)) {
        return block.children.map((child) => child.text || '').join(' ');
      }
      return block.text || '';
    })
    .join(' ')
    .trim();
}
