import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiPencil } from "react-icons/hi2";
import { useState } from "react";
import { EditProfile } from "./EditProfile";

export const UserProfile = ({ userData, setUserData }) => {
  const [profileEdit, showProfileEdit] = useState(false);

  if (!userData || Object.keys(userData).length === 0) return null;

  const firstCapital = (clgName = "") => {
    return clgName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getInitial = () => {
    if (userData.username) return userData.username.charAt(0).toUpperCase();
    return "U";
  };

  const displayName = [userData.firstName, userData.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className="flex justify-between items-start flex-col md:flex-row gap-3 md:gap-0">
        <div className="flex items-center gap-6">
          {/* Avatar with Image Fallback */}
          {userData.profile ? (
            <img
              src={userData.profile}
              alt="profile"
              className="h-16 w-16 sm:h-24 sm:w-24 rounded-full object-cover shadow-lg"
            />
          ) : (
            <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-blue-500 text-white font-bold text-2xl sm:text-4xl flex items-center justify-center shadow-lg">
              {getInitial()}
            </div>
          )}

          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              {displayName || `@${userData.username}`}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              @{userData.username}
            </p>
          </div>
        </div>

        {!userData.isProfileComplete ? (
          <div className="flex justify-center w-full md:w-xs">
            <Link
              to={`/profile/isCompleted=${userData.isProfileComplete}`}
              className="inline-flex w-full md:w-xs items-center justify-center gap-2 px-4 py-2 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium shadow-sm transition-all duration-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow active:scale-95"
            >
              <CiEdit className="text-lg" />
              <span>Complete your profile</span>
            </Link>
          </div>
        ) : (
          <div>
            <button
              onClick={() => showProfileEdit(true)}
              className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <HiPencil className="font-bold text-xl text-gray-700" />
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-slate-300 my-3 sm:my-4"></div>

      {/* Details Section (Renders conditionally) */}
      <div className="space-y-2">
        {userData.headline && (
          <h1 className="text-[15px] sm:text-[17px] font-bold text-gray-900">
            {userData.headline}
          </h1>
        )}

        {userData.about && (
          <p className="text-[13px] sm:text-[15px] font-medium text-gray-700 line-clamp-3">
            {userData.about}
          </p>
        )}

        {/* Badges: Render tabhi honge jab content available ho */}
        {(userData.course || userData.gradYear) && (
          <div className="flex flex-wrap gap-2 my-3 text-xs sm:text-sm font-semibold">
            {userData.course && (
              <span className="px-3 py-1 bg-blue-600 text-white rounded-2xl">
                {userData.course.toUpperCase()}
              </span>
            )}
            {userData.gradYear && (
              <span className="px-3 py-1 bg-blue-600 text-white rounded-2xl">
                {userData.gradYear}
              </span>
            )}
          </div>
        )}

        <div>
          {userData.clgName && (
            <p className="text-xs sm:text-sm font-bold text-gray-800">
              College:{" "}
              <span className="font-normal text-gray-600">
                {firstCapital(userData.clgName)}
              </span>
            </p>
          )}

          {userData.email && (
            <p className="text-xs sm:text-sm text-blue-600 font-medium">
              {userData.email}
            </p>
          )}
        </div>
      </div>

      {profileEdit && (
        <EditProfile
          showProfileEdit={showProfileEdit}
          profileEdit={profileEdit}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </>
  );
};
