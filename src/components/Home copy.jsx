import { Link } from "react-router-dom";
import Header from "./Header";
import Card from "./Card";
import Footer from "./Footer";

const Home = ({ movies, heroMovie }) => {
	return (
		<main>
			<Header />
			<section className="border h-[30rem] bg-red-300">
				{heroMovie && (
					<div className="h-[30rem] w-full bg-red-600 overflow-y-hidden">
						<img
							src={`${posterBaseUrl}${heroMovie.poster_path}`}
							alt={heroMovie.title}
							data-testid="heroMovie-poster"
							className="h-auto w-full"
						/>
						<div className="absolute top-20">
							<p>Title: {heroMovie.title}</p>
							<p>Overview: {heroMovie.overview}</p>
						</div>
					</div>
				)}
			</section>

			<section className="h-full max-w-[99%] flex flex-col justify-center items-center pt-9">
				<div className="flex justify-between items-center w-[81%] my-8 mb-14">
					<h1 className="font-extrabold text-2xl">Featured Movies</h1>
					<Link className="text-pink-600 font-bold">
						See more{" >"}
					</Link>
				</div>
				<div className=" w-fit h-full flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-x-16 gap-y-28 ">
					{movies.map((movie) => (
						<Card key={movie.id} movie={movie} />
					))}
				</div>
			</section>
			<Footer />
		</main>
	);
};

export default Home;


// position: absolute;
// width: 1440px;
// height: 600px;
// left: 0px;
// top: 0px;

// background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(wp4643327-john-wick-3-parabellum-wallpapers.jpg);
