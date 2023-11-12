'use client';
import React, { useEffect, useMemo } from 'react';

import { generateId, normalize } from './helper/math';
import { generateAutoDrawCss, normalizeDataset } from './helper/misc';
import { buildLinearPath, buildSmoothPath, injectStyleTag } from './helper/dom';


export interface TrendLineProps {
  data: (number | { value: number })[];
  smooth?: boolean;
  autoDraw?: boolean;
  autoDrawDuration?: number;
  autoDrawEasing?: string;
  width?: number;
  height?: number;
  padding?: number;
  radius?: number;
  gradient: string[];
}

const TrendLine = ({
  data, smooth, autoDraw = false, autoDrawDuration = 2000, autoDrawEasing = 'ease', 
  width, height, padding = 8, radius = 10, gradient,
} : TrendLineProps) => {
  

  const trendId = useMemo(() => generateId(), []);

  useEffect(() => {
    if (autoDraw) {
      const path: SVGPathElement | null = document.querySelector(`#chaya-trendLine-${trendId}`);
      if (path) {
        const totalLength = path?.getTotalLength();

        const css = generateAutoDrawCss({
          id: trendId,
          lineLength: totalLength,
          duration: autoDrawDuration,
          easing: autoDrawEasing,
        });

        injectStyleTag(css);
      }
    }
  }, [data, gradient, smooth, autoDraw]);

  const renderGradientDefinition = () => {
    return (
      <defs>
        <linearGradient
          id={`chaya-trendLine-gradient-${trendId}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          {gradient?.slice().reverse().map((c, index) => (
            <stop
              key={index}
              offset={normalize({
                value: index,
                min: 0,
                max: gradient.length - 1 || 1,
              })}
              stopColor={c}
            />
          ))}
        </linearGradient>
      </defs>
    );
  };

  if (!data || data.length < 2) {
    return null;
  }

  const plainValues = data.map((point) =>
    typeof point === 'number' ? point : point.value,
  );

  const viewBoxWidth = width || 300;
  const viewBoxHeight = height || 75;
  const svgWidth = width || '100%';
  const svgHeight = height || '100%';

  const normalizedValues = normalizeDataset(plainValues, {
    minX: padding,
    maxX: viewBoxWidth - padding,
    minY: viewBoxHeight - padding,
    maxY: padding,
  });

  let path = smooth
    ? buildSmoothPath(normalizedValues, { radius })
    : buildLinearPath(normalizedValues);


  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
    >
      {gradient && renderGradientDefinition()}

      <path
        ref={(elem) => (path = elem)}
        id={`chaya-trendLine-${trendId}`}
        d={path}
        fill="none"
        stroke={gradient ? `url(#chaya-trendLine-gradient-${trendId})` : undefined}
      />
    </svg>
  );
};

export default TrendLine;
