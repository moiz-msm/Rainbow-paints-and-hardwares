const fs = require('fs');
let content = fs.readFileSync('src/pages/LocationSEOPage.tsx', 'utf-8');

const injection = `
        <div className="mt-16 text-left max-w-4xl mx-auto bg-black/20 p-8 border border-white/5 rounded-2xl">
          <h2 className="text-2xl font-serif text-gold mb-4">Areas We Serve in & Around Coimbatore</h2>
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              { name: 'RS Puram', slug: 'rs-puram-coimbatore' },
              { name: 'Gandhipuram', slug: 'gandhipuram-coimbatore' },
              { name: 'Peelamedu', slug: 'peelamedu-coimbatore' },
              { name: 'Saibaba Colony', slug: 'saibaba-colony-coimbatore' },
              { name: 'Ramanathapuram', slug: 'ramanathapuram-coimbatore' },
              { name: 'Saravanampatti', slug: 'saravanampatti-coimbatore' },
              { name: 'Thudiyalur', slug: 'thudiyalur-coimbatore' },
              { name: 'Vadavalli', slug: 'vadavalli-coimbatore' },
              { name: 'Singanallur', slug: 'singanallur-coimbatore' },
              { name: 'Kovaipudur', slug: 'kovaipudur-coimbatore' },
              { name: 'Pollachi', slug: 'pollachi' },
              { name: 'Mettupalayam', slug: 'mettupalayam' },
              { name: 'Tiruppur', slug: 'tiruppur' },
            ].map(area => (
              <Link 
                key={area.slug} 
                to={\`/store/\${area.slug}\`}
                className="px-4 py-2 bg-white/5 hover:bg-gold/20 hover:text-gold border border-white/10 rounded-full text-sm transition-colors"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`;

content = content.replace(
  '      </div>\n    </div>\n  );\n}',
  injection
);

fs.writeFileSync('src/pages/LocationSEOPage.tsx', content);
