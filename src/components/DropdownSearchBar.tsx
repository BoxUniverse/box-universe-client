import { ItemDropdownSearchBar } from '@components';
import _ from 'lodash';
import { forwardRef, SetStateAction, useEffect } from 'react';

const DropdownSearchBar = (
  props: {
    data: Array<any>;
    handleFocusInput: React.Dispatch<SetStateAction<boolean>>;
    refInput: React.RefObject<HTMLInputElement>;
  },
  ref: React.RefObject<HTMLDivElement>,
) => {
  const { data, handleFocusInput, refInput } = props;

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (_.isEqual(refInput.current, event.target)) return;

        handleFocusInput(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      className="absolute top-16 right-0 backdrop-blur-sm search-blur rounded-lg w-96 h-auto  pl-3 pr-5 pt-1 z-50"
      ref={ref}>
      <div className="h-full w-ful">
        {data?.map((user) => (
          <ItemDropdownSearchBar key={user.id} name={user.name} id={user.id} avatar={user.avatar} />
        ))}
      </div>
    </div>
  );
};

export default forwardRef(DropdownSearchBar);
