"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

const faqs = [
  {
    question: "How long will it take to receive my mattress?",
    answer:
      "Every Sleep6 mattress is made to order. Typical delivery time is 5–7 business days.",
  },
  {
    question: "Where are Sleep6 mattresses made?",
    answer:
      "All Sleep6 mattresses are 100% USA-made. Our mattresses are crafted in Chicago and manufactured in Wisconsin.",
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
      "Sleep6 mattresses are built to last well past their 10-year warranty.",
  },
  {
    question: "Can I return the mattress?",
    answer:
      "Yes! All Sleep6 mattresses carry a full 100-night trial with risk-free returns.",
  },
  {
    question: "Do I need to flip my mattress?",
    answer:
      "You will not need to flip your Sleep6 mattress, but we recommend that you rotate it head-to-foot every 6 months.",
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
      "Opening your Sleep6 mattress is easy — just unwrap the tape, pull out the mattress, and use the provided opener to cut it free.",
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
      "All mattresses sold in the U.S. must meet the requirements of 16 CFR Parts 1632 and 1633, as regulated by the U.S. Consumer Product Safety Commission. Every Sleep6 mattress meets these flammability standards. Our mattresses also carry CertiPUR-US® certification, meaning the foams do not contain ozone depleters, PBDEs, TDCPP or TCEP flame retardants, mercury, lead, or other heavy metals, formaldehyde, or phthalates. They also meet low VOC emissions for indoor air quality (less than 0.5 parts per million).",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string; link?: { text: string; href: string } };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200/60">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-1 text-left cursor-pointer hover:opacity-80 transition-opacity duration-200"
      >
        <span
          className={`text-lg font-medium pr-4 transition-colors duration-200 ${
            isOpen ? "text-navy" : "text-gray-900"
          }`}
        >
          {faq.question}
        </span>
        <span
          className={`text-2xl flex-shrink-0 leading-none transition-colors duration-200 ${
            isOpen ? "text-gold" : "text-gray-400"
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-600 leading-relaxed px-1">{faq.answer}</p>
        {faq.link && (
          <Link
            href={faq.link.href}
            className="inline-flex items-center gap-1 mt-3 px-1 text-sm font-medium text-gold-dark hover:text-navy transition-colors duration-200"
          >
            {faq.link.text} <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] linen-texture relative">
      {/* Warm ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255, 220, 180, 0.4) 0%, rgba(255, 200, 150, 0.2) 30%, transparent 60%)",
        }}
      />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-12 md:py-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/15 blob-shape blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 blob-shape-alt blur-3xl translate-y-1/3 -translate-x-1/4" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 text-sm text-navy mb-8">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span>FAQ</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-navy mb-6">
                Got Questions?{" "}
                <span className="wavy-underline">We Have Answers.</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about Sleep6 mattresses — from
                delivery and materials to returns and care.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 border-t border-gray-200/60">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-6">
              Still Curious?
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
              We&apos;d Love to Help
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Reach out and our
              team will get back to you quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+1-800-000-0000"
                className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Get in Touch
              </a>
              <Link
                href="/home-line"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-navy/20 hover:border-gold text-navy font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                Shop Mattresses
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
