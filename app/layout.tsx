import "./globals.css";

export const metadata = {
  title: "K.H.S",
  description: "Kigali Harvest School",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}