interface Point {
  x: number;
  y: number;
}

type TNormalize = (args: {
  value: number;
  min: number;
  max: number;
  scaleMin?: number;
  scaleMax?: number;
}) => number;

export const normalize: TNormalize = ({ value, min, max, scaleMin = 0, scaleMax = 1 }) => {
  if (min === max) return scaleMin;
  return scaleMin + (value - min) * (scaleMax - scaleMin) / (max - min);
};


export const moveTo = (to: Point, from: Point, radius: number): Point => {
  const vector = { x: to.x - from.x, y: to.y - from.y };
  const length = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
  const unitVector = { x: vector.x / length, y: vector.y / length };

  return {
    x: from.x + unitVector.x * radius,
    y: from.y + unitVector.y * radius,
  };
};


type TGetDistanceBetween = (p1: Point, p2: Point) => number;
export const getDistanceBetween: TGetDistanceBetween = (p1, p2) => (
  Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
);


type TCollinearPoints = (p1: Point, p2: Point, p3: Point) => boolean;
export const checkForCollinearPoints : TCollinearPoints = (p1, p2, p3) => (
  (p1.y - p2.y) * (p1.x - p3.x) === (p1.y - p3.y) * (p1.x - p2.x)
);


export const generateId = () => Math.round(Math.random() * Math.pow(10, 16));