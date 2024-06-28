import { useState } from "react";
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import imdb from "../assets/rate1.svg";
import rntm from "../assets/rate2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Card = ({ movie, genres, origin }) => {
	const [isActive, setIsActive] = useState(false);
	const [loaded, setLoaded] = useState(false);
    const handleImageLoad = () => {
        setLoaded(true);
	};
	const toggleFavorite = () => {
		setIsActive(!isActive);
	};
	const getGenreNames = () => {
		const genreNames = movie.genre_ids.map((id) => {
			const genre = genres.find((item) => item.id === id);
			return genre?genre.name : null;
		});
		return genreNames.filter((name) => name !== null).join(', ');
	};
	const genre_names = getGenreNames();
	let formattedDate = "Unknown";
	if(movie.release_date){
		const date = new Date(movie.release_date);
		formattedDate = format(date, 'MMMM d, yyyy');
	}
	
	const baseUrl = "https://image.tmdb.org/t/p/w500";

	if(loaded)
		return (
			<Link data-testid="movie-card" to={ `/movie/${movie.id}` } state={{origin:origin}} className="shadow-inner hover:bg-gray-100 rounded-md cursor-pointer">
				<div className="flex flex-col gap-3 relative">
					<span onClick={ toggleFavorite } className={`absolute top-4 right-4 favorite-btn rounded-full bg-gray-300 text-white h-8 w-8 flex items-center justify-center ${isActive?' active':' hover:bg-rose-300'}`}>
						<FontAwesomeIcon icon={faHeart} />
					</span>
					<img src={ `${baseUrl}${movie.poster_path}` } className="w-full object-cover h-[375px]" data-testid="movie-poster" onLoad={handleImageLoad}/>
					<span className="text-gray-400 font-bold text-xs">Released on {formattedDate}</span>
					<span data-testid="movie-title" className="text-gray-900 font-bold text-lg">{movie && (movie.title ?? movie?.original_name) }</span>
					<div className="flex justify-between text-xs font-normal h-[17px]">
						<div className="flex gap-2">
							<span>
								<img src={ imdb } />
							</span>
							<span>{movie && (movie?.vote_average*10)} / 100</span>
						</div>
						<div className="flex gap-2">
							<span>
								<img src={ rntm } />
							</span>
							<span>{ movie && (movie.popularity/10>100 ? 100 : 100-(movie.popularity/10).toFixed(0) ) }%</span>
						</div>
					</div>
					<span className="text-gray-400 font-bold text-xs">{ genre_names }</span>
				</div>
			</Link>
		);
	else return (
		<div className="flex items-center justify-center w-full h-[375px] bg-gray-300 rounded animate-pulse">
			<svg className="w-12 h-12 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
				<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
			</svg>
		</div>
	);
};

Card.propTypes = {
	origin : PropTypes.string.isRequired,
	genres : PropTypes.array.isRequired,
	movie : PropTypes.object.isRequired
};

export default Card