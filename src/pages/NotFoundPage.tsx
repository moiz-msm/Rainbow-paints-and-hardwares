import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <SEO 
        title="404 - Page Not Found"
        description="The page you are looking for does not exist."
      />
      
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
        <ShieldAlert className="w-10 h-10 text-red-500" />
      </div>
      
      <h1 className="text-4xl sm:text-6xl font-display font-bold text-gold mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-display font-semibold text-zinc-100 mb-6">Page Not Found</h2>
      
      <p className="text-zinc-400 font-sans max-w-md mx-auto mb-10 leading-relaxed">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      
      <Link 
        to="/"
        className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-zinc-900 px-6 py-3 rounded-lg font-bold transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
}
