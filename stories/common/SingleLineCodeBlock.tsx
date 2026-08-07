import React, { useState, useCallback } from 'react';

import useClipboard from '../../src/hooks/useClipboard';

const SingleLineCodeBlock = ({ text }: { text: string }) => {

  const [, copy, isSupported] = useClipboard();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    copy(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text, copy]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--sb-code-bg, rgba(0,0,0,0.05))',
        borderRadius: '4px',
        padding: '8px 12px',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        fontSize: '14px',
        lineHeight: '1.5',
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'auto',
      }}
    >
      <code style={{ whiteSpace: 'nowrap' }}>{text}</code>
      {isSupported() && (
        <button
          onClick={handleCopy}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            marginLeft: '8px',
            color: copied ? '#22c55e' : 'inherit',
            opacity: copied ? 1 : 0.6,
            flexShrink: 0,
            transition: 'color 0.3s ease, opacity 0.3s ease, transform 0.3s ease',
            transform: copied ? 'scale(1.2)' : 'scale(1)',
          }}
          title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          {copied ? (
            <svg width={14} height={14} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z" />
            </svg>
          ) : (
            <svg width={14} height={14} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"
              ></path>
            </svg>
          )}
        </button>
      )}
    </div>
  );

};

export default SingleLineCodeBlock;
