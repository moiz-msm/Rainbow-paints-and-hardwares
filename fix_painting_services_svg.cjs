const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'PaintingServicesOverview.tsx');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  const oldCardRegex = /<Link[\s\S]*?className="group relative rounded-2xl border border-gold\/20 shadow-sm hover:shadow-xl hover:border-gold\/60 hover:-translate-y-1 transition-all duration-300 flex overflow-hidden aspect-\[4\/5\]"[\s\S]*?>[\s\S]*?<div className="absolute inset-0">[\s\S]*?<\/div>\s*<div className="relative z-10 w-full p-5 flex flex-col justify-end">[\s\S]*?<\/div>\s*<\/Link>/;

  const newCard = `<Link
                key={index}
                to={service.link}
                className={\`group relative rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden aspect-[4/5] \${service.color}\`}
              >
                <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                  <Icon className="w-24 h-24 text-current opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" strokeWidth={1} />
                </div>
                <div className="relative z-10 w-full p-5 flex flex-col justify-end bg-white/40 backdrop-blur-sm border-t border-white/50 mt-auto">
                   <div className="flex flex-col gap-3">
                     <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm text-current group-hover:scale-110 transition-transform">
                       <Icon className="w-5 h-5" />
                     </div>
                     <h3 className="text-lg font-bold font-serif leading-tight text-slate-800">{service.title}</h3>
                   </div>
                </div>
              </Link>`;
              
  content = content.replace(oldCardRegex, newCard);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed cards in PaintingServicesOverview.tsx');
}
