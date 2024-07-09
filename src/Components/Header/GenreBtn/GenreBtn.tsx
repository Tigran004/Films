import style from "./GenreBtn.module.css"


interface GenreBtnProps {
  genre: any;
  filterMoviesByGenres:any
}

export default function GenreBtn({ genre,filterMoviesByGenres }: GenreBtnProps) {
  return (
    <div key={genre.id} className={style.genreLi} onClick={() => filterMoviesByGenres(genre.id)}>
      {genre.name}
    </div>
  );
}