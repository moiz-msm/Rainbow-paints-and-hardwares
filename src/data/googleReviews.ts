/**
 * Google Business Profile Integration Configuration
 * 
 * You have two ways to display your real business reviews here:
 * 
 * --- METHOD A: CURATED REVIEWS (Recommended & 100% Free) ---
 * Manually update the "curatedReviews" array below with your genuine Google review text, names, 
 * and dates. Many businesses prefer this because:
 *   1. It is completely free (no Google Cloud API fees).
 *   2. You can showcase more than 5 reviews (the official Google API is strictly capped at returning 5 reviews).
 *   3. You can select reviews that describe specific products/services you sell.
 * 
 * --- METHOD B: LIVE GOOGLE PLACES API FEED ---
 * If you have a Google Cloud Platform account with the "Places API" enabled:
 *   1. In your AI Studio / Production Settings, add your API Key to the GOOGLE_MAPS_PLATFORM_KEY secret.
 *   2. Set "useLiveFeed" to true below.
 *   3. Set "placeId" to your Google Maps Place ID.
 */

export const GOOGLE_REVIEWS_CONFIG = {
  // Toggle this to true to attempt to fetch live reviews from the Google Places API
  useLiveFeed: false,

  // Your Google Maps API Key (preferably set via import.meta.env.VITE_GOOGLE_MAPS_PLATFORM_KEY)
  apiKey: (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY || "",

  // The Place ID for "Rainbow Paint And Hardwares, Coimbatore"
  // You can find your Place ID using the Google Place ID Finder:
  // https://developers.google.com/maps/documentation/places/web-service/place-id
  placeId: "ChIJD_yA0gZZqDoRClXL1cx7v-Y", // Replace with your exact Place ID if needed

  // The direct link to your Google Business Profile review dialog
  reviewLink: "https://www.google.com/search?q=rainbow+paints&sca_esv=515e544df15d7837&authuser=3&sxsrf=ANbL-n6dzgUQhsBrymxw85oK41lAUnhRBw%3A1779974984058&source=hp&ei=SEMYauIL-Iy-vQ-v97LhCQ&biw=361&bih=682&oq=rainbow+paints&gs_lp=EhFtb2JpbGUtZ3dzLXdpei1ocCIOcmFpbmJvdyBwYWludHMyChAAGIAEGEMYigUyERAuGIAEGJECGMcBGIoFGK8BMgsQABiABBiRAhiKBTIFEAAYgAQyERAuGIAEGJECGMcBGIoFGK8BMgUQABiABDIFEAAYgAQyBRAAGIAESOcWUPsMWN4VcAF4AJABAZgBxwKgAasKqgEHMC40LjAuMrgBA8gBAPgBAZgCBqACpgioAhLCAgcQIxgnGOoCwgIQEC4YAxi0AhjqAhiPAdgBAcICEBAAGAMYtAIY6gIYjwHYAQHCAhIQABgDGLQCGOoCGAoYjwHYAQHCAhMQLhgDGLQCGOUEGOoCGI8B2AEBwgINEAAYgAQYsQMYQxiKBcICDhAuGIAEGLEDGNEDGMcBwgIIEAAYgAQYsQOYAxbxBSTDR5daMj4ZugYECAEYCpIHBzEuMy4xLjGgB_tQsgcHMC4zLjEuMbgHjwjCBwcyLTUuMC4xyAcxgAgA&sclient=mobile-gws-wiz-hp#smwie=1&sv=CAESzQEKuQEStgEKd0FNbjMteVMwUDJ4SnU2Q2pKSHZKcExsODNxYl9vNWlZQXQ5a01jYVRFUE9HdGdnVVhHR3VlQXpJNkQydTBYUEtOdExZamdEZ2lSWGtpTGlmaDdFbVg3eVN6ZElOalZHdktIcDM3ZllzUHRyTGViUlVUSklDUjdJEhdVVU1ZYXJ5TEpxV1RzZU1QN2JhRzBBVRoiQUpLTEZtTHVnd1ZhVnRhVTRrVW1uUi1HUUlSYWNIRHdnQRIEODA1MRoBMyoAMAA4AUAAGAAg_OnguAtKAhAC",

  // Your business profile name & details
  businessName: "Rainbow Paint And Hardwares",
  address: "Coimbatore, Tamil Nadu",
  rating: 4.5,
  totalReviewsCount: 50,

  // Curated, beautiful reviews list (Fallback / Curated method)
  curatedReviews: [
    {
      id: "cur-1",
      authorName: "Gayathri Jairam",
      avatarColor: "bg-emerald-600 text-white",
      rating: 5,
      time: "1 month ago",
      text: "I was not physically present there while actually calling them coordinating them asking them to check out the apartment get the painting done. They were so smoothly doing the work they went, they checked, give me an estimate promptly, and handled everything beautifully. Extremely reliable!",
      isLocalGuide: false,
      isVerified: true,
      helpfulCount: 9,
      serviceMentioned: "Apartment Painting"
    },
    {
      id: "cur-2",
      authorName: "Shivakumar Hiremath",
      avatarColor: "bg-indigo-600 text-white",
      rating: 5,
      time: "4 years ago",
      text: "Berger Protecton (Industrial) Dealer in Coimbatore behind Nanjappa Road! One of the top dealers in Coimbatore for Industrial Paints!",
      isLocalGuide: true,
      isVerified: true,
      helpfulCount: 21,
      serviceMentioned: "Berger Protecton"
    },
    {
      id: "cur-3",
      authorName: "Hari Vignesh",
      avatarColor: "bg-amber-600 text-white",
      rating: 5,
      time: "8 months ago",
      text: "Been a customer for more than 5years... great experience and have wide range of products... kind serving staffs. Highly recommend Rainbow Paints!",
      isLocalGuide: true,
      isVerified: true,
      helpfulCount: 16,
      serviceMentioned: "Customer Experience"
    },
    {
      id: "cur-4",
      authorName: "Nazar nazar",
      avatarColor: "bg-blue-600 text-white",
      rating: 5,
      time: "8 months ago",
      text: "Highly Recommended for home painting all leading brands available at wholesale prices.",
      isLocalGuide: false,
      isVerified: true,
      helpfulCount: 7,
      serviceMentioned: "Multi-Brand Paint Dealer"
    },
    {
      id: "cur-5",
      authorName: "chandrikashani chandrikashani",
      avatarColor: "bg-rose-600 text-white",
      rating: 5,
      time: "3 years ago",
      text: "Always good sales, and. Good product. They deal in genuine brands and deliver top customer service.",
      isLocalGuide: true,
      isVerified: true,
      helpfulCount: 4,
      serviceMentioned: "Genuine Products"
    },
    {
      id: "cur-6",
      authorName: "Raghu Venkatnarayan",
      avatarColor: "bg-teal-600 text-white",
      rating: 5,
      time: "4 years ago",
      text: "Very good paint wholesaler. They are extremely cooperative and have complete stock of all industrial and home painting products.",
      isLocalGuide: true,
      isVerified: true,
      helpfulCount: 12,
      serviceMentioned: "Wholesale Paints"
    },
    {
      id: "cur-7",
      authorName: "vidya a",
      avatarColor: "bg-purple-600 text-white",
      rating: 5,
      time: "8 months ago",
      text: "Professional sales person. They guided me in choosing the perfect color combination for our house. Highly satisfied with their recommendations.",
      isLocalGuide: false,
      isVerified: true,
      helpfulCount: 3,
      serviceMentioned: "Sales Assistance"
    },
    {
      id: "cur-8",
      authorName: "Babu mariappan",
      avatarColor: "bg-violet-600 text-white",
      rating: 5,
      time: "4 years ago",
      text: "Good customer care. Prompt replies on WhatsApp and excellent pricing for Berger and Asian Paints.",
      isLocalGuide: true,
      isVerified: true,
      helpfulCount: 5,
      serviceMentioned: "Customer Support"
    }
  ]
};
