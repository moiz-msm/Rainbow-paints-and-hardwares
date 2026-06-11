import React from "react";
import FaqSection, { faqs } from "../components/FaqSection";
import { HelpCircle } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="pt-24 pb-12 bg-royale-bg min-h-screen">
      <SEO 
        title="Frequently Asked Questions | Rainbow Paints & Hardwares"
        description="Have questions about ordering paint online? Check out our FAQ for information on shipping, returns, color matching, and more."
        url="https://rainbowpaint.in/faqs"
        schema={faqSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <Breadcrumb />
      </div>
      <FaqSection />
    </div>
  );
}
