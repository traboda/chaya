import React from 'react';
import StyleProvider from './StyleProvider';

const StoryPreviewContainer = ({ children, width = '450px', theme, }) => {
  return (
    <StyleProvider theme={theme}>
      <div className="d-flex align-items-center justify-content-center bg-light p-2">
        <div style={{ width, maxWidth: '100%' }}>
          {children}
        </div>
      </div>
    </StyleProvider>
  );
};

export default StoryPreviewContainer;
