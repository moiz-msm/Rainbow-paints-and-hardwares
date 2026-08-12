const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'PaintingServicesOverview.tsx');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove the header paragraph
  content = content.replace(
    /<p className="text-\[10px\] sm:text-xs text-\[#1A365D\]\/70 max-w-xl mx-auto font-sans font-light leading-relaxed">[\s\S]*?<\/p>/,
    ''
  );

  // Replace the card rendering
  const oldCardRegex = /<Link[\s\S]*?to=\{service\.link\}[\s\S]*?className="group bg-white rounded-2xl border border-royale-accent\/40 shadow-sm hover:shadow-xl hover:border-gold\/40 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"[\s\S]*?>[\s\S]*?<div className="h-48 overflow-hidden relative">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div className="p-6 flex flex-col flex-grow">[\s\S]*?<\/div>\s*<\/Link>/;

  const newCard = `<Link
                key={index}
                to={service.link}
                className="group relative rounded-2xl border border-gold/20 shadow-sm hover:shadow-xl hover:border-gold/60 hover:-translate-y-1 transition-all duration-300 flex overflow-hidden aspect-[4/5]"
              >
                <div className="absolute inset-0">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                </div>
                <div className="relative z-10 w-full p-5 flex flex-col justify-end">
                   <div className="flex flex-col gap-3">
                     <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 text-white group-hover:bg-gold group-hover:border-gold transition-colors shadow-lg">
                       <Icon className="w-5 h-5" />
                     </div>
                     <h3 className="text-lg font-bold font-serif text-white leading-tight">{service.title}</h3>
                   </div>
                </div>
              </Link>`;
              
  content = content.replace(oldCardRegex, newCard);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed cards in PaintingServicesOverview.tsx');
}
