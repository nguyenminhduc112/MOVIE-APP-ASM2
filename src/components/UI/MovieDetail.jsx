import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import styles from './MovieDetail.module.css'
import useHttp from '../../hooks/use-http';
const URL_IMG = 'http://image.tmdb.org/t/p/w500'
const MovieDetail = (props) => {
    const { isLoading: isLoadingMovie, error: errorMovie, sendRequest: requestMovie } = useHttp()
    const [movie, setMovie] = useState({})
    const opts = {
        height: '400',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };
    useEffect(() => {
        const handlerReuqestMovie = (data) => {
            setMovie(data)
            console.log(data)
        }
        requestMovie({ url: `https://api.themoviedb.org/3/movie/${props.idMovie}?api_key=6bc3178e1acbf3f2153a677b08af6bb6` }, handlerReuqestMovie)
    }, [props.idMovie])
    const MovieDetailRender = (
        <div className={styles.container}>
            <div className={styles.infoVideo}>
                <h2 className={styles.title}>{movie.title}</h2>
                <p className={styles.release_date}>Release Date: {movie.release_date}</p>
                <p className={styles.vote}>Vote: {movie.vote_average} / {movie.vote_count}</p>
                <p className={styles.overview}>{movie.overview}</p>
            </div>
            <div>
                {props.keyVideo ? (<YouTube
                    videoId={props.keyVideo}
                    opts={opts}
                    className={styles.video}
                />) : (<img src={`${URL_IMG}${movie.backdrop_path}`} className={styles.img} />)}
            </div>
        </div>
    )
    if (errorMovie) {
        return (<p style={{ color: '#fff' }}>Something Wrong!</p>)
    }
    return (
        <React.Fragment>
            {MovieDetailRender}
        </React.Fragment>
    )
}

export default React.memo(MovieDetail)
