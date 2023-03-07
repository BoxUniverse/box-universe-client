import { useEffect, useRef } from 'react';

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};
export default AlwaysScrollToBottom;
