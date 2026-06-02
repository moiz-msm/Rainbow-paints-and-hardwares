import React from "react";
import FaqSection from "../components/FaqSection";
import { HelpCircle } from "lucide-react";
import SEO from "../components/SEO";

export default function FaqPage() {
  // A generic FAQPage schema without all items (can be expanded later)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": []
  };

  return (
    <div className="pt-24 pb-12 bg-royale-bg min-h-screen">
      <SEO 
        title="Frequently Asked Questions | Rainbow Paints & Hardwares"
        description="Have questions about ordering paint online? Check out our FAQ for information on shipping, returns, color matching, and more."
        url="https://rainbowpaint.in/faqs"
        schema={faqSchema}
      />
      <FaqSection />
    </div>
  );
}
