const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf-8');

// Replace paintHeight with clipPath
content = content.replace(
  'const paintHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);',
  'const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);'
);

// Replace paintTop with paintY
content = content.replace(
  'const paintTop = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);',
  'const paintY = useTransform(scrollYProgress, [0, 1], ["100vh", "0vh"]);'
);

// Replace motion.div style for the background
content = content.replace(
  'style={{ height: paintHeight }}\n          className="absolute bottom-0 left-0 w-full overflow-hidden bg-ivory shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20"',
  'style={{ clipPath }}\n          className="absolute top-0 left-0 w-full h-full overflow-hidden bg-ivory shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20"'
);

// We need to fix the inner content of the second screen. It used to be absolute bottom-0.
// Let's change the inner wrapper to just be h-full since the parent is h-full.
content = content.replace(
  '<div className="absolute bottom-0 left-0 h-[100dvh] min-h-[480px] sm:min-h-[550px] w-full flex flex-col justify-center items-center px-4 sm:px-8 bg-ivory pb-4 sm:pb-6 pt-[80px] sm:pt-[95px] lg:pt-[105px] xl:pt-[115px]">',
  '<div className="h-full w-full flex flex-col justify-center items-center px-4 sm:px-8 bg-ivory pb-4 sm:pb-6 pt-[80px] sm:pt-[95px] lg:pt-[105px] xl:pt-[115px]">'
);

// Fix the roller to use Y instead of top
content = content.replace(
  'style={{ top: paintTop }}',
  'style={{ y: paintY, top: 0 }}'
);

fs.writeFileSync('src/components/Hero.tsx', content);
