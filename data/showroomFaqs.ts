// Shared between the LocationFAQ component (rendered accordion) and the
// location pages' FAQPage JSON-LD, so the schema always matches the visible copy.
export interface ShowroomFaq {
  q: string;
  a: string;
}

export const showroomFaqs: ShowroomFaq[] = [
  {
    q: 'What are the showroom hours?',
    a: 'The showroom is staffed Monday through Thursday, 10 AM–2 PM. Outside those hours, visits are by appointment — pick a time between 9 AM and 7 PM any day of the week and a Sleep Guide will meet you at the door.',
  },
  {
    q: 'How do I get help if I have questions?',
    a: 'Two ways. During staffed hours (Mon–Thu, 10 AM–2 PM) walk in and someone will be there. Any other time, book a Sleep Consultation and one of our Sleep Guides will meet you in store at your scheduled time.',
  },
  {
    q: 'How do I actually buy a mattress at the showroom?',
    a: 'You can order from the kiosk, from your phone in store, or from home after you visit — same prices, same 100-night home trial, same warranty. Nothing is sold off the showroom floor; every Busby is built to order in our USA factory.',
  },
  {
    q: 'Are prices the same as online?',
    a: 'Yes, exactly the same. No "in-store only" deals, no upcharges. The showroom is a place to try, not a place we mark up.',
  },
  {
    q: 'Is it safe? What stops people from messing with the mattresses?',
    a: 'The space is monitored by camera, climate-controlled, and audited daily. We trust people to be respectful — and so far, they have been.',
  },
  {
    q: 'Can I bring my kids?',
    a: 'Please do. The showroom is yours while you’re there.',
  },
  {
    q: 'What if I want to return a mattress I bought online?',
    a: 'You can start a return through support@mybusby.com. The 100-night home trial works the same whether you bought online or after a showroom visit.',
  },
];
