import './globals.css';

const title = 'Zabir Azmayan — Software Engineer · Full Stack · ML';
const description =
  'Immersive WebGL portfolio of Zabir Azmayan. Full-stack web, cross-platform mobile, and machine learning engineering out of Dhaka, Bangladesh.';

export const metadata = {
  metadataBase: new URL('https://zabirazmayan.com'),
  title,
  description,
  keywords: [
    'Zabir Azmayan',
    'software engineer',
    'full stack developer',
    'machine learning',
    'Next.js',
    'Three.js',
    'WebGL',
    'Flutter',
    'Dhaka',
    'BRAC University',
  ],
  authors: [{ name: 'Zabir Azmayan' }],
  creator: 'Zabir Azmayan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title,
    description,
    siteName: 'Zabir Azmayan',
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#04060a',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@300;400;500&display=swap"
        />
      </head>
      <body>
        {/* Crawlers and no-JS visitors get the full text content, not a blank canvas */}
        <noscript>
          <div style={{ padding: '2rem', maxWidth: '46rem', margin: '0 auto' }}>
            <h1>Zabir Azmayan — Software Engineer</h1>
            <p>{description}</p>
            <p>
              Email: zabirazmayn53@gmail.com · Phone: +880 1969 526795 · Dhaka,
              Bangladesh. This site uses WebGL for its 3D experience; enable
              JavaScript to view it.
            </p>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
