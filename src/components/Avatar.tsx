'use client';
import React, { useState } from 'react';

import mcs from '../utils/merge';

export type AvatarProps = {
  alt: string,
  src?: string | null,
  size?: number | string,
  id?: string,
  className?: string,
  title?: string,
};

const Avatar = ({ alt, src, size = 64, id, className = '', title }: AvatarProps) => {

  const [show, setShow] = useState(false);

  const getName = () => {
    const altText = alt?.trim() || '';
    const words = altText.split(' ');
    if (words.length > 1) return altText[0] + words[words.length - 1][0];
    else if (altText.length > 1) return altText[0] + altText[1];
    return altText[0] || '';
  };

  const renderPlaceholder = () => (
    <svg
      id={id}
      className={mcs('avatar-placeholder rounded-lg', className)}
      width={size}
      height={size}
      viewBox="0 0 75 75"
      preserveAspectRatio="xMinYMid meet"
      style={{ backgroundColor: '#ddd' }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="#222"
        fontSize="40"
        fontWeight="500"
      >
        {getName()?.toUpperCase()}
      </text>
    </svg>
  );

  return !(src?.length) || show ? renderPlaceholder() : (
    <img
      className={mcs('avatar rounded-lg border dark:border-gray-500/70 border-gray-500/10', className)}
      height={size}
      width={size}
      title={title}
      id={id}
      alt={alt}
      draggable="false"
      src={src}
      onError={() => setShow(true)}
      onLoad={() => setShow(false)}
    />
  );
};

export default Avatar;
