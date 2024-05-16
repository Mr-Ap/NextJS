import Link from "next/link";
import HeaderLinks from "./Nav-Link";

export default function MainHeader() {
  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/">NextNews</Link>
      </div>
      <nav>
        <ul>
          <li>
            <HeaderLinks href={"/news"}>News</HeaderLinks>
          </li>
          <li>
            <HeaderLinks href={"/archive"}>Archive</HeaderLinks>
          </li>
        </ul>
      </nav>
    </header>
  );
}
