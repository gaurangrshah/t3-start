//@link: https://devtrium.com/posts/how-keyboard-shortcut
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

interface UseKeyPressProps {
  keys: string[];
  callback: (e: KeyboardEvent) => void;
  node?: Document | null;
}

export const useMetaKeyPress = ({
  keys,
  callback,
  node = null,
}: UseKeyPressProps) => {
  // implement the callback ref pattern
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // handle what happens on key press
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!event.metaKey) return;
      // check if one of the key is part of the ones we want
      if (keys.some((key: string) => event.key === key)) {
        callbackRef.current(event);
      }
    },
    [keys]
  );

  useEffect(() => {
    // target is either the provided node or the document
    const targetNode = node ?? document;
    // attach the event listener
    targetNode && targetNode.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () =>
      targetNode && targetNode.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, node]);
};

/**
 *
 * Usage:
 *
const keysPressed = useMetaKeyPress({
  keys: ['k'],
  callback: (e) => console.log('lkajdflkajsdf', e),
  // node: document,
});
 */
