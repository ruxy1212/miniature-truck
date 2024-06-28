import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Card from '../components/Card';
import Footer from "../components/Footer";
import { format } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imdb from "../assets/rate1.svg";
import rntm from "../assets/rate2.svg";
import { faPlayCircle, faTimes, faList } from "@fortawesome/free-solid-svg-icons";
import axios from '../../api/axios';
import AnimLoader from '../utils/AnimLoader';

const HomePage = () => {
	const [movies, setMovies] = useState([]);
	const [upcoming, setUpcoming] = useState([]);
	const [heroMovies, setHeroMovies] = useState(null);
	const [heroMovie, setHeroMovie] = useState(null);
	const [activeHero, setActiveHero] = useState(0);
	const [genres, setGenre] = useState([]);
	const [isOpen, setOpen] = useState(false);
	const [trailerVid, setTrailerVid] = useState("");
	const [recentList, setRecentList] = useState([]);
	const [isError, setError] = useState(false);
	const baseUrl = "https://image.tmdb.org/t/p/w500";
  
	useEffect(() => {
		const getTopMovies = async () => {
			try {
				const apiKey = import.meta.env.VITE__TMDB_API_KEY;
				const resT = await axios.get(`/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`);
				const resU = await axios.get(`/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`);
				if (resT.status === 200 && resU.status === 200) {
					const resP = await axios.get(`/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
					const resG = await axios.get(`/genre/movie/list?api_key=${apiKey}&language=en`);
					if(resP.status === 200 && resG.status === 200){
						const topMovies = resT.data.results.slice(0, 12);
						const upMovies = resU.data.results.slice(0, 12);
						const recent = resU.data.results.slice(13, 16);
						const nowPlaying = getNowPlaying(resP.data.results, 5);
						const allGenres = resG.data.genres;
						setMovies(topMovies);
						setUpcoming(upMovies);
						setHeroMovies(nowPlaying);
						setHeroMovie(nowPlaying[0]);
						setRecentList(recent); console.log(recent);
						setGenre(allGenres);
						const resQ = await axios.get(`/movie/${nowPlaying[0].id}/videos?api_key=${apiKey}&language=en-US`);
						if (resQ.status === 200) {
							const videos = resQ.data.results;
							const trailer = videos && videos.find(({ type, site }) => type === 'Trailer' && site === 'YouTube');
							const { key } = trailer;
							const trailerUrl = `https://www.youtube.com/embed/${key}`;
							setTrailerVid(trailerUrl);
						}
						setError(false);
					}				
				}
			}catch(error){
				console.error("Error fetching top 10 movies:", error);
				setError(true);
			}
		};

		function getNowPlaying(allPlaying, k) {
			const nowPlaying = [], num = [];
			while (num.length < k) {
				const playing = Math.floor(Math.random() * allPlaying.length);
				if (!num.includes(playing)) {
					nowPlaying.push(allPlaying[playing]);
					num.push(playing);
				}
			}
			return nowPlaying;
		}

	getTopMovies();
	}, []);
	useEffect(() => {
		window.addEventListener('scroll', function () {
            const navbar = document.querySelector('nav.navbar__stick');
			if(navbar){
				if (window.scrollY > 10 && navbar.getBoundingClientRect().height < 100) {
					navbar.classList.add('scrolled');
					navbar.classList.add('border-b-2');
				} else {
					navbar.classList.remove('border-b-2');
					navbar.classList.remove('scrolled');
				}	
			}
        });
	}, []);
	const [isActive, setIsActive] = useState(false);

    const handleSideBar = () => {
        setIsActive(!isActive);
    };

	const changeHero = (index) => {
		getTrailer(heroMovies[index].id);
		setActiveHero(index);
		setHeroMovie(heroMovies[index]);
	};

	const getTrailer = async (tId) => {
		try { 
			const apiKey = import.meta.env.VITE__TMDB_API_KEY;
			const resT = await axios.get(`/movie/${tId}/videos?api_key=${apiKey}&language=en-US`);
			if (resT.status === 200) {
				const videos = resT.data.results;
				const trailer = videos && videos.find(({ type, site }) => type === 'Trailer' && site === 'YouTube');
				const { key } = trailer;
				const trailerUrl = `https://www.youtube.com/embed/${key}`;
				setTrailerVid(trailerUrl);	
			}
		}catch(error){
			setError(true);
			console.error("Error fetching trailer: ", error);
		}
	};

	const getYear = (d) => {
		const date = new Date(d);
		return date.getFullYear();
	}
	const handleOpen = () => {
		setOpen(true);
	};

	const today = new Date();
    const tMonth = format(today, 'MMMM');

  return (
    <main>
		<div className={`trailer__overlay ${isOpen ? "open-trailer" : ""}`}>
			<div className="trailer__container">
				{isOpen &&
					<iframe onClick={(e) => e.stopPropagation()} className="trailer" src={trailerVid} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe>
				}
				<button className="close-trailer" onClick={() => setOpen(false)}><FontAwesomeIcon icon={faTimes} /></button>
			</div>
		</div>
		<section className={`bg-blue-500 flex relative min-h-[600px] bg-[url('assets/Poster.png')] bg-center bg-cover bg-no-repeat`} style={{ backgroundImage: 'url('+baseUrl+(heroMovie && (heroMovie?.backdrop_path))+')' }}>
			<Header handleSideBar={handleSideBar} />
			<div className={`transition ease-in-out w-[80%] lg:w-[30%] top-0 left-0 z-20 h-full overflow-auto fixed ${isActive? 'block' : 'hidden'} }`}> 
                <SideBar closeSideBar={handleSideBar} origin="home" />
            </div>
			<div className="container mx-auto flex flex-col justify-center pb-6">
				<div className="absolute top-0 left-0 h-full w-full backdrop-brightness-50"></div>
				<div className="relative z-9 mt-28">
					{heroMovie?(
						<div className="flex justify-between items-center">
							<div className="ms-12 flex gap-5 flex-col w-[400px]">
								<h1 className="text-white text-5xl font-bold">{heroMovie && (heroMovie.title ?? heroMovie?.original_name) }<span className="border-rose-700 bg-rose-700/20 border py-[1px] px-[10px] text-[#F8E7EB] rounded-[15px] text-sm cursor-default h-[25px] align-middle ms-4">{ heroMovie && heroMovie.release_date && getYear(heroMovie.release_date) }</span></h1>
								<div className="flex gap-4 text-white">
									<div className="flex gap-4 h-[17px] text-xs text-normal w-[50%] relative">
										<span>
											<img src={ imdb } />
										</span>
										<span>{heroMovie && (heroMovie?.vote_average*10)} / 100</span>
									</div>
									<div className="flex gap-4 h-[17px] text-xs text-normal w-[50%]">
										<span>
											<img src={ rntm } />
										</span>
										<span>{ heroMovie && (heroMovie.popularity/10>100 ? 100 : 100-(heroMovie.popularity/10).toFixed(0) ) }%</span>
									</div>
								</div>
								<p className="text-white text-base">{heroMovie && (heroMovie.overview ?? heroMovie?.overview) }</p>
								<div>
									<button onClick={ handleOpen } className="flex gap-2 items-center rounded-md px-4 py-1.5 text-white bg-rose-700 hover:bg-rose-900 hover:opacity-80"><FontAwesomeIcon icon={faPlayCircle} /> WATCH TRAILER</button>
								</div>
							</div>
							<div className="flex flex-col gap-[10px] text-white">
								{heroMovies && (
									heroMovies.map((n, index) => (
										<span key={index} onClick={() => changeHero(index)} className="cursor-pointer hover:bg-black hover:opacity-25 flex gap-4 items-center"><span className={`h-[3px] w-[20px] rounded-md mr-4 ${activeHero===index?'bg-white':''}`}></span>{ (index+1) }</span>
									)))
								}
							</div>
						</div>
					):(
						<div className="animate-pulse w-full">
							<div className="h-8 bg-gray-200 rounded-lg dark:bg-gray-300 w-48 mb-4"></div>
							<div className="h-4 bg-gray-200 rounded-md dark:bg-gray-300 max-w-[360px] mb-2.5"></div>
							<div className="h-4 bg-gray-200 rounded-md dark:bg-gray-300 w-48 mb-2.5"></div>
						</div>
					)}
				</div>
			</div>
		</section>
		<section>
			<div className="mx-12 mt-12 flex justify-between items-center">
				<h1 className="font-bold text-4xl text-center md:text-left">Featured Movies</h1>
				<Link to="featured" className="text-rose-600 text-lg font-normal hover:font-semibold whitespace-nowrap">
					See all{" >"}
				</Link>
			</div>
			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-12 gap-16">
				{movies.length>0 ? (
					movies.map((movie, index) => (
						<Card key={index} movie={movie} genres={genres} origin="home"/>
					))
				):(isError? (
					<div className="text-center sm:col-span-2 md:col-span-12 flex justify-center text-rose-700">No data available. Check your network connection</div>
				):(
					<div className="flex justify-center col-span-12">
						<AnimLoader></AnimLoader>
					</div>
				))}
			</div>
		</section>
		<section>
			<div className="mx-12 mt-12 flex justify-between items-center">
				<h1 className="font-bold text-4xl text-center md:text-left">Most Recent</h1>
				<Link className="text-rose-600 text-lg font-normal hover:font-semibold whitespace-nowrap">
					See all{" >"}
				</Link>
			</div>
			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-12 gap-16">
				{upcoming.length>0 ? (
					upcoming.map((movie, index) => (
						<Card key={index} movie={movie} genres={genres} origin="home"/>
					))
				):(isError? (
					<div className="text-center sm:col-span-2 md:col-span-12 flex justify-center text-rose-700">No data available. Check your network connection</div>
				):(
					<div className="flex justify-center col-span-12">
						<AnimLoader></AnimLoader>
					</div>
				))}
			</div>
		</section>
		<section>
			<div className="relative rounded-xl cursor-pointer overflow-hidden w-[600px] max-w-[80%] mx-auto">
				<div className="absolute bottom-0 w-full bg-black/50 text-white text-lg py-1 px-2 text-center">
					<FontAwesomeIcon icon={faList} />&emsp;The best movies and shows in {tMonth}
				</div>
				<div className="flex">
					{recentList && 
						recentList.map((recent, index) => (
							<img src={`${baseUrl}${recent.poster_path}`} key={index} className="w-[33.33%]"/>
						))
					}
				</div>
			</div>
		</section>
		<Footer />
    </main>
  )
}

export default HomePage