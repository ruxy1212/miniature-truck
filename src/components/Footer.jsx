import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faYoutube, } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	const d = new Date();
	return (
		<footer className="w-full h-fit bg-white flex flex-col justify-center items-center text-gray-900 gap-7">
			<div className="flex justify-evenly items-center w-1/2 md:w-[30%] mt-24 text-2xl">
				<Link className="hover:text-rose-950">
					<FontAwesomeIcon icon={faFacebook} />
				</Link>
				<Link className="hover:text-rose-950">
					<FontAwesomeIcon icon={faInstagram} />
				</Link>
				<Link className="hover:text-rose-950">
					<FontAwesomeIcon icon={faTwitter} />
				</Link>
				<Link className="hover:text-rose-950">
					<FontAwesomeIcon icon={faYoutube} />
				</Link>
			</div>
			<div className="w-full md:w-3/5 flex justify-evenly items-center">
				<Link className="text-gray-900 hover:text-gray-700 text-lg font-bold">Conditions of Use</Link>
				<Link className="text-gray-900 hover:text-gray-700 text-lg font-bold">Privacys & Policies</Link>
				<Link className="text-gray-900 hover:text-gray-700 text-lg font-bold">Press Room</Link>
			</div>
			<div className="text-gray-500 text-lg font-bold pb-8">
				&copy; {d.getFullYear()} MovieBox by PURE
			</div>
		</footer>
	);
};

export default Footer;
