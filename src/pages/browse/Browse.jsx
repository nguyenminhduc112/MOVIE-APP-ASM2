import React from 'react';
import NavBar from '../../components/layout/NavBar';
import Banner from '../../components/layout/Banner';
import MovieList from '../../components/UI/MovieList';

function Browse(props) {
	return (
		<div className="app" style={{ height: '200vh' }}>
			<NavBar />
			<Banner urlFetchNetflixOriginals={props.requests.fetchNetflixOriginals} />
			<MovieList size='poster' urlFetch={props.requests.fetchNetflixOriginals} />
			<MovieList size='backdrop' urlFetch={props.requests.fetchTrending} title='Xu hướng' />
			<MovieList size='backdrop' urlFetch={props.requests.fetchTopRated} title='Xếp hạng cao' />
			<MovieList size='backdrop' urlFetch={props.requests.fetchActionMovies} title='Hành động' />
			<MovieList size='backdrop' urlFetch={props.requests.fetchComedyMovies} title='Hài' />
			<MovieList size='backdrop' urlFetch={props.requests.fetchHorrorMovies} title='Kinh dị' />
			<MovieList size='backdrop' urlFetch={props.requests.fetchRomanceMovies} title='Lãng mạng' />
			<MovieList size='backdrop' urlFetch={props.requests.fetchDocumentaries} title='Tài liệu' />
		</div>
	);
}

export default Browse;

