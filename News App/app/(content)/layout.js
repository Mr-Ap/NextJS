import MainHeader from "@/components/Main-Header";
import "@/app/globals.css";

export const metadata = {
  title: "News section",
  description: "Explore and read news",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="page">
          <MainHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
