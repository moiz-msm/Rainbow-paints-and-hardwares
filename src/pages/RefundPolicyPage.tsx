import React from 'react';
import SEO from '../components/SEO';

export default function RefundPolicyPage() {
  return (
    <div className="bg-royale-bg min-h-screen pt-24 pb-12">
      <SEO 
        title="Refund Policy | Rainbow Paints & Hardwares"
        description="Learn about our refund, cancellation, and return policies for paint and hardware products at Rainbow Paints & Hardwares."
        url="https://rainbowpaint.in/refund-policy"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-royale-surface rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-between">Refund Policy</h1>
          <p className="text-zinc-600 mb-8">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <div className="space-y-8 text-gray-700 leading-relaxed font-light">
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">1. Overview of Return Policy</h2>
              <p className="mb-3">At Rainbow Paints & Hardwares, we deal in chemical coatings and custom-tinted products. Therefore, we maintain a strict <strong>No Returns & No Refunds</strong> policy for correctly delivered, undamaged goods. Exceptions are only made if you receive an incorrect product, or if the product is damaged or defective upon delivery.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">2. Conditions for Approved Returns</h2>
              <p className="mb-3">Returns and replacements are only considered under the following conditions:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You received a product different from what you ordered.</li>
                <li>The securely sealed packaging was damaged or leaked during transit.</li>
                <li>The product must be unused, in the same condition that you received it, and in its original packaging with original invoice and tags intact.</li>
                <li><strong>Note:</strong> Custom mixed paints (machine-tinted shades) cannot be returned or exchanged under any circumstances once processing has begun.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">3. Claim Process</h2>
              <p className="mb-3">If your order qualifies for a return/replacement based on the criteria above, you must initiate a claim within <strong>24 hours</strong> of delivery.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Contact our support team immediately at +91 80724 42930 or rainbow_paint@hotmail.com.</li>
                <li>Provide your order number, a brief description of the issue, and clear photographs or an unboxing video showing the damage or incorrect item.</li>
                <li>Our quality team will review the claim and authorize a pickup or replacement if the claim is valid.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">4. Order Cancellations</h2>
              <p className="mb-3">Orders can only be canceled before they are dispatched. Custom tinted or mixed products cannot be cancelled once the tinting process has commenced. If you need to cancel an order, please contact our support team immediately.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">5. Refund Processing</h2>
              <p className="mb-3">For approved returns or cancellations, refunds will be initiated to your original method of payment within 5-7 business days. Please note that it may take additional time for your bank or credit card company to process and post the refund to your account.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
