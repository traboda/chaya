import React, { useEffect, useState } from 'react';
import StarRatingStar from "./star";
import { useTheme } from "@emotion/react";

type StarRatingProps = {
    value: number,
    onChange?: (value: number) => void,
    stars?: number,
    size?: number | string,
    enableHalf?: boolean,
    tooltipDefaultText?: string,
    tooltipArray?: string[],
    labelClassName?: string,
    className?: string,
}

const StarRating = ({
    value, onChange = () => {}, stars = 5, size = 30, className,  enableHalf = false,
    tooltipDefaultText = '', tooltipArray = [], labelClassName = ''
}: StarRatingProps) => {

    const { color } = useTheme();
    const [rating, setRating] = useState(Array(stars).fill(0));
    const [hover, setHover] = useState(null);

    const onRatingChange = (value, index) => onChange([...Array(index).fill(1), value].reduce((acc, c) => acc + c, 0));
    const onPreview = (value, index) => {
        setRating([...Array(index).fill(1), value, ...Array(stars).fill(0)]);
        setHover(index);
    }

    const updateRating = () => setRating(Array(stars).fill(0).map((_, i) => Math.max(Math.min(value - i, 1), 0)));
    const onMouseLeave = () => {
        updateRating();
        setHover(null);
    }

    useEffect(() => updateRating(), [value]);

    return (
        <div className={`w-full flex flex-col justify-center items-center gap-2 ${className}`}>
            <div className="flex gap-1" onMouseLeave={onMouseLeave}>
                {Array(stars).fill(0).map((_, i) => (
                    <StarRatingStar
                        size={size}
                        value={rating[i]}
                        enableHalf={enableHalf}
                        onChange={v => onRatingChange(v, i)}
                        onPreview={v => onPreview(v, i)}
                    />
                ))}
            </div>
            {!!(tooltipDefaultText || tooltipArray.length) && (
                <div className={labelClassName} style={{ color }}>
                    {hover === null || !(tooltipArray?.length > 0) ? tooltipDefaultText : tooltipArray[hover]}
                </div>
            )}
        </div>
    );
};

export default StarRating;