import React, { useState } from "react";
import { ArrowRight, Package } from "lucide-react";
import WhatsappIcon from "./WhatsappIcon";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categoryIcons = [
  { emoji: "🎨", name: "Home Paint" },
  { emoji: "🏭", name: "Industrial" },
  { emoji: "💧", name: "Waterproofing" },
  { emoji: "🪵", name: "Wood Finishes" },
  { emoji: "🛡️", name: "Gates & Grills" },
];

export default function ProductsAndIndustrial() {
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    pinCode: "",
  });

  const handleWhatsapp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { crmService } = await import("../lib/crm");
      await crmService.addLead({
        type: "VISIT",
        name: formData.name || "Unknown",
        phone: "WhatsApp User",
        metadata: {
          area: formData.area,
          pinCode: formData.pinCode,
          requestMessage: "Free Paint Sample Kit & Site Visit",
        },
      });

      // Notify server CRM for real-time alerting and HTML log tracking
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `New Site Visit Request: ${formData.name || "Premium Lead"}`,
          message: `Customer ${formData.name || "Unknown"} requested a luxury site consultation and sample layout kit for a surface area of ${formData.area || "unspecified"} sq ft. Pin code: ${formData.pinCode || "641001"}.`,
          type: "CRM_LEAD_ALERT",
          recipientEmail: "admin@rainbowpaints.com",
          metadata: {
            customerName: formData.name,
            estimatedAreaSqFt: formData.area,
            pincodeMatches: formData.pinCode,
            priority: "HIGH",
          },
        }),
      });
    } catch (err) {
      console.warn("Could not log CRM/notification, but progressing...", err);
    }

    const message = `Hi Rainbow Paints! I would like to book a free site visit.\n\n*Name:* ${formData.name || "Not provided"}\n*Approx Area:* ${formData.area || "Not provided"} sq.ft\n*Pin Code:* ${formData.pinCode || "Not provided"}\n\n*Interested in:* Free Paint Sample Kit & Site Visit`;
    window.open(
      `https://wa.me/918072442930?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <section
      className="py-4 sm:py-6 bg-transparent relative overflow-hidden"
      id="products-industrial"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Site Visit Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="h-full relative rounded-xl overflow-hidden border border-zinc-200 bg-white p-4 sm:p-6 flex flex-col justify-between hover-gold-glow shadow-sm"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[40px] -mr-32 -mt-32 group-hover:bg-gold/10 transition-colors duration-700" />

            <div className="relative z-10 flex flex-col items-start text-left mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white shadow-sm border border-zinc-200 flex items-center justify-center mb-4 border border-zinc-200">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-medium mb-3 uppercase tracking-tight leading-tight text-zinc-900">
                Request site{" "}
                <span className="italic text-gradient font-light">visit.</span>
              </h2>
              <p className="text-gold text-[10px] sm:text-xs mb-4 max-w-sm italic font-light">
                Free visit - free consultation - free measurement - free quote -
                free paint sample - by experts on your doorstep - no obligation,
                no cost.
              </p>
            </div>

            <form
              onSubmit={handleWhatsapp}
              className="relative z-10 space-y-3 mt-auto w-full"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1 sm:space-y-1.5">
                  <label className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-widest text-gold ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg sm:rounded-xl px-3 py-2.5 focus:outline-none focus:border-gold/50 transition-colors text-zinc-800 text-[10px] sm:text-xs placeholder:text-zinc-600 font-medium"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1 sm:space-y-1.5">
                  <label className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-widest text-gold ml-1">
                    Approx Sq Ft Area
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg sm:rounded-xl px-3 py-2.5 focus:outline-none focus:border-gold/50 transition-colors text-zinc-800 text-[10px] sm:text-xs placeholder:text-zinc-600 font-medium"
                    placeholder="e.g. 1500"
                  />
                </div>
              </div>
              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-widest text-gold ml-1">
                  Pin Code
                </label>
                <input
                  type="text"
                  value={formData.pinCode}
                  onChange={(e) =>
                    setFormData({ ...formData, pinCode: e.target.value })
                  }
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg sm:rounded-xl px-3 py-2.5 focus:outline-none focus:border-gold/50 transition-colors text-zinc-800 text-[10px] sm:text-xs placeholder:text-zinc-600 font-medium"
                  placeholder="641001"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20b858] text-white py-3 mt-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg shadow-[#25D366]/20 text-[10px] sm:text-xs uppercase tracking-wider"
              >
                <WhatsappIcon className="w-4 h-4" /> Book Via Whatsapp
              </button>
            </form>
          </motion.div>

          {/* Industrial Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="h-full glass-panel p-4 sm:p-6 rounded-xl border border-gold/20 bg-royale-surface/40 overflow-hidden relative shadow-md flex flex-col justify-between hover-gold-glow"
          >
            {/* Subtle gradient glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-gold/5 blur-[40px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/5 blur-[40px] rounded-full pointer-events-none" />

            <div className="relative z-10 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 border border-black/20 text-ivory text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.3em] mb-5">
                <span className="text-xs">🏭</span> Industrial Partners
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-medium mb-3 uppercase tracking-tight leading-tight text-ivory">
                Empowering{" "}
                <span className="text-gradient italic">Industries</span>
              </h2>

              <p className="text-gold font-sans font-light leading-relaxed text-[11px] sm:text-xs mb-6 max-w-sm">
                We continue to support and deliver specialized industrial
                coatings to all kinds of industries. Our robust, heavy-duty
                paints ensure lasting protection and peak performance for your
                infrastructure, backed by decades of technical expertise.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="bg-white shadow-sm border border-zinc-200 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                  <h3 className="text-lg font-serif text-gold mb-1">20+</h3>
                  <p className="text-[8px] font-display uppercase tracking-wider text-ivory/80">
                    years service
                  </p>
                </div>
                <div className="bg-white shadow-sm border border-zinc-200 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                  <h3 className="text-lg font-serif text-gold mb-1">100+</h3>
                  <p className="text-[8px] font-display uppercase tracking-wider text-ivory/80">
                    industries
                  </p>
                </div>
                <div className="bg-white shadow-sm border border-zinc-200 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                  <h3 className="text-lg font-serif text-gold mb-1 text-[13px] sm:text-[15px]">
                    On-Site
                  </h3>
                  <p className="text-[8px] font-display uppercase tracking-wider text-ivory/80">
                    consultation
                  </p>
                </div>
                <div className="bg-white shadow-sm border border-zinc-200 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                  <h3 className="text-lg font-serif text-gold mb-1 text-[13px] sm:text-[15px]">
                    On-Site
                  </h3>
                  <p className="text-[8px] font-display uppercase tracking-wider text-ivory/80">
                    delivery
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex gap-3 mt-auto">
              <a
                href="https://wa.me/+918072442930?text=Hi%20Rainbow%20Paints!%20I%20would%20like%20to%20enquire%20about%20industrial%20coatings."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20b858] text-white py-2.5 px-4 rounded-xl font-display font-bold transition-all tracking-widest text-[9px] sm:text-[10px] uppercase shadow-lg shadow-[#25D366]/20 flex justify-center items-center gap-2 flex-1"
              >
                <WhatsappIcon className="w-4 h-4 ml-[-4px]" /> Whatsapp
              </a>
              <a
                href="mailto:rainbow_paint@hotmail.com?subject=Industrial%20Coatings%20Enquiry"
                className="bg-transparent hover:bg-black/5 text-ivory border border-black/20 py-2.5 px-4 rounded-xl font-display font-medium transition-all tracking-widest text-[9px] sm:text-[10px] uppercase flex justify-center items-center gap-2 flex-1"
              >
                <span className="text-xs sm:text-sm">✉️</span> Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
