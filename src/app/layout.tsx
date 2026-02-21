import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'AImatic | Professional AI Automation & Security Engineering',
  description:
    'AImatic builds custom, secure business automations. We specialize in n8n workflows, private AI systems, and secure API integrations that you own 100%. Stop renting your business logic.',
  keywords: [
    'AI Automation Agency',
    'Custom AI Development',
    'n8n Workflows',
    'Secure AI Integration',
    'Business Process Automation',
    'Data Sovereignty',
    'Private AI Chatbots',
    'AImatic Automation',
  ],
  authors: [{ name: 'AImatic Team' }],
  openGraph: {
    title: 'AImatic | Custom Business Tools You Own',
    description: 'Privacy-first automation engineering. Secure, self-hosted code that stays within your business walls.',
    url: 'https://aimatic.com',
    siteName: 'AImatic',
    images: [
      {
        url: 'https://picsum.photos/seed/aimatic-og/1200/630',
        width: 1200,
        height: 630,
        alt: 'AImatic Professional Automation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AImatic | Secure AI Automation',
    description: 'Own your automation. Protect your data. Professional engineering for modern businesses.',
    images: ['https://picsum.photos/seed/aimatic-twitter/1200/630'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data for AI/LLM Crawlers (Schema.org)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "AImatic",
    "description": "Privacy-first automation engineering agency building custom, self-hosted business systems.",
    "url": "https://aimatic.com",
    "logo": "https://aimatic.com/logo.png",
    "sameAs": [
      "https://github.com/aimatic",
      "https://linkedin.com/company/aimatic"
    ],
    "serviceType": [
      "AI Workflow Automation",
      "System Integration",
      "Custom Software Development",
      "Security Consulting"
    ]
  };

  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Source+Code+Pro:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn('font-body antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>

        {/* Analytics & Monitoring */}
        <Script id="hotjar-snippet" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:0,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0000000000"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0000000000');
          `}
        </Script>
      </body>
    </html>
  );
}
