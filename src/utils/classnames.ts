export const getFlexClassNames = ({
    flexCenter = false, flexHC = false, flexHR = false, flexVC = false
}) => {
    if (flexCenter) return 'flex items-center justify-center';
    else {
        let cls = '';
        if (flexHR || flexHC || flexVC) cls += 'flex ';
        if (flexHC) cls += 'justify-center ';
        else if (flexHR) cls += 'justify-end ';
        if (flexVC) cls += 'items-center ';
        return cls;
    }
};

type getPaddingClassName = {
    p: number | null,
    px: number | null,
    py: number | null
}

export const getPaddingClassName = ({ p = null, px = null, py = null }: getPaddingClassName) => {
    if (p != null && (px == null && py == null)) return `p-${p}`;
    else {
        let cls = '';
        if (px != null) cls += `px-${px} `;
        if (py != null) cls += `py-${py} `;
        return cls;
    }
};

type getMarginClassName = {
    m: number | null,
    mx: number | null,
    my: number | null,
    mt?: number | null,
    mb?: number | null,
}

export const getMarginClassName = ({ m = null, mx = null, my = null, mt = null, mb = null }: getMarginClassName) => {
    if (m != null && (mx == null && my == null)) return `m-${m}`;
    else {
        let cls = '';
        if (mx != null) cls += `mx-${mx} `;
        if (my != null) cls += `my-${my} `;
        else {
            if (mt != null) cls += `mt-${mt} `;
            if (mb != null) cls += `mb-${mb} `;
        }
        return cls;
    }
};

export const getShadowClassName = (shadow?: number) => {
    switch (shadow) {
        case 0:
            return 'shadow-none';
        case 1:
            return 'shadow-sm';
        case 2:
            return 'shadow';
        case 3:
            return 'shadow-lg';
        default:
            return null;
    }
};
