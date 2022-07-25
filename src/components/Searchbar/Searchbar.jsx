import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  SearchBar,
  SearchForm,
  SearchBtn,
  SearchInput,
} from './Searchbar.styled';
import { GoSearch } from 'react-icons/go';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = event => {
    setSearchValue(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const query = searchValue.trim();
    if (!query) return;

    onSubmit(query);
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <GoSearch fontSize="18px" />
        </SearchBtn>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchBar>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
