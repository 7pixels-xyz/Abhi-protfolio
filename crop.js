const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  const input = 'public/abhi.jpg';
  const size = 512;

  // Create a circular SVG mask
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" />
    </svg>`
  );

  await sharp(input)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png()
    .toFile('src/app/icon.png');

  // Clean up the square JPG we copied earlier
  if (fs.existsSync('src/app/icon.jpg')) {
    fs.unlinkSync('src/app/icon.jpg');
  }
}

processImage().then(() => console.log("Done")).catch(console.error);
