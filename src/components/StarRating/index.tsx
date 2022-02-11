import React, { useEffect, useState } from 'react';
import StarRatingStar from "./star";
import { useTheme } from "@emotion/react";

type StarRatingProps = {
    value: number,
    onChange?: (value: number) => void,
    required?: boolean,
    stars?: number,
    size?: number | string,
    enableHalf?: boolean,
    tooltipDefaultText?: string,
    tooltipArray?: string[],
    labelClassName?: string,
    className?: string,
    activeColor?: string,
    inactiveColor?: string,
}

const StarRating = ({
    value = null, onChange = () => {}, stars = 5, size = 30, className = '',  enableHalf = false, required = false,
    tooltipDefaultText = '', tooltipArray = [], labelClassName = '', activeColor = '#fbbf24', inactiveColor = null
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
        <div className={`w-full flex relative flex-col justify-center items-center gap-2 ${className}`}>
            <div className="flex relative gap-1" onMouseLeave={onMouseLeave}>
                {Array(stars).fill(0).map((_, i) => (
                    <StarRatingStar
                        size={size}
                        value={rating[i]}
                        enableHalf={enableHalf}
                        onChange={v => onRatingChange(v, i)}
                        onPreview={v => onPreview(v, i)}
                        activeColor={activeColor}
                        inactiveColor={inactiveColor}
                    />
                ))}
            </div>
            <input
                className="opacity-0 absolute mx-auto top-0"
                aria-hidden="true"
                aria-required={required}
                value={value > 0 ? value : null}
                required={required}
                autoComplete="off"
            />
            {!!(tooltipDefaultText || tooltipArray.length) && (
                <div className={labelClassName} style={{ color }}>
                    {hover === null || !(tooltipArray?.length > 0) ? tooltipDefaultText : tooltipArray[hover]}
                </div>
            )}
        </div>
    );
};

export default StarRating;