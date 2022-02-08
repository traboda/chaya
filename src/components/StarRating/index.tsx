import React, { useEffect, useState } from 'react';
import StarRatingStar from "./star";
import { useTheme } from "@emotion/react";

type StarRatingProps = {
    onChange: (value: number) => void,
    value: number,
    iconsCount?: number,
    size?: number | string,
    tooltipDefaultText?: string,
    tooltipArray?: string[],
    labelClassName?: string,
    allowHalfRating?: boolean
}

const StarRating = ({
    onChange, value, iconsCount = 5, size = 30, tooltipDefaultText = '', tooltipArray = [], labelClassName = '',
    allowHalfRating = true
}: StarRatingProps) => {

    const { color } = useTheme();
    const [rating, setRating] = useState(Array(iconsCount).fill(0));
    const [hover, setHover] = useState(null);

    const onRatingChange = (value, index) => onChange([...Array(index).fill(1), value].reduce((acc, c) => acc + c, 0));
    const onPreview = (value, index) => {
        setRating([...Array(index).fill(1), value, ...Array(iconsCount).fill(0)]);
        setHover(index);
    }

    const updateRating = () => setRating(Array(iconsCount).fill(0).map((_, i) => Math.max(Math.min(value - i, 1), 0)));
    const onMouseLeave = () => {
        updateRating();
        setHover(null);
    }

    useEffect(() => updateRating(), [value]);

    return (
        <div className="w-full flex flex-col justify-center items-center gap-2">
            <div className="flex gap-1" onMouseLeave={onMouseLeave}>
                {Array(iconsCount).fill(0).map((_, i) => (
                    <StarRatingStar
                        size={size}
                        value={rating[i]}
                        allowHalfRating={allowHalfRating}
                        onChange={v => onRatingChange(v, i)}
                        onPreview={v => onPreview(v, i)}
                    />
                ))}
            </div>

            {!!(tooltipDefaultText || tooltipArray.length) && (
                <div className={labelClassName} style={{ color }}>
                    {hover === null ? tooltipDefaultText : tooltipArray[hover]}
                </div>
            )}
        </div>
    );
};

export default StarRating;