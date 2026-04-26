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
        <head>
        <meta
          name="google-site-verification"
          content="I-Z3eWK8Rsnkn2TJ3LgoMZHqUIUVuLXtk4RmvfRsknM"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}