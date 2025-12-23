import Head from 'next/head';
import Link from 'next/link';
import { fetchFromCMS } from '@/lib/strapi';
import { useLanguage } from '@/components/LanguageProvider';
import { useEffect, useState } from 'react';

export async function getStaticPaths() {
  const data = await fetchFromCMS('reports-altqaryrs');

  const paths = (data || []).map((item) => ({
    // Use documentId so this path works for all locales of the same report
    params: { slug: String(item.documentId ?? item.id) },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await fetchFromCMS('reports-altqaryrs', {
    query: {
      populate: '*',
      // Filter by documentId so we get the right locale variant of the same report
      "filters[documentId][$eq]": params.slug,
      locale: 'en',
    },
  });

  const item = (data || [])[0];

  if (!item) {
    return { notFound: true };
  }

  const report = mapReport(item);

  return {
    props: {
      report,
    },
  };
}

export default function ReportPage({ report: initialReport }) {
  const { language } = useLanguage();
  const [report, setReport] = useState(initialReport);

  useEffect(() => {
    async function loadReportForLanguage() {
      if (language === 'en') {
        setReport(initialReport);
        return;
      }

      try {
        const data = await fetchFromCMS('reports-altqaryrs', {
          query: {
            populate: '*',
            // initialReport.id is the documentId-based route id
            "filters[documentId][$eq]": initialReport.id,
            locale: language,
          },
        });

        const item = (data || [])[0];
        if (item) {
          setReport(mapReport(item));
        }
      } catch (err) {
        console.error('Failed to load report for language', language, err);
      }
    }

    loadReportForLanguage();
  }, [language, initialReport]);

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 dark:text-white dark:bg-gray-900 min-h-screen mt-100 pt-20">
      <Head>
        <title>{report.title}</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6 text-red-600 dark:text-red-400">
        {report.title}
      </h1>

      {report.sector && (
        <Link
          href={report.sectorSlug ? `/sectors/${report.sectorSlug}` : '/sectors'}
          className="inline-block text-xs font-medium px-3 py-1 mb-3 capitalize text-red-600 dark:text-red-400 hover:underline"
        >
          {report.sector}
        </Link>
      )}

      {Array.isArray(report.blocks) && report.blocks.length > 0 && (
        <div className="mb-6 text-gray-700 dark:text-gray-300 space-y-3">
          {renderBlocks(report.blocks)}
        </div>
      )}

      {report.files.length > 0 && (
        <div className="mt-6 space-y-2">
          {report.files.map((file) => {
            const url = file.url || file?.attributes?.url;
            const name = file.name || file?.attributes?.name || 'Download file';

            if (!url) return null;

            const fullUrl = url.startsWith('http')
              ? url
              : `${process.env.NEXT_PUBLIC_CMS_URL}${url}`;

            return (
              <a
                key={file.id || url}
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-red-600 dark:text-red-400 hover:underline"
              >
                {name}
              </a>
            );
          })}
        </div>
      )}

      <button
        onClick={() => history.back()}
        className="mt-10 inline-block bg-red-800 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        ← Back to Reports
      </button>
    </section>
  );
}

function mapReport(item) {
  // Use documentId so all locales map to the same route id
  const routeId = item.documentId ?? item.id;
  const title = item.title ?? item.attributes?.title ?? '';
  const summary = item.summary ?? item.attributes?.summary ?? [];
  const sectorRel = item.sectors_alqtaeat ?? item.attributes?.sectors_alqtaeat;
  const sectorName = sectorRel?.name ?? sectorRel?.attributes?.name ?? null;
  const sectorSlug = sectorRel?.slug ?? sectorRel?.attributes?.slug ?? null;
  const files = item.file ?? item.attributes?.file ?? [];

  return {
    id: String(routeId),
    title,
    // keep raw blocks for rich rendering
    blocks: Array.isArray(summary) ? summary : [],
    // plain-text version if needed elsewhere
    description: blocksToPlainText(summary),
    sector: sectorName,
    sectorSlug: sectorSlug || (sectorName ? sectorName.toLowerCase().replace(/\s+/g, '-') : null),
    files: Array.isArray(files) ? files : [],
  };
}

function textFromBlock(block) {
  if (!block) return '';
  if (Array.isArray(block.children)) {
    return block.children.map((child) => child.text || '').join(' ');
  }
  return block.text || '';
}

function blocksToPlainText(blocks) {
  if (!Array.isArray(blocks)) return '';

  return blocks.map((block) => textFromBlock(block)).join(' ').trim();
}

function renderBlocks(blocks) {
  if (!Array.isArray(blocks)) return null;

  return blocks.map((block, index) => {
    const type = block.type || 'paragraph';

    // Headings
    if (type === 'heading') {
      const level = Math.min(Math.max(block.level || 2, 2), 4);
      const HeadingTag = `h${level}`;
      return (
        <HeadingTag
          key={index}
          className="font-semibold text-lg md:text-xl text-gray-900 dark:text-white mt-4 mb-2"
        >
          {textFromBlock(block)}
        </HeadingTag>
      );
    }

    // Lists
    if (type === 'list') {
      const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
      const items = Array.isArray(block.children) ? block.children : [];
      return (
        <ListTag
          key={index}
          className="list-disc list-inside space-y-1 pl-4 text-gray-700 dark:text-gray-300"
        >
          {items.map((item, liIndex) => (
            <li key={liIndex}>{textFromBlock(item)}</li>
          ))}
        </ListTag>
      );
    }

    // Default: paragraph
    return (
      <p key={index} className="text-gray-700 dark:text-gray-300">
        {textFromBlock(block)}
      </p>
    );
  });
}
