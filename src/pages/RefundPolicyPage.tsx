import React from 'react';

export default function RefundPolicyPage() {
  return (
    <div className="bg-royale-bg min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-royale-surface rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-between">Refund Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Returns Policy</h2>
              <p>We generally do not accept returns. Returns or exchanges are only processed if the wrong product, or a damaged/defective product, is delivered to you.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Wrong or Damaged Goods</h2>
              <p>If you receive a product that is damaged during transit, defective, or incorrect, please contact us immediately upon delivery. We will arrange a replacement or refund upon verified inspection.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Customer Support</h2>
              <p>Even though our return policy is strict, we value our customers. If you face any issues or concerns with your order, please do get in touch with us. We will do our absolute best to sort out the issue and assist you to the best of our capacity.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Refund Processing</h2>
              <p>For approved returns (due to wrong or damaged products), once your return is received and inspected, we will notify you of the approval of your refund. Approved refunds will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
