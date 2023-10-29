'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface DocumentPortalProps {
  children: ReactNode
  position?: 'start' | 'end'
} 

const DocumentPortal = ({ children, position = 'end' }: DocumentPortalProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = document.createElement('div');
    div.style.display = 'contents';
    if (position === 'start') document.body.prepend(div);
    else document.body.appendChild(div);
    setElement(div);

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  return element ? ReactDOM.createPortal(children, element) : <div />;
};

export default DocumentPortal;