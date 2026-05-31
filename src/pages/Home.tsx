import React from "react";
import Hero from "../components/Hero";
import BrandsDealIn from "../components/BrandsDealIn";
import ProductsAndIndustrial from "../components/ProductsAndIndustrial";
import ContactSection from "../components/ContactSection";
import FaqSection from "../components/FaqSection";

import BlogSection from "../components/BlogSection";
import FreeSampleSection from "../components/FreeSampleSection";
import ToolsOverview from "../components/ToolsOverview";
import GoogleReviewsSection from "../components/GoogleReviewsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandsDealIn />
      <ProductsAndIndustrial />
      <ToolsOverview />
      <FreeSampleSection />
      <BlogSection />
      <GoogleReviewsSection />
      <FaqSection showLink={true} limit={4} />
      <ContactSection />
    </>
  );
}
