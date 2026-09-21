import { PiStudentBold } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import img_01 from "../../assets/img_01.png";
import img_02 from "../../assets/img_02.png";
import img_03 from "../../assets/img_03.png";
import img_07 from "../../assets/img_07.png";

export const TopLeft = () => {
  return (
    <>
      {/* Badge */}
      <div className="w-fit px-3 py-2 bg-blue-100 text-blue-600 flex items-center justify-center rounded-xl gap-2 mb-2">
        <span>
          <PiStudentBold className="font-extrabold text-sm" />
        </span>

        <p className="text-xs font-medium">A Student Networking Platform</p>
      </div>

      {/* Heading */}
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5">
        <h1>Connect. Share.</h1>

        <span className="text-blue-700">Grow Together.</span>
      </div>

      {/* Description */}
      <div className="w-full flex items-start justify-between gap-10">
        <p className="w-full max-w-lg font-medium text-sm mb-4">
          ConnectSD is a student networking platform to showcase your skills,
          share your projects, connect with like-minded peers and be part of a
          growing student community.
        </p>

        <img src={img_07} alt="" className="h-13 hidden md:block shrink-0" />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Link
          to="/signup"
          className="px-5 py-2 rounded-lg bg-blue-500 flex items-center justify-center gap-2 text-white font-medium cursor-pointer"
        >
          Get Started
          <span>
            <IoIosArrowRoundForward className="text-2xl" />
          </span>
        </Link>

        <Link
          to="/login"
          className="px-5 py-2 border-2 border-blue-500 rounded-lg text-blue-500 font-medium cursor-pointer"
        >
          Login
        </Link>
      </div>

      {/* Community */}
      <div className="w-full flex items-center gap-3">
        <span className="flex items-center shrink-0">
          <img src={img_01} alt="Student" className="h-8" />
          <img src={img_02} alt="Student" className="h-8" />
          <img src={img_03} alt="Student" className="h-8" />
        </span>

        <p className="font-medium text-sm">
          join a growing community of students
        </p>
      </div>
    </>
  );
};
