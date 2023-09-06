import React, { Suspense, lazy } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import Browse from './pages/browse/Browse';
const Search = lazy(() => import('./pages/search/Search'))

const url = 'https://api.themoviedb.org/3/'
const API_KEY = '6bc3178e1acbf3f2153a677b08af6bb6'
const requests = {
	fetchTrending: `${url}/trending/all/week?api_key=${API_KEY}&language=en-US`,
	fetchNetflixOriginals: `${url}/discover/tv?api_key=${API_KEY}&with_network=123`,
	fetchTopRated: `${url}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	fetchActionMovies: `${url}/discover/movie?api_key=${API_KEY}&with_genres=28`,
	fetchComedyMovies: `${url}/discover/movie?api_key=${API_KEY}&with_genres=35`,
	fetchHorrorMovies: `${url}/discover/movie?api_key=${API_KEY}&with_genres=27`,
	fetchRomanceMovies: `${url}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	fetchDocumentaries: `${url}/discover/movie?api_key=${API_KEY}&with_genres=99`,
	fetchSearch: `${url}/search/movie?api_key=${API_KEY}&language=en-US`,
};

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Browse requests={requests} />} />
				<Route path="/search" element={<Suspense fallback={<p>Loading...</p>}><Search fetchSearch={requests.fetchSearch} /></Suspense>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
