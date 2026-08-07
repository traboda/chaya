import { ColorInstance } from 'color';

export const RGBAtoRGB = (color: ColorInstance, by: number) => {
  const a = color.alpha();
  return [
    Math.round((1 - a) * by + a * color.red()),
    Math.round((1 - a) * by + a * color.green()),
    Math.round((1 - a) * by + a * color.blue()),
  ];
};
