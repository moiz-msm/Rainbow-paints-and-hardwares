import React from 'react';

export default function ShippingPolicyPage() {
  return (
    <div className="bg-royale-bg min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-royale-surface rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-between">Shipping & Delivery Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Delivery Coverage</h2>
              <p>We primarily offer doorstep delivery across Coimbatore city limits and surrounding regions. For locations outside our standard delivery zone, please contact our support team to verify serviceability before placing an order.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Estimated Delivery Time</h2>
              <p>Most local orders within Coimbatore are delivered within 24 to 48 hours. Orders placed after 4:00 PM are generally processed on the following business day. Delivery times may be affected during public holidays or extreme weather conditions.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Delivery Charges</h2>
              <p>Delivery charges are calculated based on the weight of the items and the distance to the delivery location. Exact delivery fees will be displayed at checkout before you finalize your purchase. We occasionally offer free delivery on orders exceeding a certain amount.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Order Tracking</h2>
              <p>Once your order is dispatched, you will receive an SMS or email notification with an estimated time of arrival and contact details of the delivery personnel.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
