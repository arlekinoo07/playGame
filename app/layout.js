import "./globals.css";

export const metadata = {
  title: "Spy",
  description: "Browser prototype of the Spy party game.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
