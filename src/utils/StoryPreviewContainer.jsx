import React from 'react';
import StyleProvider from './StyleProvider';

const StoryPreviewContainer = ({ children, width = '450px' }) => {
  return (
    <div className="d-flex align-items-center justify-content-center bg-light p-2">
      <div style={{ width, maxWidth: '100%' }}>
        <StyleProvider>{children}</StyleProvider>
      </div>
    </div>
  );
};

export default StoryPreviewContainer;
