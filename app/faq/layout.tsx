import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Buzzbee',
  description: 'Answers to common questions about Buzzbee mattresses — delivery, materials, warranty, returns, and more.',
  keywords: ['mattress FAQ', 'Buzzbee questions', 'mattress warranty', 'mattress delivery', 'American made mattress'],
  alternates: { canonical: '/faq' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How long will it take to receive my mattress?', acceptedAnswer: { '@type': 'Answer', text: 'Every Buzzbee mattress is made to order. Typical delivery time is 5–7 business days.' } },
    { '@type': 'Question', name: 'Where are Buzzbee mattresses made?', acceptedAnswer: { '@type': 'Answer', text: 'All Buzzbee mattresses are 100% USA-made. Our mattresses are crafted in Chicago and manufactured in Wisconsin.' } },
    { '@type': 'Question', name: 'Do you offer expedited shipping?', acceptedAnswer: { '@type': 'Answer', text: 'Expedited shipping is already included with every order — at no additional charge to our customers.' } },
    { '@type': 'Question', name: 'How long will the mattress last?', acceptedAnswer: { '@type': 'Answer', text: 'Buzzbee mattresses are built to last well past their 10-year warranty.' } },
    { '@type': 'Question', name: 'Can I return the mattress?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! All Buzzbee mattresses carry a full 100-night trial with risk-free returns.' } },
    { '@type': 'Question', name: 'Does my mattress come with a warranty?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, our mattresses come with a 10-year warranty.' } },
    { '@type': 'Question', name: 'Do I need to flip my mattress?', acceptedAnswer: { '@type': 'Answer', text: 'You will not need to flip your Buzzbee mattress, but we recommend that you rotate it head-to-foot every 6 months.' } },
    { '@type': 'Question', name: 'Do you ship internationally?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we ship to Canada and Mexico for an additional fee!' } },
  ],
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
