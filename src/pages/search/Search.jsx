import React, { useState } from 'react';
import NavBar from '../../components/layout/NavBar';
import MovieList from '../../components/UI/MovieList';
import SearchForm from './components/SearchForm';

const Search = (props) => {
	const [urlFetchSearch, setUrlFetchSearch] = useState(props.fetchSearch)
	const handlerSearchMovie = (query) => {
		setUrlFetchSearch(`${props.fetchSearch}&query=${query}`)
	}
	return (
		<div className='app'>
			<NavBar />
			<SearchForm onSearchMovie={handlerSearchMovie} />
			<MovieList size='poster' title='Search Result' urlFetch={urlFetchSearch} wrap={true} />
		</div>
	);
};

export default Search;
