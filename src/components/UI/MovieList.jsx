import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import styles from './MovieList.module.css'
import useHttp from '../../hooks/use-http'
import MovieItem from './MovieItem'
import MovieDetail from './MovieDetail'

const MovieList = ({ size, title = '', wrap = false, urlFetch }) => {
    const { isLoading: isLoadingMovies, error: errorMovies, sendRequest: requestMovies } = useHttp()
    const { isLoading: isLoadingMovie, error: errorMovie, sendRequest: requestMovie } = useHttp()
    const [movies, setMovies] = useState({})

    // Reducer Detail Movie
    const initalMovie = {
        movies: [],
        statusShowDetail: false,
        idMovie: ''
    }
    const reducerDetailMovie = (state, action) => {
        if (state.idMovie !== action.id) {
            return {
                movies: action.movies,
                idMovie: action.id,
                statusShowDetail: true,
            }
        } else {
            return {
                movies: [],
                idMovie: '',
                statusShowDetail: false,
            }
        }
    }
    const [detailMovie, dispatchDetailMovie] = useReducer(reducerDetailMovie, initalMovie)
    // Fetch Movie First
    useEffect(() => {
        const handlerReuqestMovies = (data) => {
            setMovies(data.results)
        }
        requestMovies({ url: urlFetch }, handlerReuqestMovies)
    }, [urlFetch, requestMovies])

    // Xử lý khi click vào phim
    const handlerDetailMovie = useCallback((movieID) => {
        console.log(movieID)
        const handlerReuqestMovie = (data) => {
            const dataMovie = data.results.filter((movie) => (movie.site === 'YouTube') && (movie.type === 'Trailer' || movie.type === 'Teaser'))
            dispatchDetailMovie({ id: movieID, movies: dataMovie })
        }
        requestMovie({ url: `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=6bc3178e1acbf3f2153a677b08af6bb6` }, handlerReuqestMovie)
    }, [])


    // Render giao diện danh sách bộ phim
    const listMoviesRender = useMemo(() => {
        return size === 'poster' ? !isLoadingMovies && movies.length > 0 && movies.map(movie => <MovieItem key={movie.id} onHandlerDetailMovie={handlerDetailMovie} id={movie.id} url={movie.poster_path} />) : !isLoadingMovies && movies.length > 0 && movies.map(movie => <MovieItem key={movie.id} onHandlerDetailMovie={handlerDetailMovie} id={movie.id} url={movie.backdrop_path} />)
    }, [isLoadingMovies, size, movies])

    // Render giao diện chi tiết bộ phim
    const movieDetailRender = useMemo(() => {
        const result = detailMovie.movies.length > 0 ? detailMovie.movies.find(movie => (movie.site === 'YouTube') && (movie.type === 'Trailer' || movie.type === 'Teaser')) : { key: null }

        return result && <MovieDetail keyVideo={result.key} idMovie={detailMovie.idMovie} />
    }, [detailMovie.movies])

    return (
        <React.Fragment>
            <div className={styles.container} >
                {title !== '' && <h3 className={styles.title}>{title}</h3>}
                <div className={styles.listMovies} style={{ gridTemplateColumns: wrap ? 'repeat(9, 1fr)' : 'repeat(20, 1fr)', overflow: wrap && 'hidden' }}>
                    {movies.length > 0 ? listMoviesRender : <p style={{ color: '#fff' }}>Không có danh sách phim!</p>}
                </div>
                {detailMovie.statusShowDetail && movies.length > 0 && !isLoadingMovie && movieDetailRender}
                {!detailMovie.statusShowDetail && errorMovie && (<div className={styles.container}><p style={{ color: '#fff', paddingLeft: 20 }}>Something Wrong! {errorMovie}</p></div>)}
                {!detailMovie.statusShowDetail && errorMovies && (<div className={styles.container}><p style={{ color: '#fff', paddingLeft: 20 }}>Something Wrong! {errorMovies}</p></div>)}
            </div>
        </React.Fragment >
    )
}

export default React.memo(MovieList)