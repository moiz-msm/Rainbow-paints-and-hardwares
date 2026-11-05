import React, { useMemo } from "react";
import FaqSection, { faqs } from "../components/FaqSection";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";

export default function FaqPage() {
  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.rainbowpaint.in/faqs#faq",
    "isPartOf": {
      "@type": "WebPage",
      "@id": "https://www.rainbowpaint.in/faqs"
    },
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }), []);

  const breadcrumbSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.rainbowpaint.in/faqs#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.rainbowpaint.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Frequently Asked Questions",
        "item": "https://www.rainbowpaint.in/faqs"
      }
    ]
  }), []);

  const webPageSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.rainbowpaint.in/faqs",
    "url": "https://www.rainbowpaint.in/faqs",
    "name": "Painting & Ordering FAQs – Expert Paint Guide | Rainbow Paints",
    "description": "Got questions on paint coverage, color tinting, drying times, waterproofing or delivery? Read expert answers from Rainbow Paints & Hardwares in Coimbatore.",
    "breadcrumb": {
      "@id": "https://www.rainbowpaint.in/faqs#breadcrumb"
    },
    "about": {
      "@id": "https://www.rainbowpaint.in/#organization"
    }
  }), []);

  const combinedSchemas = useMemo(() => [
    faqSchema,
    breadcrumbSchema,
    webPageSchema
  ], [faqSchema, breadcrumbSchema, webPageSchema]);

  return (
    <div className="pt-24 pb-12 bg-royale-bg min-h-screen">
      <SEO 
        title="Painting & Ordering FAQs – Expert Paint Guide | Rainbow Paints"
        description="Got questions on paint coverage, color tinting, drying times, waterproofing or delivery? Read expert answers from Rainbow Paints & Hardwares in Coimbatore."
        url="https://www.rainbowpaint.in/faqs"
        schema={combinedSchemas}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <Breadcrumb />
      </div>
      <FaqSection />
    </div>
  );
}
