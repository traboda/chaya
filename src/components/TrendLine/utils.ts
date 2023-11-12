// @ts-nocheck
export const range = to => [...Array(to).keys()];

export const pick = (obj, keys) => (
  keys.reduce((acc, key) => ({
    ...acc,
    [key]: obj[key],
  }), {})
);