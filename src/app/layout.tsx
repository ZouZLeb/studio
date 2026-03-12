import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { ChatWidget } from '../components/chat';
import { WelcomePopup } from '../components/landing/welcome-popup';

export const metadata: Metadata = {
  title: 'AImatic | AI Automation Agency San Diego | Secure Engineering',
  description:
    'AImatic is a San Diego based n8n automation agency. We build private AI chatbots for small business, automate lead generation, and engineer secure email follow-ups you own 100%.',
  keywords: [
    'AI automation agency San Diego',
    'n8n automation agency',
    'AI chatbot for small business',
    'how to automate email follow-ups',
    'automate lead generation with AI',
    'how to save time in my business with automation',
    'Secure AI Integration',
    'Data Sovereignty',
    'Self-hosted AI Agents',
  ],
  authors: [{ name: 'AImatic Team', url: 'https://aimatic.dev' }],
  creator: 'AImatic Dev Solutions',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'AImatic | Private AI Automation & Custom Engineering',
    description: 'Own your automation. San Diego based agency specializing in secure, self-hosted AI for business growth.',
    url: 'https://aimatic.dev',
    siteName: 'AImatic Dev Solutions',
    images: [
      {
        url: 'https://aimatic.dev/aimatic_logo.png',
        width: 1200,
        height: 630,
        alt: 'AImatic Professional AI Automation San Diego',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AImatic | Secure AI Automation San Diego',
    description: 'Professional engineering for modern businesses. Automate lead generation and follow-ups securely.',
    images: ['https://aimatic.dev/aimatic_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://aimatic.dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://aimatic.dev/#organization',
        name: 'AImatic Dev Solutions',
        url: 'https://aimatic.dev',
        logo: 'https://aimatic.dev/aimatic_logo.png',
        description: 'A developer-backed AI automation agency in San Diego focusing on security, n8n workflows, and custom engineering for small businesses.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'San Diego',
          addressRegion: 'CA',
          addressCountry: 'US'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: 'hello@aimatic.dev'
        },
        priceRange: '$$',
        knowsAbout: [
          'AI Automation',
          'n8n Workflows',
          'Email Follow-up Automation',
          'Lead Generation AI',
          'Secure API Integration',
          'Private AI Chatbots'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://aimatic.dev/#website',
        url: 'https://aimatic.dev',
        name: 'AImatic Dev Solutions',
        publisher: { '@id': 'https://aimatic.dev/#organization' }
      }
    ],
  };

  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Source+Code+Pro:wght@400;600&family=Merriweather:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn('font-body antialiased overflow-x-hidden')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <WelcomePopup />
          <ChatWidget />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
