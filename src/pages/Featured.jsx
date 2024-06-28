import { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import Header from "../components/MobileHeader";
import Card from "../components/Card";
import Footer from "../components/Footer";
import axios from "../../api/axios";
import SideBar from "../components/SideBar";
import ClickListener from "../utils/ClickListener";

const Featured = () => { 
	const [movies, setMovies] = useState([]);
	const [genres, setGenre] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [isChangeValid, setChangeValid] = useState(false);

    const getFeatured = async () => {
        try {
            const apiKey = import.meta.env.VITE__TMDB_API_KEY;
            const resT = await axios.get(`/movie/top_rated?api_key=${apiKey}&language=en-US&page=${currentPage+1}`);
            const resG = await axios.get(`/genre/movie/list?api_key=${apiKey}&language=en`);
            if (resT.status === 200 && resG.status === 200) {
                const topMovies = resT.data.results.slice(0, 20);
                const allGenres = resG.data.genres;
                setMovies(topMovies);
                setGenre(allGenres);
                setPageCount(resT.data.total_pages);
                setChangeValid(true);
            }
        } catch (error) {
            console.error("Error fetching featured movies:", error);
        }
    };

    const memoizedGetFeatured = useCallback(getFeatured, [currentPage]);
        
    useEffect(() => {
        memoizedGetFeatured();
    }, [currentPage, memoizedGetFeatured]);
        
    const handlePageChange = (selectedObject) => {
        if(isChangeValid) setCurrentPage(selectedObject.selected);
        setChangeValid(false);
    };

    const [isActive, setIsActive] = useState(false);

    const handleSideBar = () => {
        setIsActive(!isActive);
    };

    const handleOutsideClick = () => {
        // if(isActive) setIsActive(false);
    }
    // 
  return (
    <>
        <Header handleSideBar={handleSideBar} />
        <div className="flex justify-center">
            <div className={`transition-[width] ease-in-out duration-500 top-0 left-0 z-20 lg:w-[20%] h-full lg:h-auto overflow-auto lg:overflow-hidden lg:flex fixed lg:relative ${isActive? 'w-[80%]' : 'w-0'} }`}> 
                <ClickListener onClickOutside={ handleOutsideClick } className={ ` ${isActive? 'visible' : 'invisible'} ` }>
                    <SideBar closeSideBar={ handleSideBar }  origin="featured" />
                </ClickListener>
            </div>
            <main className="w-[95%] lg:w-[80%]">
                { movies.length > 0 ? (
                    <div className="w-full mt-10 px-5">
                        <section>
                            <div className="mx-12 mt-12 flex justify-between items-center">
                                <h1 className="font-bold text-4xl text-center md:text-left">Featured Movies</h1>
                            </div>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 m-12 gap-16">
                                {movies ? (
                                    movies.map((movie, index) => (
                                        <Card key={index} movie={movie} genres={genres} origin="featured"/>
                                    ))
                                ) : (
                                    <div className="flex justify-center text-rose-700">No data available. Check your network connection</div>
                                )}
                            </div>
                            <div>
                                {movies &&
                                    <ReactPaginate pageCount={pageCount} pageRange={3} marginPagesDisplayed={2} onPageChange={handlePageChange} containerClassName={'flex px-4 py-2 bg-red-100 rounded-md justify-between md:justify-center gap-3 items-center text-gray-800'} disabledClassNae={'disabled'} previousClassName={'h-10 w-10 rounded-full border border-rose-700 flex justify-center items-center mx-3 bg-white/50 hover:bg-rose-700/75 hover:text-white'} nextClassName={'h-10 w-10 rounded-full border border-rose-700 flex justify-center items-center mx-3 bg-white/50 hover:bg-rose-700/75 hover:text-white'} previousLabel={'<'} nextLabel={'>'} pageClassName={'border border-rose-700/50 rounded-lg py-1.5 px-2.5 hover:bg-rose-700/75 hover:text-white hidden md:block'} breakClassName={'__rp_page hidden md:block'} activeClassName={'border-2 border-rose-700 bg-rose-700 text-white font-bold __rp_block'} />
                                }
                            </div>
                        </section>
                    </div> 
                ) : (
                    <div className="flex justify-center text-rose-700 h-full items-center">No data available. Check your network connection</div>
                )}                
                <Footer />   
            </main>
        </div>
    </>
  );
}

export default Featured
