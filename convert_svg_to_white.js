const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'src/assets/img/casino/icons');

// Get all SVG files
const svgFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));

console.log(`Found ${svgFiles.length} SVG files to process`);

svgFiles.forEach(file => {
    const filePath = path.join(iconsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // First, preserve fill="none" and stroke="none" by temporarily replacing them
    content = content.replace(/fill="none"/g, 'FILL_NONE_PLACEHOLDER');
    content = content.replace(/fill='none'/g, 'FILL_NONE_PLACEHOLDER2');
    content = content.replace(/stroke="none"/g, 'STROKE_NONE_PLACEHOLDER');
    content = content.replace(/stroke='none'/g, 'STROKE_NONE_PLACEHOLDER2');
    
    // Replace fill colors in fill attribute (fill="color" or fill='color')
    content = content.replace(/fill="[^"]*"/g, 'fill="white"');
    content = content.replace(/fill='[^']*'/g, "fill='white'");
    
    // Replace fill colors in style attribute (style="...fill:color..." or style="...fill: color...")
    content = content.replace(/style="([^"]*)"/g, (match, styleContent) => {
        return `style="${styleContent.replace(/fill:\s*[^;]+/g, 'fill:white')}"`;
    });
    content = content.replace(/style='([^']*)'/g, (match, styleContent) => {
        return `style='${styleContent.replace(/fill:\s*[^;]+/g, 'fill:white')}'`;
    });
    
    // Replace stroke colors in stroke attribute
    content = content.replace(/stroke="[^"]*"/g, 'stroke="white"');
    content = content.replace(/stroke='[^']*'/g, "stroke='white'");
    
    // Replace stroke colors in style attribute
    content = content.replace(/style="([^"]*)"/g, (match, styleContent) => {
        return `style="${styleContent.replace(/stroke:\s*[^;]+/g, 'stroke:white')}"`;
    });
    content = content.replace(/style='([^']*)'/g, (match, styleContent) => {
        return `style='${styleContent.replace(/stroke:\s*[^;]+/g, 'stroke:white')}'`;
    });
    
    // Restore fill="none" and stroke="none"
    content = content.replace(/FILL_NONE_PLACEHOLDER/g, 'fill="none"');
    content = content.replace(/FILL_NONE_PLACEHOLDER2/g, "fill='none'");
    content = content.replace(/STROKE_NONE_PLACEHOLDER/g, 'stroke="none"');
    content = content.replace(/STROKE_NONE_PLACEHOLDER2/g, "stroke='none'");
    
    // Write back
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed: ${file}`);
});

console.log('Done!');

