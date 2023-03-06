import { useLazyQuery } from '@apollo/client';
import { DropdownSearchBar } from '@components';
import { GET_ENTIRE_PROFILE } from '@src/graphql';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

export const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [isFocus, setFocus] = useState<boolean>(false);
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = React.createRef<HTMLDivElement>();
  const { data: session } = useSession();

  const [getAll, { data }] = useLazyQuery(GET_ENTIRE_PROFILE);

  const [listUser, setListUser] = useState<Array<any>>([]);

  useEffect(() => {
    getAll();
  }, []);

  const handleInputSearch = (event: FormEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value);
    const kw = event.currentTarget.value;
    if (data) {
      const re = new RegExp(`.*${kw}.*`, 'i');

      
      const listUserFilter = data?.getEntireProfile?.filter(
        (user: any) => re.test(user.name) && user.id !== session.user._id,
      );
      setListUser(listUserFilter);
    }
  };
  return (
    <div className="searchBar relative w-fit flex items-center ">
      <div className="relative">
        <input
          ref={inputSearchRef}
          name="searchUser"
          placeholder="EXPLORE UNIVERSE"
          id="searchUser"
          className="placeholder:select-none neon text-lg align-middle placeholder:text-sm placeholder:uppercase w-56 h-12 bg-transparent rounded-lg focus: outline-0  pl-10 pr-12 border-purple-500"
          onFocus={() => {
            setFocus(true);
          }}
          onInput={handleInputSearch}
          autoComplete="searchString"
          spellCheck="false"
        />
        <IoSearchOutline
          color="white"
          className="absolute top-1/2 transform -translate-y-1/2 ml-3 "
          size={20}
        />
        {keyword.length >= 4 && isFocus && listUser?.length > 0 && (
          <DropdownSearchBar
            data={listUser}
            handleFocusInput={setFocus}
            ref={dropdownRef}
            refInput={inputSearchRef}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
