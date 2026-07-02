export interface FAQ {
  question: string;
  answer: string;
  link?: { text: string; href: string };
}

export const faqs: FAQ[] = [
  {
    question: "How long will it take to receive my mattress?",
    answer:
      "Every Busby mattress is made to order. Typical delivery time is 5–7 business days.",
  },
  {
    question: "Where are Busby mattresses made?",
    answer:
      "All Busby mattresses are 100% USA-made. Our mattresses are crafted in Chicago and manufactured in Wisconsin.",
  },
  {
    question: "Do you offer expedited shipping?",
    answer:
      "Expedited shipping is already included with every order — at no additional charge to our customers.",
  },
  {
    question: "How is a foam core different than a coil mattress?",
    answer:
      "Our foam core offers a tri-support system which works inline with all curves of the human body, providing consistent pressure relief and support that coil mattresses can't match.",
  },
  {
    question: "How long will the mattress last?",
    answer:
      "Busby mattresses are built to last well past their 10-year warranty.",
  },
  {
    question: "Can I return the mattress?",
    answer:
      "Yes! All Busby mattresses carry a full 100-night trial with risk-free returns.",
  },
  {
    question: "Do I need to flip my mattress?",
    answer:
      "You will not need to flip your Busby mattress, but we recommend that you rotate it head-to-foot every 6 months.",
  },
  {
    question: "What type of bed frame do I need for my mattress?",
    answer:
      "You can use a standard bed frame, existing box spring, platform, slat bed, or the good ol' floor.",
  },
  {
    question: "How should I decide on a size?",
    answer:
      "Size is a personal choice, but we recommend a Queen if you're not sleeping alone.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to Canada and Mexico for an additional fee!",
  },
  {
    question: "How do I unbox the mattress?",
    answer:
      "Opening your Busby mattress is easy — just unwrap the tape, pull out the mattress, and use the provided opener to cut it free.",
  },
  {
    question: "What do I do with my old mattress?",
    answer:
      "We recommend you contact a local charity for donation or recycling.",
  },
  {
    question: "Does my mattress come with a warranty?",
    answer:
      "Yes, our mattresses come with a 10-year warranty. Please refer to our warranty page for more details.",
    link: { text: "View warranty details", href: "/warranty" },
  },
  {
    question: "What certifications should I look for when buying a mattress?",
    answer:
      "All mattresses sold in the U.S. must meet the requirements of 16 CFR Parts 1632 and 1633, as regulated by the U.S. Consumer Product Safety Commission. Every Busby mattress meets these flammability standards. Our mattresses also carry CertiPUR-US® certification, meaning the foams do not contain ozone depleters, PBDEs, TDCPP or TCEP flame retardants, mercury, lead, or other heavy metals, formaldehyde, or phthalates. They also meet low VOC emissions for indoor air quality (less than 0.5 parts per million).",
  },
];
