import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-royale-bg min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-royale-surface rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as your name, email address, phone number, shipping address, and payment information when you make a purchase.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to fulfill your orders, communicate with you about your orders, improve our website, and send promotional materials (only if you opt-in).</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Information Sharing</h2>
              <p>We do not sell or rent your personal information to third parties. We may share information with trusted delivery partners to facilitate your order shipment and with secure payment gateways to process transactions.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Security</h2>
              <p>We implement reasonable security measures to protect your personal data. All payment transactions are encrypted using secure socket layer technology (SSL).</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
