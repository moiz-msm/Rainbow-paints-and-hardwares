import React from 'react';
import SEO from '../components/SEO';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-royale-bg min-h-screen pt-24 pb-12">
      <SEO 
        title="Privacy Policy | Rainbow Paints & Hardwares"
        description="Read our Privacy Policy to understand how Rainbow Paints & Hardwares collects and protects your personal data."
        url="https://rainbowpaint.in/privacy"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-royale-surface rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-zinc-600 mb-8">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <div className="space-y-8 text-gray-700 leading-relaxed font-light">
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">1. Introduction</h2>
              <p className="mb-3">Rainbow Paints & Hardwares ("we", "our", "us") values your privacy. This Privacy Policy outlines how we collect, use, process, and protect your personal information when you visit or make a purchase from our website (rainbowpaint.in).</p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">2. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Personal Data:</strong> Name, billing address, shipping address, email address, and phone number provided during checkout or account registration.</li>
                <li><strong>Payment Data:</strong> Payment details are processed securely by our trusted payment gateway partners. We do not store your full credit card or UPI details on our servers.</li>
                <li><strong>Log Data & Cookies:</strong> We collect device information, IP addresses, browser types, and usage data via cookies to improve site performance and analytics.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">3. How We Use Your Information</h2>
              <p className="mb-3">We use the collected data for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To fulfill and manage orders, deliveries, and payments.</li>
                <li>To communicate with you regarding your order status, inquiries, and customer support.</li>
                <li>To screen orders for potential risk or fraud.</li>
                <li>To improve our website's functionality and user experience.</li>
                <li>To send marketing communications (only if you have opted in to receive them).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">4. Information Sharing & Disclosure</h2>
              <p className="mb-3">We respect your privacy and do not sell your personal data. We may share your information only in these situations:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Service Providers:</strong> With delivery partners and payment processors to fulfill your order.</li>
                <li><strong>Legal Compliance:</strong> When required by law, subpoena, or other legal processes to protect our rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">5. Data Security</h2>
              <p className="mb-3">We implement industry-standard administrative, technical, and physical security measures to protect your personal information. All sensitive transactions are transmitted over Secure Socket Layer (SSL) encryption.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">6. Your Rights</h2>
              <p className="mb-3">You have the right to access, correct, or request deletion of your personal data stored with us. You may also opt out of marketing communications at any time. To exercise these rights, contact our support team.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">7. Changes to This Policy</h2>
              <p className="mb-3">We reserve the right to update this Privacy Policy at any time to reflect changes to our practices or for other operational, legal, or regulatory reasons. Updates will be posted on this page.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3 border-b border-gray-100 pb-2">8. Contact Us</h2>
              <p className="mb-3">For more information about our privacy practices or if you have questions, please contact us at:</p>
              <p>Rainbow Paints & Hardwares<br/>54 Cox Street, Kattoor, Coimbatore, 641009<br/>Email: rainbow_paint@hotmail.com<br/>Phone: +91 80724 42930</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
