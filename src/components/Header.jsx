import { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/tv.svg";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axios";
import Movie from "../components/Movie";
import ClickListener from "../utils/ClickListener";

const Header = ({ handleSideBar }) => {
	const [qString, setQString] = useState("");
	const [qMovies, setQMovies] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [mobile, setMobile] = useState([false, "closed"]);
	const handleOutsideClick = () => {
		if(mobile[1] === "opened") setMobile([false, "closed"]);
	};
	const searchMovie = (event) => {
		setQString(event.target.value);
		if(event.target.value === "") setIsVisible(false);
		else {
			setIsLoading(true);
			setIsVisible(true);
			searchMovies(event.target.value);
		}
        
    };
	const searchMovies = (query) => {
		const apiKey = import.meta.env.VITE__TMDB_API_KEY;
		const url = `/search/movie?query=${query}&api_key=${apiKey}&language=en-US&page=1`;

		axios.get(url).then((response) => {
			if (response.status === 200) {
				let searchRes = response.data.results;
				if (searchRes.length > 5) searchRes = searchRes.slice(0, 5);
				setQMovies(searchRes);
			}
			
		}).catch((error) => {
			console.error("Error fetching searches:", error);
		}).finally(() => {
			setIsLoading(false);
		});
	};

	const mobileSearch = () => {
		setMobile([true, "opened"]);
	}
	
	return (
		<ClickListener onClickOutside={ handleOutsideClick }>
			<nav className="navbar__stick p-4 sticky top-0 left-0 w-full z-10 border-gray-100">
				<div className={`primary__nav ${mobile[0]? 'hidden':'block'}`}>
					<div className="flex justify-between lg:mx-24 md:mx-12">
						<div className="lg:hidden flex items-center">
							<button onClick={ handleSideBar } className="relative w-10 h-10 rounded-full flex justify-center bg-rose-700 items-center ring-2 ring-gray-800 __ring-change hover:bg-rose-900 hover:opacity-80">
								<span className="w-[18px] h-[2px] absolute rounded bg-white -translate-y-[5px]"></span>
								<span className="w-[18px] h-[2px] absolute rounded bg-white translate-y-[5px]"></span>
							</button>
						</div>
						<Link to="/" className="flex gap-6 items-center">
							<img src={ logo } height="50px" className="hidden lg:block"/>
							<span className="text-2xl text-white leading-none __text-change">MovieBox</span>
						</Link>
						<div className="hidden lg:block">
							<div className="w-[400px] self-center flex justify-between py-2 px-3 rounded-md border-2 border-gray-300 focus:ring focus:ring-sky-300 gap-6">
								<input  onChange={ searchMovie } onInput={ searchMovie } type="text" className="w-full focus:outline-none bg-transparent border-transparent text-white __text-change" placeholder="What do you want to watch?" />
								<button className="text-white __text-change"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
							</div>
						</div>
						<div className="self-center lg:hidden">
							<button onClick={ mobileSearch } className="text-white w-10 h-10 rounded-full bg-rose-700 ring-2 ring-gray-800 __ring-change hover:bg-rose-900 hover:opacity-80"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
						</div>
						<div className="hidden lg:block">
							<div className="flex gap-6 items-center">
								<span className="text-lg text-white leading-none __text-change hover:text-gray-600">
									<Link to="/">Sign in</Link>
								</span>
								<button>
									<Link className="relative w-10 h-10 rounded-full flex justify-center bg-rose-700 items-center ring-2 ring-gray-800 __ring-change hover:bg-rose-900 hover:opacity-80">
										<span className="w-[18px] h-[2px] absolute rounded bg-white -translate-y-[5px]"></span>
										<span className="w-[18px] h-[2px] absolute rounded bg-white translate-y-[5px]"></span>
									</Link>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className={`secondary__nav ${mobile[0]? 'block' : 'hidden'}`}>
					<div className="flex justify-center lg:mx-24 md:mx-12">
						<div className="w-[400px] self-center flex justify-between py-2 px-3 rounded-md border-2 border-gray-300 focus:ring focus:ring-sky-300 gap-6">
							<input onChange={ searchMovie } onInput={ searchMovie } type="text" className="w-full focus:outline-none bg-transparent border-transparent text-white __text-change" placeholder="What do you want to watch?" />
							<button className="text-white __text-change"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
						</div>
					</div>
				</div>
				<div className={`mx-auto w-[500px] max-w-[80%] p-4 shadow-md bg-rose-50 ${isVisible?'block':'hidden'}`}>
					<h5 className="my-2">Search Results for &quot;{qString}&quot;</h5>
					<div className="flex flex-col gap-6 mx-2">
						{isLoading ? (
							<div className="flex justify-center text-rose-700">
								<svg className="animate-spin w-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
								<span>&emsp;Loading...</span>
							</div>
						): (
							qMovies && qMovies.length > 0 ? (
								qMovies.map((qMovie, index) => (
									<Movie key={index} movie={qMovie} />
								))
							) : (
								<div className="flex justify-center text-rose-700">No movies found.</div>
							)
						)}					  
					</div>
				</div>
			</nav>
		</ClickListener>
	);
};

Header.propTypes = {
	handleSideBar: PropTypes.func.isRequired,
};

export default Header;
