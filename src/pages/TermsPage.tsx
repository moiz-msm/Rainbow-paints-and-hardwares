import React from 'react';
import SEO from '../components/SEO';

export default function TermsPage() {
  return (
    <div className="bg-royale-bg min-h-screen pt-24 pb-12">
      <SEO 
        title="Terms & Conditions | Rainbow Paints & Hardwares"
        description="Read the Terms and Conditions for using Rainbow Paints & Hardwares website and services."
        url="https://www.rainbowpaint.in/terms"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-royale-surface rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
          <p className="text-zinc-600 mb-8">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <div className="space-y-8 text-gray-700 leading-relaxed font-light">
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">1. Agreement to Terms</h2>
              <p className="mb-3">Welcome to Rainbow Paints & Hardwares ("Company", "we", "our", "us"). These Terms and Conditions govern your access to and use of our website (rainbowpaint.in) and any services, purchases, or inquiries made through it. By accessing our website, you agree to be bound by these Terms. If you do not agree, please do not use our services.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">2. Products & Pricing</h2>
              <p className="mb-3">We strive to ensure all product descriptions, images, and prices are accurate. However, errors may occur. We reserve the right to correct any errors and to change or update information at any time without prior notice.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Pricing:</strong> All prices are in Indian Rupees (INR) and include applicable GST unless stated otherwise.</li>
                <li><strong>Availability:</strong> Products are subject to availability. We may limit or cancel quantities ordered.</li>
                <li><strong>Color Accuracy:</strong> Digital color representations may vary from actual paint colors due to screen calibration. We recommend testing physical shade cards.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">3. Authenticity & Quality</h2>
              <p className="mb-3">We are authorized dealers for premium brands including Asian Paints, Berger Paints, and Dr. Fixit. We guarantee that all products sold on our platform are 100% genuine and factory-sealed.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">4. User Accounts</h2>
              <p className="mb-3">When you create an account, you agree to provide complete and accurate information. You are responsible for safeguarding your account credentials and for all activities that occur under your account.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">5. Intellectual Property Rights</h2>
              <p className="mb-3">Unless otherwise stated, all content on this site, including text, graphics, logos, images, and software, is the property of Rainbow Paints & Hardwares or its suppliers and is protected by Indian and international copyright laws. You may not reproduce, distribute, or modify any content without our express written consent.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">6. Limitation of Liability</h2>
              <p className="mb-3">To the maximum extent permitted by law, Rainbow Paints & Hardwares shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of your access to or use of our website or products.</p>
              <p className="mb-3">We explicitly disclaim liability for improper application of paints and coatings. Users must consult professional contractors and adhere strictly to the manufacturer's technical data sheets.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">7. Indemnification</h2>
              <p className="mb-3">You agree to indemnify, defend, and hold harmless Rainbow Paints & Hardwares and its affiliates, directors, officers, and employees from any claims, liabilities, damages, and expenses (including legal fees) arising from your misuse of the website, violation of these Terms, or infringement of any intellectual property rights.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">8. Governing Law & Jurisdiction</h2>
              <p className="mb-3">These Terms shall be governed by and construed in accordance with the laws of India. Any disputes relating to these Terms or your use of the website shall be subject to the exclusive jurisdiction of the courts located in Coimbatore, Tamil Nadu.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">9. Contact Information</h2>
              <p className="mb-3">For any questions regarding these Terms, please contact us at:</p>
              <p>Rainbow Paints & Hardwares<br/>54 Cox Street, Kattoor, Coimbatore, 641009<br/>Email: rainbow_paint@hotmail.com<br/>Phone: +91 80724 42930</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
