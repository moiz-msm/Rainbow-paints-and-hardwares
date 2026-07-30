import React from "react";
import FaqSection, { faqs } from "../components/FaqSection";
import { HelpCircle } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you provide on-site wall inspection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer free site visits and moisture check inspections using digital moisture meters to ensure your walls are ready for painting and to recommend the right waterproofing solutions if needed."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a typical 3BHK painting project take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Usually, a standard 3BHK interior project takes about 7-10 days including surface preparation (putty, primer) and two coats of premium paint. Exterior projects may vary based on weather conditions."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get customized colors that are not in the standard catalog?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! You can buy from 5000+ custom color shades mixed using computerized color tinting machines from Asian Paints and Berger instantly in our store while you wait."
        }
      },
      {
        "@type": "Question",
        "name": "Is waterproofing necessary before painting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you have issues with dampness, salt formation (efflorescence), or peeling paint, waterproofing is critical. We recommend Dr. Fixit or Asian Paints SmartCare solutions before applying any top coat."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Economy and Luxury paint?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Luxury paints (like Royale) have a higher resin content, offering better washability, smoother finish, and better coverage per liter compared to economy paints (like Tractor Emulsion)."
        }
      },
      {
        "@type": "Question",
        "name": "How do I choose the right finish (matte, satin, gloss) for my rooms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Matte finishes hide wall imperfections well and are great for ceilings and low-traffic areas. Satin or silk finishes offer a soft sheen and are easy to clean, making them ideal for living rooms. Gloss finishes are highly durable and best for doors, trims, and wooden surfaces."
        }
      },
      {
        "@type": "Question",
        "name": "How can I estimate the amount of paint required for my house?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can use the Paint Calculator on our website to get a rough estimate based on your room dimensions. For a precise estimate, you can request a free site visit by our technical experts."
        }
      },
      {
        "@type": "Question",
        "name": "Is the online price same as the in-store price?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We offer the exact same competitive pricing online as we do in our physical branches. There are no extra 'online convenience' charges."
        }
      },
      {
        "@type": "Question",
        "name": "How do you guarantee product genuineness online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As authorized distributors for Asian Paints and Berger Paints for over 20 years, every product we ship is 100% genuine, factory-sealed, and sourced directly from the manufacturers."
        }
      },
      {
        "@type": "Question",
        "name": "What are the delivery timelines for different areas within Coimbatore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most local deliveries within Coimbatore city limits are completed within 24-48 hours. For surrounding areas like Pollachi, Mettupalayam, or Tirupur, delivery may take 2-3 business days."
        }
      },
      {
        "@type": "Question",
        "name": "Is same-day delivery available in Coimbatore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, same-day delivery is available for orders placed before 12 PM for in-stock items delivered within a 10km radius of our Kattoor branch. Please contact us via WhatsApp to confirm same-day eligibility."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any delivery charges for orders within Coimbatore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer free delivery within Coimbatore for all orders above ₹5,000. For orders below this amount, a nominal delivery fee is calculated at checkout based on your exact location and volumetric weight."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get expert advice if I'm buying online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. You can use our 'Request Visit' feature for a site inspection or reach out to us via WhatsApp. Our technical team is always ready to guide you on product selection and quantity requirements."
        }
      },
      {
        "@type": "Question",
        "name": "What is your return and exchange policy for unused paint?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We accept returns and exchanges on unopened, standard white or factory-packed base paints within 7 days of purchase. The product must be in its original, sealed condition along with the original invoice."
        }
      },
      {
        "@type": "Question",
        "name": "Can I return customized (tinted) paint colors?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unfortunately, we cannot accept returns or exchanges for customized, machine-tinted paint shades since they are specifically mixed to your order. We highly recommend testing a small sample before ordering bulk quantities."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer wholesale accounts or discounts for contractors and painters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer special B2B pricing, credit facilities, and volume discounts for registered painting contractors, builders, and architects. Please contact our store directly to set up a trade account."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I find an authorized Asian Paints or Berger Paints dealer in Coimbatore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rainbow Paints & Hardwares is a certified and trusted dealer for both Asian Paints and Berger Paints in Coimbatore. We offer the complete range of interior, exterior, waterproofing, and wood finish products from top brands."
        }
      }
    ]
  };

  return (
    <div className="pt-24 pb-12 bg-royale-bg min-h-screen">
      <SEO 
        title="Frequently Asked Questions | Rainbow Paints & Hardwares"
        description="Have questions about ordering paint online? Check out our FAQ for information on shipping, returns, color matching, and more."
        url="https://www.rainbowpaint.in/faqs"
        schema={faqSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <Breadcrumb />
      </div>
      <FaqSection />
    </div>
  );
}
