import type { Metadata } from 'next';
import { faqs } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'FAQ | Busby',
  description: 'Answers to common questions about Busby mattresses — delivery, materials, warranty, returns, and more.',
  keywords: ['mattress FAQ', 'Busby questions', 'mattress warranty', 'mattress delivery', 'American made mattress'],
  alternates: { canonical: '/faq' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
