

export const getFlexClassNames = ({
  flexCenter = false, flexHC = false, flexHR = false, flexVC = false
}) => {
    if(flexCenter) return 'd-flex align-items-center justify-content-center';
    else {
       let cls = '';
       if(flexHR || flexHC || flexVC) cls += 'd-flex '
       if(flexHC) cls += 'justify-content-center ';
       else if(flexHR) cls += 'justify-content-end ';
       if(flexVC) cls += 'align-items-center ';
       return cls;
    }
};

export const getPaddingClassName = ({ p = null, px = null, py = null }) => {
  if(p!= null && (px == null && py == null)) return `p-${p}`;
  else {
    let cls = '';
    if(px!=null) cls += `px-${px} `;
    if(py!=null) cls += `py-${py} `;
    return cls;
  }
};

export const getMarginClassName = ({ m = null, mx = null, my = null, mt = null, mb = null }) => {
  if(m!= null && (mx == null && my == null)) return `m-${m}`;
  else {
    let cls = '';
    if(mx!=null) cls += `mx-${mx} `;
    if(my!=null) cls += `my-${my} `;
    else {
      if(mt!=null) cls += `mt-${mt} `;
      if(mb!=null) cls += `mb-${mb} `;
    }
    return cls;
  }
};

export const getShadowClassName = (shadow) => {
  switch (shadow) {
    case 0: return 'shadow-none';
    case 1: return 'shadow-sm';
    case 2: return 'shadow';
    case 3: return 'shadow-lg';
    default: return null;
  }
};