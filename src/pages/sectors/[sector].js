import Link from "next/link";
import { fetchFromCMS } from "@/lib/strapi";

export async function getStaticPaths() {
  const sectors = await fetchFromCMS("sectors-alqtaeats");

  const paths = (sectors || [])
    .map((s) => ({
      params: { sector: s.slug || s.attributes?.slug },
    }))
    .filter((p) => p.params.sector);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const sectors = await fetchFromCMS("sectors-alqtaeats", {
    query: {
      "filters[slug][$eq]": params.sector,
    },
  });

  const sectorEntity = (sectors || [])[0];

  if (!sectorEntity) {
    return { notFound: true };
  }

  const sectorId = sectorEntity.id ?? sectorEntity.documentId;
  const sector = {
    id: String(sectorId),
    name: sectorEntity.name || sectorEntity.attributes?.name || params.sector,
    slug: sectorEntity.slug || sectorEntity.attributes?.slug || params.sector,
  };

  const reportsData = await fetchFromCMS("reports-altqaryrs", {
    query: {
      // Strapi v5: use '*' or object syntax instead of comma-separated list
      populate: "*",
      "filters[sectors_alqtaeat][id][$eq]": sectorId,
      sort: "date:desc",
    },
  });

  const reports = (reportsData || []).map((item) => {
    // Use documentId so report links match the /reports/[slug] route
    const routeId = item.documentId ?? item.id;
    const title = item.title ?? item.attributes?.title ?? "";
    const summary = item.summary ?? item.attributes?.summary ?? [];

    return {
      id: String(routeId),
      title,
      description: blocksToPlainText(summary),
    };
  });

  return {
    props: {
      sector,
      reports,
    },
  };
}

export default function SectorPage({ sector, reports = [] }) {
  return (
    <main className="p-6 m-20">
      <h1 className="text-3xl font-bold mb-4">{sector?.name} Sector Reports</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reports.length ? (
          reports.map((report) => {
            const href = `/reports/${report.id}`;

            return (
              <article
                key={report.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <Link href={href} className="block p-6 h-full">
                  <h3 className="text-xl font-semibold mb-2 text-red-700 dark:text-red-400">{report.title}</h3>
                  {report.description ? (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{report.description}</p>
                  ) : null}

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{sector?.name}</span>
                    <span className="inline-block bg-red-700 text-white text-sm px-3 py-1 rounded">Read Report →</span>
                  </div>
                </Link>
              </article>
            );
          })
        ) : (
          <p className="text-gray-600">No reports available.</p>
        )}
      </div>
    </main>
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
