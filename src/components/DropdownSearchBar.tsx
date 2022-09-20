import { forwardRef, SetStateAction, useEffect, useState } from 'react';
import _ from 'lodash';
import ItemDropdownSearchBar from './ItemDropdownSearchBar';

const DropdownSearchBar = (
  props: {
    data: Array<any>;
    handleFocusInput: React.Dispatch<SetStateAction<boolean>>;
    refInput: React.RefObject<HTMLInputElement>;
  },
  ref: React.RefObject<HTMLDivElement>,
) => {
  const { data, handleFocusInput, refInput } = props;
  console.log(data);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (_.isEqual(refInput.current, event.target)) return;

        // alert('You clicked outside of me!');
        handleFocusInput(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      className="absolute top-14 backdrop-blur-sm search-blur rounded-lg w-full h-auto  pl-3 pr-5 pt-1"
      ref={ref}>
      <div className="h-full w-ful">
        {data?.map((user) => (
          <ItemDropdownSearchBar key={user.id} name={user.name} id={user.id} />
        ))}
      </div>
    </div>
  );
};

export default forwardRef(DropdownSearchBar);
