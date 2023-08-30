import React, { useState } from 'react'
import useHttp from '../../hooks/use-http'
import { useEffect } from 'react'
import styles from './Banner.module.css'
const URL_IMG = 'http://image.tmdb.org/t/p/w500'
const Banner = (props) => {
    const { isLoading, error, sendRequest: requestMovies } = useHttp()
    const [movieRandom, setMovieRandom] = useState({})
    const { urlFetchNetflixOriginals } = props
    useEffect(() => {
        const handlerReuqestMovies = (data) => {
            setMovieRandom(data.results[
                Math.floor(Math.random() * data.results.length - 1)
            ])
        }
        requestMovies({ url: urlFetchNetflixOriginals }, handlerReuqestMovies)
    }, [urlFetchNetflixOriginals, requestMovies])
    if (error) {
        return error
    }
    return (
        <React.Fragment>
            {!isLoading && movieRandom && (<div className={styles.banner}>
                <img src={`${URL_IMG}${movieRandom.backdrop_path}`} className={styles.banner_img} alt="" />
                <div className={styles.banner_info}>
                    <h2 className={styles.banner_title}>{movieRandom.name}</h2>
                    <div className={styles.banner_actions}>
                        <button className={styles.banner_btn}>Play</button>
                        <button className={styles.banner_btn}>My List</button>
                    </div>
                    <p className={styles.banner_text}>{movieRandom.overview}</p>
                </div>
            </div>)}
        </React.Fragment>
    )
}

export default Banner


