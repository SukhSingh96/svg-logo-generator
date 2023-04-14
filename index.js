const fs = require('fs');
const readlineSync = require('readline-sync');

function generateLogo() {
  const text = readlineSync.question('Enter up to three characters for the logo text: ', {
    limit: /^.{1,3}$/ // Limit to 1-3 characters
  });
  const textColor = readlineSync.question('Enter the text color for your logo: ');
  const shapeOptions = ['circle', 'triangle', 'square'];
  const shapeIndex = readlineSync.keyInSelect(shapeOptions, 'Choose a shape:');
  if (shapeIndex === -1) {
    console.log('You must choose a shape.');
    return;
  }
  const shape = shapeOptions[shapeIndex];
  const shapeColor = readlineSync.question('Enter the shape color for your logo: ');

  const svg = getSvg(text, textColor, shape, shapeColor);

  fs.writeFileSync('logo.svg', svg);
  console.log('Generated logo.svg');
}

function getSvg(text, textColor, shape, shapeColor) {
  switch (shape) {
    case 'circle':
      return getCircleSvg(text, textColor, shapeColor);
    case 'triangle':
      return getTriangleSvg(text, textColor, shapeColor);
    case 'square':
      return getSquareSvg(text, textColor, shapeColor);
    default:
      throw new Error(`Invalid shape: ${shape}`);
  }
}

function getCircleSvg(text, textColor, shapeColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    <circle cx="50%" cy="50%" r="45%" fill="${shapeColor}" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}">${text}</text>
  </svg>`;
}

function getTriangleSvg(text, textColor, shapeColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    <polygon points="50%,20% 80%,80% 20%,80%" fill="${shapeColor}" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}">${text}</text>
  </svg>`;
}

function getSquareSvg(text, textColor, shapeColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    <rect x="0" y="0" width="100%" height="100%" fill="${shapeColor}" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}">${text}</text>
  </svg>`;
}

generateLogo();