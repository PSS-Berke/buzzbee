"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { faqs, type FAQ } from "@/data/faqs";

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const buttonId = `faq-button-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div className="border-b border-gray-200/60">
      <h2>
        <button
          type="button"
          id={buttonId}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-center justify-between py-5 px-1 text-left cursor-pointer hover:opacity-80 transition-opacity duration-200"
        >
          <span
            className={`text-base sm:text-lg font-medium pr-4 transition-colors duration-200 ${
              isOpen ? "text-navy" : "text-gray-900"
            }`}
          >
            {faq.question}
          </span>
          <span
            aria-hidden="true"
            className={`text-xl flex-shrink-0 leading-none transition-colors duration-200 ${
              isOpen ? "text-gold-dark" : "text-gray-600"
            }`}
          >
            {isOpen ? "−" : "+"}
          </span>
        </button>
      </h2>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="pb-5"
      >
        <p className="text-gray-600 leading-relaxed px-1">{faq.answer}</p>
        {faq.link && (
          <Link
            href={faq.link.href}
            className="inline-flex items-center gap-1 mt-3 px-1 text-sm font-medium text-gold-dark underline hover:text-navy transition-colors duration-200"
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
        <section className="relative overflow-hidden pt-4 pb-12 md:pt-10 md:pb-20">
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
                Everything you need to know about Busby mattresses — from
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
                index={i}
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
                href="tel:+18448861640"
                className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Call us: (844) 886-1640
              </a>
              <Link
                href="/shop/mattresses"
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
