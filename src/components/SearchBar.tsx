import React, { useState, useCallback } from 'react';
import Autosuggest from 'react-autosuggest';
import { Search } from 'lucide-react';
import { Box, styled } from '@mui/material';
import debounce from 'lodash/debounce';
import { WikiResponse, WikiSuggestion } from '../types/WikiTypes';
import { generateSearchUrl } from '../api/endpoints';
import { fetchWikiResultsWithSearchText } from '../api/wiki-requests';

const SearchWrapper = styled(Box)(({ theme }) => ({
  width       : '100%',
  maxWidth    : '600px',
  position    : 'relative',
  marginTop   : theme.spacing(6),
  marginBottom: theme.spacing(6)
}));

const StyledAutosuggestWrapper = styled(Box)(({ theme }) => ({
  '& .react-autosuggest__input': {
    width          : '100%',
    padding        : '16.5px 14px',
    paddingLeft    : '40px',
    fontSize       : '1rem',
    border         : '1px solid transparent',
    borderRadius   : theme.shape.borderRadius * 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color          : theme.palette.text.primary,
    transition     : theme.transitions.create(['background-color', 'box-shadow']),
    '&:hover'      : {
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    },
    '&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      boxShadow      : `0 0 0 2px ${theme.palette.primary.main}25`,
      outline        : 'none'
    }
  },
  '& .react-autosuggest__suggestions-container': {
    display: 'none'
  },
  '& .react-autosuggest__suggestions-container--open': {
    display        : 'block',
    position       : 'absolute',
    top            : '100%',
    width          : '100%',
    marginTop      : theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius   : theme.shape.borderRadius,
    zIndex         : 2,
    boxShadow      : theme.shadows[8]
  },
  '& .react-autosuggest__suggestions-list': {
    margin   : 0,
    padding  : 0,
    listStyle: 'none'
  },
  '& .react-autosuggest__suggestion': {
    padding   : theme.spacing(1.5, 2),
    cursor    : 'pointer',
    transition: theme.transitions.create('background-color'),
    '&:hover' : {
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }
  },
  '& .react-autosuggest__suggestion--highlighted': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)'
  }
}));

const SearchIcon = styled(Box)(({ theme }) => ({
  position : 'absolute',
  left     : theme.spacing(1),
  top      : '50%',
  transform: 'translateY(-50%)',
  color    : theme.palette.text.secondary,
  zIndex   : 1
}));

interface SearchBarProps {
  handleSearch: (value: string, pageId?: number) => void;
  searchTerm: string;
}

const SearchBar = ({ handleSearch, searchTerm }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const [suggestions, setSuggestions] = useState<WikiSuggestion[]>([]);

  // Fetch suggestions from Wikipedia API
  const fetchSuggestions = async (value: string) => {
    if (!value.trim()) {
      setSuggestions([]);

      return;
    }

    try {
      const data = await fetchWikiResultsWithSearchText(value);

      if (data.query && data.query.pages) {
        const results: WikiSuggestion[] = Object.values(data.query.pages)
          .map(page => ({
            title : page.title,
            pageId: page.pageid,
            url   : page.fullurl
          }));
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  // Debounce the fetch function
  const debouncedFetch = useCallback(
    debounce((value: string) => fetchSuggestions(value), 300),
    []
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(inputValue);
    }
  };

  const handleOnChange = (_: React.FormEvent<HTMLElement>, { newValue }: { newValue: string }) => {
    setInputValue(newValue);
  };

  // Autosuggest input props
  const inputProps = {
    placeholder: 'Search Wiki Articles...',
    value      : inputValue,
    onChange   : handleOnChange,
    onKeyDown  : handleKeyDown
  };

  return (
    <SearchWrapper>
      <SearchIcon>
        <Search size={20} />
      </SearchIcon>
      <StyledAutosuggestWrapper>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }: { value: string }) => debouncedFetch(value)}
          onSuggestionsClearRequested={() => setSuggestions([])}
          getSuggestionValue={(suggestion: WikiSuggestion) => suggestion.title}
          renderSuggestion={(suggestion: WikiSuggestion) => (
            <div>{suggestion.title}</div>
          )}
          onSuggestionSelected={(_, { suggestion }: { suggestion: WikiSuggestion }) => {
            setInputValue(suggestion.title);
            handleSearch(suggestion.title, suggestion.pageId);
          }}
          inputProps={inputProps}
        />
      </StyledAutosuggestWrapper>
    </SearchWrapper>
  );
};

export default SearchBar;
