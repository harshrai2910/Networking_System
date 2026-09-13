import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiPencil } from "react-icons/hi2";

export const UserProfile = ({ userData }) => {
  const firstCapital = (clgName = "") => {
    return clgName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      {userData.length !== 0 && (
        <>
          <div className="flex justify-between">
            <div className="flex items-center gap-6">
              <div>
                <img
                  src={userData.profile}
                  alt="profile"
                  className="h-15 w-15 sm:h-24 sm:w-24 rounded-full object-cover shadow-lg"
                />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-gray-600">@{userData.username}</p>
              </div>
            </div>

            {!userData.isProfileComplete ? (
              <div className="flex items-center">
                <Link
                  to={`/profile/isCompleted=${userData.isProfileComplete}`}
                  className="border px-3 py-1 rounded-xl border-blue-800 bg-blue-50 shadow-sm shadow-sky-100 flex items-center gap-2"
                >
                  <CiEdit />
                  Complete your profile
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  to="/profile/edit=true"
                  className="inline-flex items-center justify-center border-none p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <HiPencil className="font-bold text-xl" />
                </Link>
              </div>
            )}
          </div>
          <div className="border-t border-slate-300 my-3 sm:my-4 "></div>
          <div>
            <h1 className="text-[15px] sm:text-[17px] font-bold ">
              {userData.headline}
            </h1>
            <p className="text-[12px] sm:text-[15px] font-medium text-gray-700 line-clamp-3">
              {userData.about}
            </p>
            <div className="flex gap-3 my-3 text-sm sm:text-lg">
              <button className="border-none px-3 py-1 bg-blue-600 text-white rounded-2xl">
                {userData.course?.toUpperCase()}
              </button>
              <button className="border-none px-3 py-1 bg-blue-600 text-white rounded-2xl">
                {userData.gradYear}
              </button>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold">
                College:{" "}
                <span className="font-normal">
                  {firstCapital(userData.clgName)}
                </span>
              </p>
              <p className="text-xs sm:text-sm text-blue-600">
                {userData.email}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
