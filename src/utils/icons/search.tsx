import React from 'react';

const Search = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 18 18" width={20} fill="currentColor">
    <path d="M16.5865,15.107,12.7,11.2215A6.413,6.413,0,1,0,11.2215,12.7l3.886,3.886a1.05,1.05,0,0,0,1.479-1.479ZM3,7.5A4.5,4.5,0,1,1,7.5,12,4.5,4.5,0,0,1,3,7.5Z" />
  </svg>
);

export default Search;