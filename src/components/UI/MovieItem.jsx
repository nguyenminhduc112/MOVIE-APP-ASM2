import React from 'react'
import styles from './MovieList.module.css'
const URL_IMG = 'http://image.tmdb.org/t/p/w500'
const MovieItem = (props) => {
    console.log("Movie Runing")
    const handlerActionItem = () => {
        console.log("Clicked")
        props.onHandlerDetailMovie(props.id)
    }
    return (
        <React.Fragment>
            <div className={styles.item} onClick={handlerActionItem}>
                <img src={`${URL_IMG}${props.url}`} alt="" />
            </div>
        </React.Fragment>
    )
}

export default React.memo(MovieItem)
