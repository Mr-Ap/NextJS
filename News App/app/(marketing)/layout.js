import "@/app/globals.css";

export const metadata = {
  title: "News App in NextJs",
  description: "Next.js Page Routing & Rendering",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
