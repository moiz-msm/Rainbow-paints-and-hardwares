import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

export const faqs = [
  {
    question: "Do you provide on-site wall inspection?",
    answer:
      "Yes, we offer free site visits and moisture check inspections using digital moisture meters to ensure your walls are ready for painting and to recommend the right waterproofing solutions if needed.",
  },
  {
    question: "How long does a typical 3BHK painting project take?",
    answer:
      "Usually, a standard 3BHK interior project takes about 7-10 days including surface preparation (putty, primer) and two coats of premium paint. Exterior projects may vary based on weather conditions.",
  },
  {
    question:
      "Can I get customized colors that are not in the standard catalog?",
    answer:
      "Absolutely! We use computerized color tinting machines from Asian Paints and Berger which can generate over 4000+ shades instantly in our store while you wait.",
  },
  {
    question: "Is waterproofing necessary before painting?",
    answer:
      "If you have issues with dampness, salt formation (efflorescence), or peeling paint, waterproofing is critical. We recommend Dr. Fixit or Asian Paints SmartCare solutions before applying any top coat.",
  },
  {
    question: "What is the difference between Economy and Luxury paint?",
    answer:
      "Luxury paints (like Royale) have a higher resin content, offering better washability, smoother finish, and better coverage per liter compared to economy paints (like Tractor Emulsion).",
  },
  {
    question: "Is the online price same as the in-store price?",
    answer:
      "Yes! We offer the exact same competitive pricing online as we do in our physical branches. There are no extra 'online convenience' charges.",
  },
  {
    question: "How do you guarantee product genuineness online?",
    answer:
      "As authorized distributors for Asian Paints and Berger Paints for over 20 years, every product we ship is 100% genuine, factory-sealed, and sourced directly from the manufacturers.",
  },
  {
    question: "How does doorstep delivery work for paint orders?",
    answer:
      "Once you place an order, our logistics team picks up the materials from our nearest branch and delivers them to your doorstep across Coimbatore. Most local deliveries are completed within 24-48 hours.",
  },
  {
    question: "Can I get expert advice if I'm buying online?",
    answer:
      "Absolutely. You can use our 'Request Visit' feature for a site inspection or reach out to us via WhatsApp. Our technical team is always ready to guide you on product selection and quantity requirements.",
  },
  {
    question: "Where can I find an authorized Asian Paints or Berger Paints dealer in Coimbatore?",
    answer:
      "Rainbow Paints & Hardwares is a certified and trusted dealer for both Asian Paints and Berger Paints in Coimbatore. We offer the complete range of interior, exterior, waterproofing, and wood finish products from top brands."
  },
  {
    question: "What is the best paint for exterior walls to protect from rain?",
    answer:
      "For severe weather conditions, we highly recommend Asian Paints Apex Ultima Protek or Berger WeatherCoat Long Life. These provide excellent waterproofing and anti-algal protection for exterior walls."
  },
  {
    question: "Can I buy wall putty, primer, and painting tools online?",
    answer:
      "Yes, our online store features a full range of painting accessories including wall putty, primers, rollers, brushes, and masking tapes. Everything you need for a complete painting job can be delivered to your door in Coimbatore."
  }
];

export default function FaqSection({
  showLink = false,
  limit,
}: {
  showLink?: boolean;
  limit?: number;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const displayFaqs = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section id="faqs" className="py-8 sm:py-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-blue-600/5 blur-[40px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-zinc-200 mb-4">
            <HelpCircle className="w-3 h-3 text-gold" />
            <span className="text-[8px] uppercase tracking-[0.2em] text-ivory/80 font-display font-medium">
              FAQ Guide
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-medium mb-3 uppercase tracking-tight leading-tight text-center">
            Frequently Asked{" "}
            <span className="text-gradient italic">Questions</span>
          </h2>
          <p className="text-gold max-w-lg mx-auto text-[10px] sm:text-xs font-sans font-light leading-relaxed italic mb-6">
            Everything you need to know about our products, services, and expert
            advice.
          </p>
        </motion.div>

        <div className="space-y-3">
          {displayFaqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-panel rounded-xl border transition-all duration-300 hover-gold-glow ${activeIndex === idx ? "border-gold/40 bg-white shadow-sm border border-zinc-200" : "border-zinc-200 hover:border-black/10"}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-[11px] sm:text-xs text-ivory tracking-wide">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gold transition-transform duration-300 ${activeIndex === idx ? "rotate-180 text-gold" : ""}`}
                />
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 sm:pb-4 text-[10px] sm:text-[11px] text-ivory/80 leading-relaxed border-t border-zinc-200 pt-3 font-light italic">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {showLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              to="/faqs"
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white shadow-sm border border-zinc-200 text-ivory/80 hover:text-gold hover:border-gold/50 transition-all text-[11px] uppercase tracking-[0.2em] font-display font-medium group shadow-lg shadow-black/20 hover:scale-105 active:scale-95"
            >
              Explore All Questions
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
