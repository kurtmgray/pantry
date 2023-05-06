import Navbar from "./components/Navbar";
import { AppSessionProvider, AppContextProvider } from "./providers";

export const metadata = {
  title: "Pantry",
  description: "Where your food dreams become nightmares.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <AppSessionProvider>
            <Navbar />
            {children}
          </AppSessionProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
