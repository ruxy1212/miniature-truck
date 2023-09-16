import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
    let formattedDate = "Unknown";
    if(movie.release_date){
        const date = new Date(movie.release_date);
        formattedDate = format(date, 'MMMM d, yyyy');
    }
	
	const baseUrl = "https://image.tmdb.org/t/p/w500";

	return (
		<Link to={ `/movie/${movie.id}` } className="shadow-inner hover:bg-gray-100 rounded-md cursor-pointer">
            <div className="flex gap-6 items-center">
                <img className="h-[80px] object-cover w-[80px]" src={ `${baseUrl}${movie.poster_path}` }/>
                <div>
                    <p className="text-gray-600 font-semibold text-base">{movie && (movie.title ?? movie?.original_name) }</p>
                    <p className="text-gray-800 text-xs">Released on {formattedDate}</p>
                </div>
            </div>
            <hr />
		</Link>
	);
};

Movie.propTypes = {
	movie : PropTypes.object.isRequired
};

export default Movie;
