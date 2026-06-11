import React from 'react';
import SEO from '../components/SEO';

export default function ShippingPolicyPage() {
  return (
    <div className="bg-royale-bg min-h-screen pt-24 pb-12">
      <SEO 
        title="Shipping & Delivery Policy | Rainbow Paints & Hardwares"
        description="Learn about our shipping rates, delivery times, and local delivery zones in Coimbatore at Rainbow Paints & Hardwares."
        url="https://rainbowpaint.in/shipping-policy"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-royale-surface rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-between">Shipping & Delivery Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <div className="space-y-8 text-gray-700 leading-relaxed font-light">
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">1. Delivery Coverage Area</h2>
              <p className="mb-3">We provide local doorstep delivery within Coimbatore city limits and its immediate surrounding regions. For locations outside our primary delivery zone, please contact our support team at +91 80724 42930 to confirm serviceability before placing your order. We reserve the right to cancel orders placed for unserviceable pin codes.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">2. Processing & Delivery Times</h2>
              <p className="mb-3">Our goal is to deliver your order quickly and safely:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Local Coimbatore Orders:</strong> Typically delivered within 24 to 48 hours.</li>
                <li><strong>Processing Cut-off:</strong> Orders placed after 7:00 PM IST will be processed on the next business day.</li>
                <li><strong>Operating Hours:</strong> Deliveries are generally made between 10:00 AM and 7:00 PM, Monday through Saturday.</li>
              </ul>
              <p className="mt-3">Please note that delivery timelines are estimates. Delays may occur due to public holidays, extreme weather, traffic regulations, or other unforeseen circumstances.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">3. Shipping Costs</h2>
              <p className="mb-3">Delivery charges are dynamically calculated at checkout based on the total volumetric weight of your order and the driving distance from our fulfillment center in Kattoor, Coimbatore.</p>
              <p className="mb-3">We may periodically offer promotional free shipping on orders exceeding a minimum purchase value. Any applicable delivery fees will be explicitly stated before you finalize your payment.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">4. Receiving Your Order</h2>
              <p className="mb-3">Given the nature of paints and chemical coatings, a responsible adult must be present at the delivery address to receive and inspect the materials. Upon delivery, please check the condition of the packaging. If you notice severe damage or leakage, you must notify the delivery personnel immediately and contact our support team within 24 hours.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">5. Failed Delivery Attempts</h2>
              <p className="mb-3">Our delivery partners will attempt to deliver your package to the provided address. If the delivery fails due to incorrect address details, customer unavailability, or refusal to accept the package, the items will be returned to our store. In such cases, a redelivery fee may apply, or the order may be canceled with restocking fees deducted from your refund.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
