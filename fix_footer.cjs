const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf-8');

const target = `        <div className="sr-only">
          <h3>Popular Local Searches</h3>
          <div>
            <Link to="/store/coimbatore">Paint store near me</Link>
            <Link to="/brands/asian-paints">Asian Paints dealer Coimbatore</Link>
            <Link to="/brands/berger-paints">Berger dealer near me</Link>
            <Link to="/store/coimbatore">Paint dealer near me</Link>
            <Link to="/brands/dr-fixit">Dr Fixit waterproofing dealer</Link>
            <Link to="/store/coimbatore">Best paint shop in Coimbatore</Link>
            <Link to="/c/interior-paints">Interior wall paint shop</Link>
            <Link to="/c/exterior-paints">Exterior house paint Coimbatore</Link>
            <Link to="/c/metals-and-grills">Metals and grills paint</Link>
            <Link to="/c/pu-coatings">PU Coatings Coimbatore</Link>
            <Link to="/c/epoxy-coatings">Epoxy Coatings Coimbatore</Link>
            <Link to="/c/synthetic-enamels">Synthetic Enamels</Link>
          </div>
        </div>`;

const replacement = `        <div className="pt-8 mt-12 border-t border-gold/10">
          <h3 className="text-ivory font-serif text-lg mb-4">Popular Searches in Coimbatore</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500">
            <Link to="/store/coimbatore" className="hover:text-gold transition">Paint store near me</Link>
            <Link to="/store/rs-puram-coimbatore" className="hover:text-gold transition">Paint Shop in RS Puram</Link>
            <Link to="/store/gandhipuram-coimbatore" className="hover:text-gold transition">Gandhipuram Paint Dealer</Link>
            <Link to="/store/saravanampatti-coimbatore" className="hover:text-gold transition">Saravanampatti Paint Store</Link>
            <Link to="/store/saibaba-colony-coimbatore" className="hover:text-gold transition">Saibaba Colony Paints</Link>
            <Link to="/brands/asian-paints" className="hover:text-gold transition">Asian Paints dealer Coimbatore</Link>
            <Link to="/brands/berger-paints" className="hover:text-gold transition">Berger dealer near me</Link>
            <Link to="/brands/dr-fixit" className="hover:text-gold transition">Dr Fixit dealer in Coimbatore</Link>
            <Link to="/brands/mrf-vapocure" className="hover:text-gold transition">MRF Vapocure Paint dealer</Link>
            <Link to="/c/interior-paints" className="hover:text-gold transition">Interior wall paint shop</Link>
            <Link to="/c/exterior-paints" className="hover:text-gold transition">Exterior house paint Coimbatore</Link>
            <Link to="/c/pu-coatings" className="hover:text-gold transition">PU Coatings Coimbatore</Link>
            <Link to="/c/epoxy-coatings" className="hover:text-gold transition">Epoxy Coatings Coimbatore</Link>
          </div>
        </div>`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/Footer.tsx', content);
