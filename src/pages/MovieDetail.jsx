import { useEffect, useState } from "react";
import Header from "../components/MobileHeader";
import Footer from "../components/Footer";
import axios from "../../api/axios";
import { format } from 'date-fns';
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faChevronDown, faStar, faBookmark, faShare, faHeart, faRecordVinyl, faList } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../components/SideBar";

const MovieDetail = () => { 
    const [movieDetail, setMovieDetail] = useState([]);
    const [recentList, setRecentList] = useState([]);
	const baseUrl = "https://image.tmdb.org/t/p/w500";

    useEffect(() => {
		const getMovie = async () => {
            try {
                const urlParams = window.location.pathname.split('/'); 
                const movie_id = urlParams[urlParams.length-1];
                const apiKey = import.meta.env.VITE__TMDB_API_KEY;
                const resD = await axios.get(`/movie/${movie_id}?api_key=${apiKey}&language=en-US`);
                const resT = await axios.get(`/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`);
            if (resD.status === 200 && resT.status === 200) {
                    setMovieDetail(resD.data);
                    setRecentList(resT.data.results.slice(0, 3));
                }else{
                    console.log("Something went wrong");
                }
            } catch(error){
                console.error("Error fetching movie details:", error);
            }
        };
        getMovie();
    }, []);
    const date = new Date(movieDetail.release_date);
    // const time = (movieDetail.runtime/60).toFixed(0)+'h '+(movieDetail.runtime%60).toFixed(0)+'m';
    const time = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const today = new Date();
    const tMonth = format(today, 'MMMM');
    const awards = Math.floor(Math.random() * 10)+1;
    const [isActive0, setIsActive0] = useState(false);
    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleSideBar = () => {
        setIsActive(!isActive);
    };

	const toggleIcon0 = () => {
		setIsActive0(!isActive0);
	};
    const toggleIcon1 = () => {
		setIsActive1(!isActive1);
	};
    const toggleIcon2 = () => {
		setIsActive2(!isActive2);
	};
    function nFormat(n) {
        if (n >= 1000000000) {
          return (n / 1000000000).toFixed(1) + "B";
        } else if (n >= 1000000) {
          return (n / 1000000).toFixed(1) + "M";
        } else if (n >= 1000) {
          return (n / 1000).toFixed(1) + "k";
        } else {
          return n?.toString();
        }
    }
      
  return (
    <>
        <Header handleSideBar={handleSideBar} />
        <div className="flex justify-center">
            <div className={`w-[80%] top-0 left-0 z-20 lg:w-[20%] h-full lg:h-auto overflow-auto lg:overflow-hidden lg:flex fixed lg:relative ${isActive? 'block' : 'hidden'} }`}> 
                <SideBar closeSideBar={handleSideBar}  origin="movie" />
            </div>
            <main className="w-[95%] lg:w-[80%] ">
                { movieDetail && (movieDetail.title || movieDetail.original_name) ? (
                    <div className="w-full mt-10 px-5">
                        <ToastContainer />
                        <div className="relative">
                            <img className="w-full h-[449px] hover:p-2 hover:opacity-80 cursor-pointer object-cover rounded-[20px]" src={`${baseUrl}${movieDetail.backdrop_path}`} alt={ movieDetail && (movieDetail.title ?? movieDetail?.original_name) } />
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="rounded-full bg-slate-200/25 text-white h-28 w-28 flex items-center justify-center flex-col hover:bg-rose-700/50 cursor-pointer">
                                    <FontAwesomeIcon className="h-14 w-16" icon={faPlay} />
                                </span>
                                <span className="font-medium text-xl text-[#E8E8E8]">Watch Trailer</span>
                            </div>   
                        </div>
                        <div className="flex flex-col flex-wrap md:flex-nowrap sm:flex-row gap-8 sm:justify-between mt-[32px]">
                            <div className="w-full md:w-[66%] flex flex-col">
                                <div className="flex gap-6 flex-wrap md:flex-nowrap">
                                    <div className="text-xl font-semibold w-full md:w-[70%]">
                                        <div className="inline-block">
                                            <span className={`rounded-full ${movieDetail.adult?' bg-rose-700':' bg-blue-700'}  text-white h-8 w-8 flex items-center justify-center`}>{movieDetail.adult? '18+':'G'}</span>
                                        </div>&emsp;
                                        <div className="inline-block">
                                            <span data-testid="movie-title">{ movieDetail && (movieDetail.title ?? movieDetail?.original_name) }</span>&nbsp;•&nbsp;
                                            <span>{date.getFullYear()}</span>&nbsp;•&nbsp;
                                            <span><span data-testid="movie-runtime">{movieDetail.runtime}</span>m</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 flex-wrap w-full md:w-[30%]">
                                        {movieDetail.genres && movieDetail.genres.map((genre) => (
                                            <span key={genre.id} className="text-[#B91C1C] border flex justify-center items-center py-[1px] px-[10px] border-[#F8E7EB] rounded-[15px] text-sm cursor-default h-[25px]">{genre.name}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-800 py-4 text-lg" data-testid="movie-overview">{movieDetail.overview}</p>
                                <div className="text-gray-800 py-4 text-lg">
                                    <p className="my-4">Producer(s): <span className="text-rose-700">
                                        {movieDetail.production_companies && movieDetail.production_companies.map((company, index) => (<span key={index} className="p-[2px] mx-[4px] bg-gray-200">{company.name}</span>))}
                                        </span></p>
                                    <p className="my-4">Language(s): <span className="text-rose-700">{ 
                                        movieDetail.spoken_languages && movieDetail.spoken_languages.map((language, index) => (
                                            <span key={index} className="p-[2px] mx-[4px] bg-gray-200">{language.english_name}</span>
                                        ))
                                    }</span></p>
                                    <p className="my-4">Tagline: <span className="italic text-rose-700">{movieDetail.tagline}</span></p>
                                    <p className="my-4">Date Released: <span className="italic text-rose-700" data-testid="movie-release-date">{movieDetail.release_date}</span></p>
                                    <p className="my-4">Released Date (in UTC): <span className="italic text-rose-700">{time.toISOString()}</span></p>
                                </div>
                                <div className="my-12 border border-gray-300 rounded-xl w-full h-[50px] flex ">
                                    <span className="text-gray-100 text-base rounded-xl bg-rose-700 px-6 h-full flex items-center leading-none">Top Rated Movie #{movieDetail.popularity && ((movieDetail?.popularity.toFixed(0)))}</span>
                                    <span className="pl-6 pr-2 h-full flex items-center text-gray-700 text-lg justify-between gap-12 leading-none">Award: {awards} Nominations<FontAwesomeIcon icon={faChevronDown} /></span>
                                </div>
                            </div>
                            <div className="w-full md:w-[34%] flex flex-col gap-5">
                                <div className="flex justify-end gap-3">
                                    <FontAwesomeIcon className="text-xl text-yellow-600" icon={faStar} />
                                    <span className="text-xl text-gray-500">{ movieDetail.vote_average.toFixed(1) }</span>
                                    <span className="text-lg text-gray-800">|</span>
                                    <span className="text-lg text-gray-800">{ nFormat(movieDetail.vote_count) }</span>
                                </div>
                                <div className="flex justify-around">
                                    <FontAwesomeIcon className={`p-1 text-xl cursor-pointer rounded-sm ${isActive0?' bg-gray-100 hover:bg-gray-200 text-rose-700 hover:text-rose-950':' bg-rose-300 hover:bg-gray-200 text-gray-300 hover:text-rose-300'} `} icon={faBookmark} onClick={toggleIcon0} />
                                    <FontAwesomeIcon className={`p-1 text-xl cursor-pointer rounded-sm ${isActive1?' bg-gray-100 hover:bg-gray-200 text-rose-700 hover:text-rose-950':' bg-rose-300 hover:bg-gray-200 text-gray-300 hover:text-rose-300'} `} icon={faShare} onClick={toggleIcon1} />
                                    <FontAwesomeIcon className={`p-1 text-xl cursor-pointer rounded-sm ${isActive2?' bg-gray-100 hover:bg-gray-200 text-rose-700 hover:text-rose-950':' bg-rose-300 hover:bg-gray-200 text-gray-300 hover:text-rose-300'} `} icon={faHeart} onClick={toggleIcon2} />
                                </div>
                                <div className="flex flex-col gap-6">
                                    <span className="text-gray-100 h-[50px] text-lg rounded-xl bg-rose-700 px-6 w-full flex items-center justify-center cursor-pointer hover:bg-rose-950"><FontAwesomeIcon icon={faRecordVinyl} />&emsp;See Showtimes</span>
                                    <span className="text-gray-100 h-[50px] text-lg rounded-xl bg-rose-700 px-6 w-full flex items-center justify-center cursor-pointer hover:bg-rose-950"><FontAwesomeIcon icon={faList} />&emsp;More watch options</span>
                                </div>
                                <div className="relative rounded-xl cursor-pointer">
                                    <div className="absolute bottom-0 w-full bg-black/50 text-white text-xs py-1 px-2">
                                        <FontAwesomeIcon icon={faList} />&emsp;The best movies and shows in {tMonth}
                                    </div>
                                    <div className="flex">
                                        {
                                            recentList.map((recent, index) => (
                                                <img src={`${baseUrl}${recent.poster_path}`} key={index} className="w-[33.33%]"/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                ) : (
                    <div className="flex justify-center text-rose-700">No data available. Check your network connection</div>
                )}                
                <Footer />   
            </main>
        </div>
    </>
  );
}

export default MovieDetail
