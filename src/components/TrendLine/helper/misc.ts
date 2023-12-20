import { normalize } from './math';

export const normalizeDataset = (data: number[], { minX, maxX, minY, maxY }:{
  minX: number, maxX: number, minY: number, maxY: number
}) : { x: number, y: number }[] => {

  const boundariesX = { min: 0, max: data.length - 1 };
  const boundariesY = { min: Math.min(...data), max: Math.max(...data) };

  const normalizedData = data.map((point, index) => ({
    x: normalize({
      value: index,
      min: boundariesX.min,
      max: boundariesX.max,
      scaleMin: minX,
      scaleMax: maxX,
    }),
    y: normalize({
      value: point,
      min: boundariesY.min,
      max: boundariesY.max,
      scaleMin: minY,
      scaleMax: maxY,
    }),
  }));

  if (boundariesY.min === boundariesY.max) normalizedData[0].y += 0.0001;

  return normalizedData;
};


export const generateAutoDrawCss = ({ id, lineLength, duration, easing } : {
  id: number, lineLength: number, duration: number, easing: string
}) => {

  const autodrawKeyframeAnimation = `
    @keyframes react-trend-autodraw-${id} {
      0% {
        stroke-dasharray: ${lineLength};
        stroke-dashoffset: ${lineLength}
      }
      100% {
        stroke-dasharray: ${lineLength};
        stroke-dashoffset: 0;
      }
      100% {
        stroke-dashoffset: '';
        stroke-dasharray: '';
      }
    }
  `;

  const cleanupKeyframeAnimation = `
    @keyframes react-trend-autodraw-cleanup-${id} {
      to {
        stroke-dasharray: '';
        stroke-dashoffset: '';
      }
    }
  `;

  return `
    ${autodrawKeyframeAnimation}

    ${cleanupKeyframeAnimation}

    #react-trend-${id} {
      animation:
        react-trend-autodraw-${id} ${duration}ms ${easing},
        react-trend-autodraw-cleanup-${id} 1ms ${duration}ms
      ;
    }
  `;
};