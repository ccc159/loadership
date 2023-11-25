export const getReverseColor = (color: string) => {
  // Remove any leading '#' from the color string
  color = color.replace(/^#/, '');

  // Parse the hex color code into RGB components
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Calculate the reverse color by subtracting each component from 255
  const reverseR = 255 - r;
  const reverseG = 255 - g;
  const reverseB = 255 - b;

  // Convert the reverse RGB components back to a hex color code
  const reverseColor = '#' + reverseR.toString(16).padStart(2, '0') + reverseG.toString(16).padStart(2, '0') + reverseB.toString(16).padStart(2, '0');

  return reverseColor;
};

// generate random id in 5 characters, uppercase letters only; for eg: AXCDF
export const generateShortID = () => {
  let id = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 5; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
};
