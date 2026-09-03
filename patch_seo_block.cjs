const fs = require('fs');

let content = fs.readFileSync('src/components/CategorySeoBlock.tsx', 'utf-8');

const target = `  // Map duplicate names based on exact URL params/filter names`;
const replacement = `    'Power Tools': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Professional <span className="text-gold">Power Tools</span> & Equipment
        </h2>
        <p className="mb-4">
          Upgrade your painting and surface preparation workflow with high-performance <strong>power tools</strong>. We offer a selection of industrial-grade tools designed for professional painters and contractors. From heavy-duty sanders and pressure washers to automated paint sprayers and laser distance meters, these tools guarantee efficiency and precision on the job site.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Genuine Tools & <span className="text-gold">Manufacturer Warranty</span>
        </h3>
        <p className="mb-4">
          All our power tools are sourced directly from authorized manufacturers like Asian Paints TruCare and Bosch, ensuring you receive genuine equipment backed by standard warranties. Whether you are scaling up your contracting business or taking on a massive DIY project, our tools provide the reliability you need.
        </p>
      </>
    ),
  };

  // Map duplicate names based on exact URL params/filter names
  contentMap['Tools'] = contentMap['Painting Tools'];
  contentMap['Primer'] = contentMap['Undercoats'];
  contentMap['Industrial'] = contentMap['Epoxy Coatings'];`;

content = content.replace(/  };\n\n  \/\/ Map duplicate names based on exact URL params\/filter names/, replacement);

fs.writeFileSync('src/components/CategorySeoBlock.tsx', content);

console.log("Updated CategorySeoBlock.tsx to include Power Tools and mappings!");
