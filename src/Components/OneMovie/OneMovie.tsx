import  { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AsyncMovie } from '../../store/Slices/getOneMovie'; 
import { useParams } from 'react-router-dom';
import style from "./OneMovie.module.css"


export default function OneMovie() {
    const dispatch = useAppDispatch();
    const {oneMovie} = useAppSelector((state) => state.oneMovie); 
    const { id } = useParams<{id:any}>();
    useEffect(() => {
        dispatch(AsyncMovie(id));
    }, [id]);
  const imgUrl = "https://image.tmdb.org/t/p/w500/";
        


    return (
        <div className={style.OneMovie}>
            <img src={imgUrl + oneMovie.poster_path} alt="" />
        </div>
    );
}