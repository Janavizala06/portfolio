const fs = require('fs');

const filePath = 'src/data/index.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// Find the projects array
const match = content.match(/export const projects: Project\[\] = \[([\s\S]*?)\];\n\n\/\/ -- Blog \/ Achievements/);

if (match) {
  const arrayContent = match[1];
  
  // A crude way to split by objects
  let items = arrayContent.split(/  },\n  {/);
  
  // Fix the first and last split items
  items[0] = items[0].replace(/^([\s\S]*?){\n/, '{\n');
  items[items.length-1] = items[items.length-1].replace(/\n  }([\s\S]*?)$/, '\n  }');
  
  // Reverse the array
  items = items.reverse();
  
  // Re-assign the 'num' properties so they stay 01, 02, 03...
  items = items.map((item, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    return item.replace(/num: "\d+"/, \
um: "\"\);
  });
  
  // Reconstruct
  const newArrayContent = '\n  ' + items.join(',\n  {') + ',\n';
  const newContent = content.replace(match[1], newArrayContent);
  
  fs.writeFileSync(filePath, newContent);
  console.log('Reversed successfully!');
} else {
  console.log('Match not found!');
}
