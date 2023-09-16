import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faHome, faTv, faVideoCamera, faCalendar, faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "../assets/tv.svg";
import PropTypes from 'prop-types';

const SideBar = ({closeSideBar, origin}) => {
  const SideBarMenu = [
    {
      title: "Home",
      icon: faHome,
      route: "/",
      active: origin=='home'?true:false
    },
    {
      title: "Movies",
      icon: faVideoCamera,
      route: "#",
      active: origin=='movie'?true:false
    },
    {
      title: "TV Series",
      icon: faTv,
      route: "",
      active: false
    },
    {
      title: "Upcoming",
      icon: faCalendar,
      route: "",
      active: false
    },
  ];

  return (
    <div className="border-r-2 border-y-2 rounded-r-[45px] w-full bg-white relative">
        <button onClick={ closeSideBar } className="absolute top-6 right-6 w-10 h-10 rounded-full flex justify-center bg-rose-700 items-center ring-2 ring-gray-800 __ring-change hover:bg-rose-900 hover:opacity-80 text-white lg:hidden">
            <FontAwesomeIcon icon={faClose} />
        </button>
      <div className="flex flex-col pt-[50px] items-center">
        <div className="flex gap-[24px] items-center">
          <div>
            <img src={logo} />
          </div>
          <p className="text-[24px] text-black font-bold">MovieBox</p>
        </div>

        <div className=" flex flex-col pl-4 pr-3 justify-between w-full">
          <div className="mt-[50px]">
            <div className="flex flex-col">
            {SideBarMenu.map((item, index) => (
                <Link to={ item.route } key={index} >
                    <div className={`flex px-[20px] cursor-pointer items-center gap-[10px] py-[28px]  text-gray-600 hover:text-gray-950 ${item.active? ' border-r-4 border-rose-700 bg-red-100':'hover:bg-red-100'}`}>
                        <div className="mr-3 mt-[5px] text-[20px] font-semibold">
                            <FontAwesomeIcon icon={item.icon} />
                        </div>
                        <p className="text-[20px] font-semibold">
                            {item.title}
                        </p>
                    </div>
                </Link>
            ))}
              </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-7 px-[16px] rounded-[20px] gap-[9px] bg-[#f8e7eb] w-[170px] border border-[#BE123C]">
          <p className="text-[15px] font-bold text-[#333333CC] mt-[42px]">
            Play movie quizes and earn free tickets
          </p>
          <p className="text-[12px] text-[#666666]">
            50k people are playing now
          </p>
          <button className="text-[12px] h-[30px] w-[112px] mb-[16px] text-[#BE123C] bg-[#d94e718c] hover:bg-[#241e1f8c] font-semibold rounded-[30px]">
            Start Playing
          </button>
        </div>

        <div className="flex flex-[10px] w-full mt-[44px] mb-[69px] px-[20px] cursor-pointer text-gray-600 hover:text-gray-950 ">
          <div className="mr-3 mt-[5px] text-[20px] font-semibold">
                <FontAwesomeIcon icon={faPowerOff} />
          </div>
          <p className="text-[20px] font-semibold">
            Log out
          </p>
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
	closeSideBar: PropTypes.func.isRequired,
    origin: PropTypes.string.isRequired,
};

export default SideBar;