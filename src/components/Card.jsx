import { useState } from "react";
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import imdb from "../assets/rate1.svg";
import rntm from "../assets/rate2.svg";
// import axios from '../../api/axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Card = ({ movie, genres }) => {
	const [isActive, setIsActive] = useState(false);

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

	return (
		<Link data-testid="movie-card" to={ `/movie/${movie.id}` } className="shadow-inner hover:bg-gray-100 rounded-md cursor-pointer">
			<div className="flex flex-col gap-3 relative">
				<span onClick={ toggleFavorite } className={`absolute top-4 right-4 favorite-btn rounded-full bg-gray-300 text-white h-8 w-8 flex items-center justify-center ${isActive?' active':' hover:bg-rose-300'}`}>
					<FontAwesomeIcon icon={faHeart} />
				</span>
				<img src={ `${baseUrl}${movie.poster_path}` } className="w-full object-cover h-[375px]" data-testid="movie-poster"/>
				<span className="text-gray-400 font-bold text-xs">Released on {formattedDate} (<span data-testid="movie-release-date">{movie.release_date}</span>)</span>
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
};

Card.propTypes = {
	// id : PropTypes.number.isRequired,
	genres : PropTypes.array.isRequired,
	movie : PropTypes.object.isRequired
};

export default Card;

// {
// 	"adult": false,
// 	"backdrop_path": "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
// 	"genre_ids": [
// 	  18,
// 	  80
// 	],
// 	"id": 238,
// 	"original_language": "en",
// 	"original_title": "The Godfather",
// 	"overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
// 	"popularity": 132.488,
// 	"poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
// 	"release_date": "1972-03-14",
// 	"title": "The Godfather",
// 	"video": false,
// 	"vote_average": 8.7,
// 	"vote_count": 18602
//  },
