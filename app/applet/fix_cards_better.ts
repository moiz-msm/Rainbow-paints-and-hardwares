import fs from 'fs';

function replaceInFile(filePath: string, replacements: [RegExp | string, string][]) {
    if (!fs.existsSync(filePath)) {
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [searchValue, replaceValue] of replacements) {
        content = content.replaceAll(searchValue, replaceValue);
    }
    fs.writeFileSync(filePath, content);
}

const files = [
    'src/components/BlogSection.tsx',
    'src/components/BrandsDealIn.tsx',
    'src/components/CalculatorSection.tsx',
    'src/components/CartDrawer.tsx',
    'src/components/ContactSection.tsx',
    'src/components/FaqSection.tsx',
    'src/components/Footer.tsx',
    'src/components/FreeSampleSection.tsx',
    'src/components/Header.tsx',
    'src/components/Hero.tsx',
    'src/components/OfferPopup.tsx',
    'src/components/ProductAssistant.tsx',
    'src/components/ProductSearchInput.tsx',
    'src/components/ProductsAndIndustrial.tsx',
    'src/components/ProductsSection.tsx',
    'src/components/ScrollToTop.tsx',
    'src/components/ToolsOverview.tsx',
    'src/components/VisualizerSection.tsx',
    'src/components/WhatsappIcon.tsx',
    'src/pages/AboutPage.tsx',
    'src/pages/CalculatorPage.tsx',
    'src/pages/CheckoutPage.tsx',
    'src/pages/FaqPage.tsx',
    'src/pages/Home.tsx',
    'src/pages/MyOrdersPage.tsx',
    'src/pages/OrderDetailsPage.tsx',
    'src/pages/OrderFailedPage.tsx',
    'src/pages/OrderSuccessPage.tsx',
    'src/pages/PaymentPage.tsx',
    'src/pages/PrivacyPolicyPage.tsx',
    'src/pages/ProductsPage.tsx',
    'src/pages/TermsPage.tsx',
    'src/pages/VisualizerPage.tsx'
];

files.forEach(file => replaceInFile(file, [
    // Non-hover bg-black/5 -> bg-white shadow-sm border border-zinc-200
    [/(?<!hover:)bg-black\/5/g, 'bg-white shadow-sm border border-zinc-200'],
    [/(?<!hover:)bg-black\/10/g, 'bg-zinc-50 border border-zinc-200'],
    // Fix redundancy
    [/border border-zinc-200 border border-black\/10/g, 'border border-zinc-200'],
    [/border border-zinc-200 border border-zinc-200/g, 'border border-zinc-200'],
    [/border border-zinc-200 border-zinc-200/g, 'border border-zinc-200'],
    [/border border-zinc-200 border-zinc-100/g, 'border border-zinc-200'],
    [/(?<!hover:)border-black\/10/g, 'border-zinc-200'],
    [/(?<!hover:)border-black\/5/g, 'border-zinc-200'],
]));

console.log("Done");
