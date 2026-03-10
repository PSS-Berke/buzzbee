import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Sleep6",
  description:
    "Learn how Sleep6 collects, uses, shares, and protects your personal information.",
};

const sections = [
  {
    id: "how-we-share",
    label: "Sharing",
    title: "How We Share the Information We Collect",
    content: (
      <>
        <p className="text-gray-600 mb-4">
          Sleep6, LLC does not sell, rent or trade your personal information to
          third parties.
        </p>
        <p className="text-gray-600 mb-4">
          Sleep6, LLC is the parent company of the Sleep6, LLC Companies
          (&ldquo;Sleep6&rdquo;), and as such, if you provide information to any
          of the businesses and websites owned or operated by Sleep6, LLC, this
          information may be combined or shared among current or future Sleep6,
          LLC entities, including affiliates and subsidiaries and will be
          governed by each of their privacy policies, as applicable.
        </p>
        <p className="text-gray-600 mb-3">
          We may share your information with third parties to perform services
          on our behalf such as:
        </p>
        <ul className="space-y-2 mb-4">
          {[
            "Fulfilling orders",
            "Delivering packages",
            "Servicing product(s)",
            "Sending Sleep6, LLC marketing communications",
            "Conducting research and analysis",
            "Providing chat functions",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-600">
              <span className="flex-shrink-0 w-1.5 h-1.5 bg-gold rounded-full mt-2" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-600 mb-4">
          Sometimes we may be required to share personal information in response
          to a regulation, court order or subpoena. We may also share
          information when we believe it&apos;s necessary to comply with the
          law, to respond to a government request, or when we believe disclosure
          is necessary or appropriate to protect the rights, property or safety
          of Sleep6, LLC, our customers, or others; to prevent harm or loss; or
          in connection with an investigation of suspected or actual unlawful
          activity.
        </p>
        <p className="text-gray-600">
          We may also share personal information in the event of a corporate
          sale, merger, acquisition, dissolution or similar event. You will be
          notified via email and/or a prominent notice on our applicable
          website(s) of any change in ownership, as well as any choices you may
          have regarding your personal information.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    label: "Collection",
    title: "Information We Collect",
    content: (
      <>
        <h3 className="text-lg font-semibold text-navy mb-3">
          Information You Provide Us
        </h3>
        <p className="text-gray-600 mb-3">
          We collect and store information you provide through our websites and
          mobile applications — for example, when you place an order, create an
          account, call us with a question, write a review, or use any of our
          services.
        </p>
        <p className="text-gray-600 mb-3">
          The information we collect from you includes things like:
        </p>
        <ul className="space-y-2 mb-6">
          {[
            "Your name",
            "Your mailing address",
            "Your email address",
            "Your phone number",
            "Your credit card number and other payment information",
            "Your driver's license number",
            "Credit application information, such as your Social Security number (if financing any Sleep6 products)",
            "Demographic and lifestyle information, such as age, personal interests and product preferences",
            "Information you give us about other people, such as the name and address of a gift recipient",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-600">
              <span className="flex-shrink-0 w-1.5 h-1.5 bg-gold rounded-full mt-2" />
              {item}
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold text-navy mb-3">
          Information from Other Sources
        </h3>
        <p className="text-gray-600 mb-6">
          We may also receive information about you from other sources,
          including third parties that help us update, expand and analyze our
          records and identify new customers.
        </p>

        <h3 className="text-lg font-semibold text-navy mb-3">
          Automated Online Information Collection
        </h3>
        <p className="text-gray-600 mb-3">
          We collect information related to your interactions with our websites
          and apps to create a superior, personalized shopping experience. This
          includes your IP address, browsing behavior while on our website,
          browser and device characteristics, and referring URLs. This
          information is collected using a variety of common technologies,
          including various types of cookies, Flash cookies, web beacons, and
          tags.
        </p>
        <p className="text-gray-600 mb-6">
          Our websites and mobile applications are not designed to respond to
          &ldquo;do not track&rdquo; requests from browsers.
        </p>

        <h3 className="text-lg font-semibold text-navy mb-3">
          Public Forums
        </h3>
        <p className="text-gray-600">
          Our websites offer publicly accessible blogs or community forums. You
          should be aware that any information you provide in these areas may be
          read, collected, and used by others who access them.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    label: "Usage",
    title: "How We Use the Information We Collect",
    content: (
      <>
        <p className="text-gray-600 mb-3">
          We use the information we collect for things like:
        </p>
        <ul className="space-y-2 mb-6">
          {[
            "Fulfilling orders and requests for products, services or information",
            "Processing returns",
            "Tracking and confirming online orders",
            "Delivering product(s)",
            "Marketing and advertising products and services",
            "Conducting research and analysis",
            "Establishing and managing your accounts with us",
            "Communicating things like special events, sweepstakes, promotions and surveys",
            "Identifying you on our websites and tailoring advertisements and offers to you based on your interactions with us online",
            "Facilitating interactions with Sleep6, LLC and others",
            "Operating, evaluating and improving our business",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-600">
              <span className="flex-shrink-0 w-1.5 h-1.5 bg-gold rounded-full mt-2" />
              {item}
            </li>
          ))}
        </ul>
        <h3 className="text-lg font-semibold text-navy mb-3">
          Retention of Data
        </h3>
        <p className="text-gray-600">
          We may retain your information for as long as your account is active
          or as needed to provide you services, comply with our legal
          obligations, resolve disputes, and enforce our agreements.
        </p>
      </>
    ),
  },
  {
    id: "how-we-protect",
    label: "Protection",
    title: "How We Protect the Information We Collect",
    content: (
      <>
        <p className="text-gray-600 mb-4">
          We use reasonable security measures to protect the confidentiality of
          personal information under our control and appropriately limit access
          to it. Sleep6, LLC cannot ensure or warrant the security of any
          information you transmit to us and you do so at your own risk.
        </p>
        <p className="text-gray-600">
          We use a variety of information security measures to protect your
          online transactions with us. The Sleep6, LLC website(s) use encryption
          technology, such as Secure Sockets Layer (SSL), to protect your
          personal information during data transport. SSL protects information
          you submit via our websites such as ordering information, including
          your name, address and credit card number.
        </p>
      </>
    ),
  },
  {
    id: "your-choices",
    label: "Your Choices",
    title: "Your Choices Regarding the Information We Collect",
    content: (
      <>
        <p className="text-gray-600 mb-3">You may choose to:</p>
        <ul className="space-y-2 mb-6">
          {[
            "Stop receiving marketing or promotional emails, direct mail, phone and mobile marketing communications",
            "Update and correct your personal information",
            "Deactivate your account",
            "Request removal of content or personal information posted by you from our website, online service, or mobile application",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-600">
              <span className="flex-shrink-0 w-1.5 h-1.5 bg-gold rounded-full mt-2" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-600 mb-3">
          Please note: even if we are able to anonymize or make your content or
          information no longer visible, this does not ensure complete or
          comprehensive removal from the Internet as third parties may retain
          cached copies.
        </p>
        <p className="text-gray-600 mb-3">
          To exercise any of these choices, contact us by one of these methods:
        </p>
        <ul className="space-y-2">
          {[
            "Follow the directions in a marketing email or direct mail communication you receive from us",
            "Call 1-844-375-3376 with your request and current contact information",
            "Send an email with your request to: info@Sleep6.com",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-600">
              <span className="flex-shrink-0 w-1.5 h-1.5 bg-gold rounded-full mt-2" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "children",
    label: "Children",
    title: "Protecting Children's Privacy",
    content: (
      <p className="text-gray-600">
        We are committed to protecting children&apos;s privacy on the Internet
        and we do not knowingly collect personal information from children under
        the age of 13.
      </p>
    ),
  },
  {
    id: "links",
    label: "External Links",
    title: "Links to Other Websites",
    content: (
      <p className="text-gray-600">
        Our websites link to other websites, many of which have their own
        privacy policies. Be sure to review the privacy policy on any website
        you&apos;re visiting.
      </p>
    ),
  },
  {
    id: "social-media",
    label: "Social Media",
    title: "Social Media Widgets",
    content: (
      <p className="text-gray-600">
        Our website includes Social Media Features, such as the Facebook Like
        button and share widgets. These features may collect your IP address,
        the page you are visiting on our website, and may set a cookie to enable
        the feature to function properly. Social Media Features and Widgets are
        either hosted by a third party or hosted directly on our website. Your
        interactions with these features are governed by the privacy policy of
        the company providing them.
      </p>
    ),
  },
  {
    id: "updates",
    label: "Updates",
    title: "Privacy Policy Updates",
    content: (
      <p className="text-gray-600">
        We may need to update our Privacy Policy as Sleep6, LLC and our
        customers grow and evolve. If we make material changes, we will notify
        you by email (sent to the email address specified in your account) or by
        means of a notice on this website prior to the change becoming
        effective, as well as inform you of any choices you may have with
        respect to these changes.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
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
        {/* Hero */}
        <section className="relative overflow-hidden pt-8 pb-12 md:py-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/15 blob-shape blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 blob-shape-alt blur-3xl translate-y-1/3 -translate-x-1/4" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 text-sm text-navy mb-8">
                <span className="w-2 h-2 bg-gold rounded-full" />
                <span>Legal</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-navy mb-6">
                Privacy{" "}
                <span className="wavy-underline">Policy</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We take your privacy seriously. Here&apos;s exactly how we
                collect, use, share, and protect your information.
              </p>
            </div>
          </div>
        </section>

        {/* Intro summary */}
        <section className="pb-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="bg-white border-2 border-gold/20 rounded-3xl p-8 shadow-lg shadow-gold/5">
              <p className="text-gray-600 mb-4">
                This Privacy Policy tells you:
              </p>
              <ul className="space-y-2">
                {[
                  "What information we collect",
                  "How we use that information",
                  "How we may share that information",
                  "How we protect your information",
                  "Your choices regarding your personal information",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-navy font-medium">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-gold rounded-full mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                This Policy applies to Sleep6.com or any of its affiliates.
              </p>
            </div>
          </div>
        </section>

        {/* Policy sections */}
        <section className="py-10 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white/70 border border-gray-200/60 rounded-3xl p-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-3 py-1 rounded-full text-xs">
                    {section.label}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-serif text-navy mb-5">
                  {section.title}
                </h2>
                <div>{section.content}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact card */}
        <section className="py-20 border-t border-gray-200/60">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-6">
              Have Questions?
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
              We&apos;re Here to Help
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
              If you have any questions about our Privacy Policy or practices,
              we&apos;ll do our best to answer them.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <a
                href="tel:18443753376"
                className="bg-white border-2 border-gold/20 rounded-3xl p-6 shadow-lg shadow-gold/5 flex flex-col items-center gap-3 hover:border-gold transition-colors"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold-dark" />
                </div>
                <span className="text-sm text-gray-500">Phone</span>
                <span className="text-navy font-semibold">1-844-375-3376</span>
              </a>

              <a
                href="mailto:support@Sleep6.com"
                className="bg-white border-2 border-gold/20 rounded-3xl p-6 shadow-lg shadow-gold/5 flex flex-col items-center gap-3 hover:border-gold transition-colors"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gold-dark" />
                </div>
                <span className="text-sm text-gray-500">Email</span>
                <span className="text-navy font-semibold">support@Sleep6.com</span>
              </a>

              <div className="bg-white border-2 border-gold/20 rounded-3xl p-6 shadow-lg shadow-gold/5 flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold-dark" />
                </div>
                <span className="text-sm text-gray-500">Address</span>
                <span className="text-navy font-semibold">Sleep6, LLC</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/home-line"
                className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                Shop Mattresses
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-navy/20 hover:border-gold text-navy font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                View FAQ
              </Link>
            </div>

            <p className="text-sm text-gray-400 mt-10">
              Last Updated: July 7, 2015
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
