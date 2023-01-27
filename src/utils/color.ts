import Color from 'color';

export const RGBAtoRGB = (color: Color, by: number) => {
  const a = color.alpha();
  return [
    Math.round(((1 - a) * by) + (a * color.red())),
    Math.round(((1 - a) * by) + (a * color.green())),
    Math.round(((1 - a) * by) + (a * color.blue())),
  ];
};
