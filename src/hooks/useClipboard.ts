import { useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success
type IsSupportedType = () => boolean;

const useClipboard = (): [CopiedValue, CopyFn, IsSupportedType] => {
 
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const isSupported: IsSupportedType = () => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    } else {
      console.warn('Clipboard is supported');
      return true;
    }
  };

  const copy: CopyFn = async text => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy, isSupported];

};

export default useClipboard;