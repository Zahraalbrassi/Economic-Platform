import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { fetchFromCMS } from '@/lib/strapi';
import { useLanguage } from '@/components/LanguageProvider';

export async function getStaticProps() {
  const data = await fetchFromCMS('reports-altqaryrs', {
    query: {
      populate: '*',
      sort: 'date:desc',
      locale: 'en',
    },
  });

  const reports = mapReports(data);

  return {
    props: {
      reports,
    },
  };
}

export default function ReportsListPage({ reports: initialReports }) {
  const { language } = useLanguage();
  const [reports, setReports] = useState(initialReports || []);

  useEffect(() => {
    async function loadReportsForLanguage() {
      if (language === 'en') {
        setReports(initialReports || []);
        return;
      }

      try {
        const data = await fetchFromCMS('reports-altqaryrs', {
          query: {
            populate: '*',
            sort: 'date:desc',
            locale: language,
          },
        });
        setReports(mapReports(data));
      } catch (err) {
        console.error('Failed to load reports for language', language, err);
      }
    }

    loadReportsForLanguage();
  }, [language, initialReports]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 dark:text-white">
      <Head>
        <title>All Reports</title>
      </Head>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
          Reports
        </h1>

        <div className="grid grid-cols-1 gap-8">
          {reports.length === 0 ? (
            <p className="text-center text-gray-500">No reports available.</p>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 mt-20"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                  {report.title}
                </h2>

                {report.sector && (
                  <span className="inline-block text-xs font-medium px-3 py-1 mb-3 capitalize text-red-600 dark:text-red-400 mt-20">
                    {report.sector}
                  </span>
                )}

                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4">
                  {report.description.slice(0, 160)}...
                </p>

                <div className="mt-4">
                  <Link
                    href={`/reports/${report.id}`}
                    className="text-red-600 dark:text-red-400 hover:underline font-medium text-sm"
                  >
                    View Full Report →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function mapReports(data) {
  return (data || []).map((item) => {
    // Use documentId so all locales of the same report share one route id
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
