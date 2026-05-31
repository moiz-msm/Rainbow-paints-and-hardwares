import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-royale-bg min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-royale-surface rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
              <p>Welcome to Rainbow Paints & Hardwares. By using our website and purchasing products from us, you agree to be bound by these Terms and Conditions.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Products & Pricing</h2>
              <p>All products listed on our website are subject to availability. We strive to display accurate pricing, but pricing errors may occur. We reserve the right to cancel any orders placed for products with incorrect pricing. Prices are subject to change without notice.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Authenticity</h2>
              <p>We guarantee that all products sold on our platform are 100% genuine and sourced directly from manufacturers like Asian Paints, Berger Paints, MRF, and Dr. Fixit. Factory seals remain intact until delivery.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Delivery</h2>
              <p>Delivery timelines are estimates. We generally deliver within Coimbatore city limits within 24-48 hours. Delayed deliveries due to unforeseen circumstances do not entitle you to a refund of the product cost, though delivery charges may be waived on a case-by-case basis.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
              <p>Rainbow Paints & Hardwares is not liable for indirect, incidental, or consequential damages resulting from the use of our products. Users must consult appropriate professionals (painters, contractors) for correct application.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
