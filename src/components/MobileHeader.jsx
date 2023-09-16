import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import logo from "../assets/tv.svg";

const MobileHeader = ({ handleSideBar }) => {
	return (
		<nav className="navbar__stick p-4 sticky top-0 left-0 w-full z-10 border-gray-100 lg:hidden bg-blue-500">
			<div className="primary__nav block">
				<div className="flex justify-between lg:mx-24 md:mx-12">
                    <Link to="/" className="self-center lg:hidden">
                        <img src={ logo } height="50px" className="lg:hidden"/>
					</Link>
					<div className="flex gap-6 items-center">
						<span className="text-2xl text-white leading-none __text-change">MovieBox</span>
					</div>
					<div className="lg:hidden flex items-center">
						<button onClick={ handleSideBar } className="relative w-10 h-10 rounded-full flex justify-center bg-rose-700 items-center ring-2 ring-gray-800 __ring-change hover:bg-rose-900 hover:opacity-80">
							<span className="w-[18px] h-[2px] absolute rounded bg-white -translate-y-[5px]"></span>
							<span className="w-[18px] h-[2px] absolute rounded bg-white translate-y-[5px]"></span>
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

MobileHeader.propTypes = {
	handleSideBar: PropTypes.func.isRequired,
};

export default MobileHeader;
