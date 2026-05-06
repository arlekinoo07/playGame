import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Spy",
  description: "Browser prototype of the Spy party game.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
