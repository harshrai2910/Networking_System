import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { CgSearch } from "react-icons/cg";
import { FaImages } from "react-icons/fa";
import { IoCreate, IoClose } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { Search } from "./search";
import { useEffect, useRef, useState } from "react";
import { postSearchFromServer } from "../../services/searchLinkServices";
import profileImg from "../../images/ProfileImg.png";

export const Navbar = ({
  isLogin,
  handleLogout,
  userData,
  setSearchResultData,
}) => {
  const [typer, setTyper] = useState("");
  const timer = useRef(null);
  const [searchData, setSearchData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClearSuggestions = () => {
    setSearchData([]);
  };

  const handleSearch = (event) => {
    setTyper(event.target.value);
  };

  useEffect(() => {
    if (typer) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(async () => {
      const res = await postSearchFromServer({ search: typer });
      setSearchData(res.searchResult);
    }, 500);

    // return or cleanup function
    return () => {
      clearTimeout(timer.current);
    };
  }, [timer, typer]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full border-b border-slate-300 bg-white px-4 sm:px-6 lg:px-10 py-2 sm:py-1 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-row items-center justify-between gap-4">
          {/* LEFT SECTION: Search */}
          <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg">
            <div className="flex items-center border border-slate-300 rounded-lg bg-slate-100 overflow-hidden">
              <span className="px-3 text-gray-500">
                <CgSearch />
              </span>
              <input
                type="text"
                value={typer}
                onChange={handleSearch}
                placeholder="Search..."
                className="w-full h-9 sm:h-10 bg-white outline-none px-2 text-sm"
              />
            </div>
            {/* Search Dropdown Results */}
            <div className="absolute top-12 left-0 w-full z-50">
              <Search
                searchData={searchData}
                setSearchResultData={setSearchResultData}
                onSelect={handleClearSuggestions}
              />
            </div>
          </div>

          {/* RIGHT SECTION: Links & Profile */}
          <div className="flex items-center justify-end gap-4 lg:gap-8 ml-auto">
            {isLogin ? (
              <>
                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center gap-6">
                  <Link
                    to="/"
                    className="flex flex-col items-center text-gray-600 hover:text-black text-xs font-medium"
                  >
                    <GoHomeFill className="text-xl" />
                    <span>Home</span>
                  </Link>
                  <Link
                    to="/profile/myNetwork"
                    className="flex flex-col items-center text-gray-600 hover:text-black text-xs font-medium"
                  >
                    <FaImages className="text-lg" />
                    <span>My Network</span>
                  </Link>
                  <Link
                    to="/profile/post"
                    className="flex flex-col items-center text-gray-600 hover:text-black text-xs font-medium"
                  >
                    <FaImages className="text-lg" />
                    <span>Posts</span>
                  </Link>
                  <Link
                    to="/profile/create-post"
                    className="flex flex-col items-center text-gray-600 hover:text-black text-xs font-medium"
                  >
                    <IoCreate className="text-xl" />
                    <span>Create Post</span>
                  </Link>
                </div>

                {/* Profile Button (Opens Sidebar) */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex flex-col items-center focus:outline-none"
                >
                  <img
                    src={userData.profile ? userData.profile : profileImg}
                    alt="Profile"
                    className="h-9 w-9 sm:h-6 sm:w-6 rounded-full object-cover border border-slate-200"
                  />
                  <div className="hidden sm:flex items-center mt-0.5">
                    <span className="text-xs text-gray-600 font-medium">
                      Me
                    </span>
                    <IoMdArrowDropdown className="text-xs text-gray-600" />
                  </div>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-600 text-xs sm:text-sm hover:text-blue-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* PROFILE SIDEBAR DRAWER */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <img
              src={userData.profile}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover border border-slate-300"
            />
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 text-sm">Harsh Rai</span>
              <Link
                to="/profile"
                className="text-xs text-blue-600 hover:underline"
              >
                View Profile
              </Link>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-2xl text-gray-500 hover:text-gray-800 p-1 hover:bg-slate-200 rounded-md transition-colors"
          >
            <IoClose />
          </button>
        </div>

        {/* Sidebar Navigation Links (Responsive + Profile Settings) */}
        <div className="flex flex-col py-2 overflow-y-auto h-[calc(100vh-80px)]">
          {/* Mobile Only Links (Hidden on Desktop) */}
          <div className="lg:hidden flex flex-col border-b border-slate-200 pb-2 mb-2">
            <Link
              to="/"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-slate-100 font-medium"
            >
              <GoHomeFill className="text-xl text-gray-500" /> Home
            </Link>
            <Link
              to="/profile/myNetwork"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-slate-100 font-medium"
            >
              <FaImages className="text-xl text-gray-500" /> My Network
            </Link>
            <Link
              to="/profile/post"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-slate-100 font-medium"
            >
              <FaImages className="text-xl text-gray-500" /> Posts
            </Link>
            <Link
              to="/profile/create-post"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-slate-100 font-medium"
            >
              <IoCreate className="text-xl text-gray-500" /> Create Post
            </Link>
          </div>

          <button
            onClick={() => handleLogout(true)}
            className="w-full text-left px-6 py-3 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};
