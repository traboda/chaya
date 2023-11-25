import React from 'react';

const Lock = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 18 18" width={size} fill="currentColor">
    <path d="M14.5,8H14V7A5,5,0,0,0,4,7V8H3.5a.5.5,0,0,0-.5.5v8a.5.5,0,0,0,.5.5h11a.5.5,0,0,0,.5-.5v-8A.5.5,0,0,0,14.5,8ZM6,7a3,3,0,0,1,6,0V8H6Zm4,6.111V14.5a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5V13.111a1.5,1.5,0,1,1,2,0Z" />
  </svg>
);

export default Lock;
