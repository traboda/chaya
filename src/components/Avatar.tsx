import React, { useState } from 'react';

type AvatarProps = {
    alt: string,
    src: string,
    size?: number | string
};

const Avatar = ({ alt, src, size = null }: AvatarProps) => {

    const [show, setShow] = useState(false);

    const getName = () => {
        const _alt = (alt?.trim() || '');
        const words = _alt.split(' ');
        if (words.length > 1) return _alt[0] + words[words.length - 1][0];
        else if (_alt.length > 1) return _alt[0] + _alt[1];
        return _alt[0] || '';
    };

    const renderPlaceholder = () => (
        <svg
            className="rounded-lg"
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
            className="rounded-lg"
            height={size}
            width={size}
            alt={alt}
            draggable="false"
            src={src}
            onError={() => setShow(true)}
            onLoad={() => setShow(false)}
        />
    );
};

export default Avatar;