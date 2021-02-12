import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchField from 'react-search-field';

import { AppState } from '../../redux/store';
import { setQuery } from '../../redux/ui/search';

interface SearchBarProps {
}

const SearchBar: FC<SearchBarProps> = () => {
  const query = useSelector((state: AppState) => state.ui.search.query);
  const dispatch = useDispatch();
  const handleChange = (value: string) => dispatch(setQuery(value));

  return (
      <SearchField
          placeholder="Search..."
          onChange={ handleChange }
          searchText={ query }
          classNames="test-class"
      />
  );
};
export default SearchBar;
