import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Card from '../components/Card';
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imdb from "../assets/rate1.svg";
import rntm from "../assets/rate2.svg";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import axios from '../../api/axios';

const HomePage = () => {
	const [movies, setMovies] = useState([]);
	const [heroMovie, setHeroMovie] = useState(null);
	const [genres, setGenre] = useState([]);
	const baseUrl = "https://image.tmdb.org/t/p/w500";
  
	useEffect(() => {
		const getTopMovies = async () => {
			try {
				const apiKey = "07ec7d229bdb91d3b7906c73fdf81ee0";
				const resT = await axios.get(`/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`);
				if (resT.status === 200) {
					const resP = await axios.get(`/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
					const resG = await axios.get(`/genre/movie/list?api_key=${apiKey}&language=en`);
					if(resP.status === 200 && resG.status === 200){
						const topMovies = resT.data.results.slice(0, 10);
						const nowPlaying = resP.data.results[Math.floor(Math.random() * resP.data.results.length)];
						const allGenres = resG.data.genres;
						setMovies(topMovies);
						setHeroMovie(nowPlaying);
						setGenre(allGenres);
					}				
				}
			}catch(error){
				console.error("Error fetching top 10 movies:", error);
			}
		};

	getTopMovies();
	}, []);
	useEffect(() => {
		window.addEventListener('scroll', function () {
            const navbar = document.querySelector('nav.navbar__stick');
			if(navbar){
				if (window.scrollY > 10) {
					navbar.classList.add('scrolled');
					navbar.classList.add('border-b-2');
					if(this.window.scrollY > 600 && navbar.classList.contains('sticky')){
						navbar.classList.remove('sticky');
						navbar.classList.add('fixed');
					}else if(this.window.scrollY <= 600 && navbar.classList.contains('fixed')){
						navbar.classList.add('sticky');
						navbar.classList.remove('fixed');
					}
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

  return (
    <main>
		<section className={`bg-blue-500 relative min-h-[600px] bg-[url('assets/Poster.png')] bg-center bg-cover bg-no-repeat`} style={{ backgroundImage: 'url('+baseUrl+(heroMovie && (heroMovie?.backdrop_path))+')' }}>
			<Header handleSideBar={handleSideBar} />
			<div className={`w-[80%] top-0 left-0 z-20 h-full overflow-auto fixed ${isActive? 'block' : 'hidden'} }`}> 
                <SideBar closeSideBar={handleSideBar} origin="home" />
            </div>
			<div className="container mx-auto flex flex-col justify-center mt-[120px] pb-6">
				<div className="absolute top-0 left-0 h-full w-full backdrop-brightness-50"></div>
				<div className="relative flex justify-between z-9">
					<div className="ms-12 flex gap-5 flex-col w-[400px]">
						<h1 className="text-white text-5xl font-bold">{heroMovie && (heroMovie.title ?? heroMovie?.original_name) }</h1>
						<div className="flex gap-4 text-white">
							<div className="flex gap-4 h-[17px] text-xs text-normal w-[50%]">
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
							<button className="flex gap-2 items-center rounded-md px-4 py-1.5 text-white bg-rose-700 hover:bg-rose-900 hover:opacity-80"><FontAwesomeIcon icon={faPlayCircle} /> WATCH TRAILER</button>
						</div>
					</div>
					<div className="flex items-center">
						<span className="h-[3px] w-[20px] bg-white rounded-md"></span>
						<div className="flex flex-col gap-[10px] text-white">
							<span>1</span>
							<span>2</span>
							<span>3</span>
							<span>4</span>
							<span>5</span>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section>
			<div className="mx-12 mt-12 flex justify-between items-center">
				<h1 className="font-bold text-4xl">Featured Movies</h1>
				<Link className="text-rose-600 text-lg font-normal hover:font-semibold">
					See more{" >"}
				</Link>
			</div>
			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-12 gap-16">
				{movies ? (
					movies.map((movie, index) => (
						<Card key={index} movie={movie} genres={genres} />
					))
				) : (
					<div className="flex justify-center text-rose-700">No data available. Check your network connection</div>
				)}
			</div>
		</section>
		<Footer />
    </main>
  )
}

export default HomePage