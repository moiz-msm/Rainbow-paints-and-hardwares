const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

// Replace useParams and Link
content = content.replace(
  'import { useParams, Link } from "react-router-dom";',
  'import { useParams, Link, useNavigate } from "react-router-dom";'
);

// Replace state setup
content = content.replace(
  '  const { shadeSlug } = useParams<{ shadeSlug: string }>();\n  const [shade, setShade] = useState<Shade | null>(null);\n  const [loading, setLoading] = useState(true);',
  `  const { brandSlug, familySlug, shadeSlug } = useParams<{ brandSlug?: string; familySlug?: string; shadeSlug: string }>();
  const navigate = useNavigate();
  const [shade, setShade] = useState<Shade | null>(null);
  const [loading, setLoading] = useState(true);`
);

// Replace loadShade logic
const targetLoadShade = `    async function loadShade() {
      setLoading(true);
      if (shadeSlug) {
        const found = await shadeService.getShadeBySlug(shadeSlug);
        if (found) {
          setShade(found);
        } else {
          setShade(null);
        }
      }
      setLoading(false);
    }
    loadShade();
  }, [shadeSlug]);`;

const replacementLoadShade = `    async function loadShade() {
      setLoading(true);
      if (shadeSlug) {
        const found = await shadeService.getShadeBySlug(shadeSlug);
        if (found) {
          setShade(found);
          const properUrl = shadeService.getShadeUrl(found);
          if (window.location.pathname !== properUrl) {
            navigate(properUrl, { replace: true });
          }
        } else {
          setShade(null);
        }
      }
      setLoading(false);
    }
    loadShade();
  }, [shadeSlug, navigate]);`;

content = content.replace(targetLoadShade, replacementLoadShade);

// Replace Breadcrumb schema to include brand and family
const targetBreadcrumbSchema = `  const breadcrumbSchema = useMemo(() => {
    if (!shade) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rainbowpaint.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Colors",
          item: "https://rainbowpaint.in/visualizer",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: \`\${shade.brand} \${shade.name}\`,
          item: \`https://rainbowpaint.in/color/\${shadeSlug}\`,
        },
      ],
    };
  }, [shade, shadeSlug]);`;

const replacementBreadcrumbSchema = `  const breadcrumbSchema = useMemo(() => {
    if (!shade) return null;
    const properUrl = \`https://rainbowpaint.in\${shadeService.getShadeUrl(shade)}\`;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rainbowpaint.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Colors",
          item: "https://rainbowpaint.in/visualizer",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: shade.brand,
          item: \`https://rainbowpaint.in/brands/\${shade.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: shade.family || "Colors",
          item: "https://rainbowpaint.in/visualizer", // We don't have a family-specific page yet, so link back to visualizer
        },
        {
          "@type": "ListItem",
          position: 5,
          name: \`\${shade.name} \${shade.shadeCode}\`,
          item: properUrl,
        },
      ],
    };
  }, [shade]);`;

content = content.replace(targetBreadcrumbSchema, replacementBreadcrumbSchema);

// URL in SEO
content = content.replace(
  'url={`https://rainbowpaint.in/color/${shadeSlug}`}',
  'url={`https://rainbowpaint.in${shadeService.getShadeUrl(shade)}`}'
);

// Breadcrumb visual output in component
const targetVisualBreadcrumbs = `        <div className="flex items-center text-sm text-ivory/60 mb-8 space-x-2">
          <Link to="/" className="hover:text-gold transition">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to="/visualizer" className="hover:text-gold transition">
            Colors
          </Link>
          <ChevronRight size={14} />
          <span className="text-ivory font-medium">{shade.brand}</span>
          <ChevronRight size={14} />
          <span className="text-gold font-medium">{shade.name}</span>
        </div>`;

const replacementVisualBreadcrumbs = `        <div className="flex flex-wrap items-center text-xs sm:text-sm text-ivory/60 mb-8 space-x-1 sm:space-x-2">
          <Link to="/" className="hover:text-gold transition whitespace-nowrap">Home</Link>
          <ChevronRight size={14} className="flex-shrink-0" />
          <Link to="/visualizer" className="hover:text-gold transition whitespace-nowrap">Colors</Link>
          <ChevronRight size={14} className="flex-shrink-0" />
          <Link to={\`/brands/\${shade.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\`} className="hover:text-gold transition whitespace-nowrap">{shade.brand}</Link>
          <ChevronRight size={14} className="flex-shrink-0" />
          <span className="text-ivory font-medium whitespace-nowrap">{shade.family || "Colors"}</span>
          <ChevronRight size={14} className="flex-shrink-0" />
          <span className="text-gold font-medium whitespace-nowrap">{shade.name} {shade.shadeCode}</span>
        </div>`;

content = content.replace(targetVisualBreadcrumbs, replacementVisualBreadcrumbs);

// also update the similar shade links
content = content.replace(
  'to={`/color/${shadeService.generateSlug(s)}`}',
  'to={shadeService.getShadeUrl(s)}'
);
content = content.replace(
  'to={`/color/${shadeService.generateSlug(s)}`}',
  'to={shadeService.getShadeUrl(s)}'
);


fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
