import React from "react";
import Link from "next/link";

export default function ReportList({ reports }) {
  return (
    <section className="py-12 px-6 md:px-20 bg-white dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Reports </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {report.summary}
            </p>
            <Link href={`/reports/${report.slug}`}>
              <span className="text-blue-600 dark:text-blue-400 text-sm hover:underline cursor-pointer">
                See more
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
