const fs = require('fs');
const { generateLogo } = require('./index.js');

describe('generateLogo', () => {
  it('should create an SVG file with the correct content', () => {
    // Sets up
    const text = 'ABC';
    const textColor = 'red';
    const shape = 'square';
    const shapeColor = 'green';

    // Invokes
    generateLogo(text, textColor, shape, shapeColor);

    // Checks
    const svg = fs.readFileSync('logo.svg', 'utf8');
    expect(svg).toContain(`<rect x="0" y="0" width="100%" height="100%" fill="${shapeColor}"/>`);
    expect(svg).toContain(`<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}">${text}</text>`);
  });
});