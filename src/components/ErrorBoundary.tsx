import React, { Component, ErrorInfo, ReactNode } from "react";
import { ShieldAlert, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-royale-bg text-ivory flex flex-col items-center justify-center px-4 py-20 text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-gold mb-4">Something went wrong</h1>
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-zinc-100 mb-6">We're sorry for the inconvenience</h2>
          
          <p className="text-zinc-600 font-sans max-w-md mx-auto mb-10 leading-relaxed">
            An unexpected error occurred. Please try reloading the page or return home.
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-zinc-900 px-6 py-3 rounded-lg font-bold transition-colors"
            >
              <RefreshCcw className="w-5 h-5" />
              Reload Page
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center gap-2 bg-royale-surface border border-zinc-200 hover:bg-zinc-800 text-ivory px-6 py-3 rounded-lg font-bold transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
