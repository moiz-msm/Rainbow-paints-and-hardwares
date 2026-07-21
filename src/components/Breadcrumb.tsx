import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]; 
  className?: string; 
}

export default function Breadcrumb({ items, className = 'text-zinc-600' }: BreadcrumbProps) {
  const location = useLocation();

  let breadcrumbItems: BreadcrumbItem[] = [];

  if (items && items.length > 0) {
    breadcrumbItems = items;
  } else {
    // Generate dynamically from path
    const pathnames = location.pathname.split('/').filter((x) => x);
    breadcrumbItems.push({ label: 'Home', href: '/' });
    
    let routeTo = '';
    pathnames.forEach((name, index) => {
      routeTo += `/${name}`;
      const isLast = index === pathnames.length - 1;
      
      // format name (replace dashes with spaces, title case)
      let formattedName = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      // Specific overrides
      if (name.toLowerCase() === 'p') formattedName = 'Product';
      if (name.toLowerCase() === 'faqs') formattedName = 'FAQs';
      if (name.toLowerCase() === 'buy-paint-online') formattedName = 'Products';

      breadcrumbItems.push({
        label: formattedName,
        href: isLast ? undefined : routeTo
      });
    });
  }

  // Generate schema.org JSON-LD for SEO
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://www.rainbowpaint.in${item.href}` : `https://www.rainbowpaint.in${location.pathname}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
      <nav aria-label="breadcrumb" className={`flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-sans mb-6 uppercase tracking-wider ${className}`}>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return (
            <div key={index} className="flex items-center gap-1.5 sm:gap-2">
              {index > 0 && <ChevronRight className="w-3 h-3 opacity-50" />}
              {isLast || !item.href ? (
                <span className="font-semibold text-current opacity-90 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="opacity-70 hover:opacity-100 hover:text-gold transition-colors inline-flex items-center gap-1">
                  {index === 0 && <Home className="w-3 h-3 mb-0.5 inline-block" />}
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
