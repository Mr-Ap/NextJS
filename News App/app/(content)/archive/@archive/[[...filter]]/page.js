import Link from "next/link";

import {
  getNewsForYear,
  getAvailableNewsYears,
  getAvailableNewsMonths,
  getNewsForYearAndMonth,
} from "@/lib/news";
import NewsList from "@/components/News-List";
import { Suspense } from "react";

async function FilteredHeader({ year, month }) {
  const availableNewsYears = await getAvailableNewsYears();
  const availableNewsMonths = getAvailableNewsMonths(year);
  let links = availableNewsYears;
  if (year && !month) {
    links = getAvailableNewsMonths(year);
  } else if (year && month) {
    links = [];
  }

  if (
    (year && !availableNewsYears.includes(year)) ||
    (month && !availableNewsMonths.includes(month))
  ) {
    throw new Error(`Invalid Date Selected : ${year}:${month}`);
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({ year, month }) {
  let news = [];
  if (year && !month) news = await getNewsForYear(year);
  else if (year && month) news = await getNewsForYearAndMonth(year, month);

  let _newsContent = <p>No News found for selected period...!</p>;
  if (news && news.length > 0) _newsContent = <NewsList newsList={news} />;
  return _newsContent;
}

export default async function FilteredNewsPage({ params }) {
  const selectedYear = params.filter?.[0];
  const selectedMonth = params.filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading news!</p>}>
        <FilteredHeader year={selectedYear} month={selectedMonth} />
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}
