import React, { useState } from 'react';

interface Props extends React.ComponentProps<'div'> {
  max?: number;
  children: string;
}

const LongText: React.FC<Props> = ({ children, max = 50 }: Props) => {
  const [text, setText] = useState(children);
  const [isMore, setMore] = useState(false);
  const seeMore = () => {
    setText(children);
    setMore(true);
  };
  const seeLess = () => {
    setMore(false);
  };
  return (
    <div>
      {children?.length > max && !isMore ? (
        <>
          {`${text.slice(0, max)}...`}
          <span
            className={'ml-1 font-bold text-white hover:underline cursor-pointer'}
            onClick={seeMore}>
            See more
          </span>
        </>
      ) : !isMore ? (
        children
      ) : (
        <>
          {text}
          <span
            className={'ml-1 font-bold text-white hover:underline cursor-pointer'}
            onClick={seeLess}>
            See less
          </span>
        </>
      )}
    </div>
  );
};

export default React.memo(LongText);
