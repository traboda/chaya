import React, { useState } from 'react';
import clsx from 'clsx';

type AvatarProps = {
  alt: string,
  src: string,
  size?: number | string,
  id?: string,
  className?: string,
  title?: string,
};

const Avatar = ({ alt, src, size = undefined, id, className = '', title }: AvatarProps) => {

  const [show, setShow] = useState(false);

  const getName = () => {
    const Alter = (alt?.trim() || '');
    const words = Alter.split(' ');
    if (words.length > 1) return Alter[0] + words[words.length - 1][0];
    else if (Alter.length > 1) return Alter[0] + Alter[1];
    return Alter[0] || '';
  };

  const renderPlaceholder = () => (
      <svg
          id={id}
          className={clsx('dsr-rounded-lg', className)}
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
              dominantBaseline="middle"
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
          className={clsx('dsr-rounded-lg', className)}
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
