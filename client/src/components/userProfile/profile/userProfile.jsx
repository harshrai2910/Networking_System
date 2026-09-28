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
      <div className="relative">
        {userData.isProfileComplete && (
          <button
            onClick={() => showProfileEdit(true)}
            aria-label="Edit profile"
            className="absolute right-0 top-0 flex border-none p-2 items-center justify-center rounded-full transition-all duration-200 hover:bg-gray-100 active:scale-95"
          >
            <HiPencil className="text-xl" />
          </button>
        )}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          {/* Profile Info */}
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            {/* Avatar */}
            <div className="shrink-0">
              {userData.profile ? (
                <img
                  src={userData.profile}
                  alt={`${displayName || userData.username}'s profile`}
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-gray-100 sm:h-20 sm:w-20"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-2xl font-bold text-white ring-2 ring-blue-100 sm:h-20 sm:w-20 sm:text-3xl">
                  {getInitial()}
                </div>
              )}
            </div>
            {/* Name */}
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-gray-900 sm:text-2xl">
                {displayName || `@${userData.username}`}
              </h2>
              <p className="mt-0.5 truncate text-sm text-gray-500 sm:text-base">
                @{userData.username}
              </p>
            </div>
          </div>
          {/* Complete Profile */}
          {!userData.isProfileComplete && (
            <div className="w-full md:w-auto">
              <Link
                to={`/profile/isCompleted=${userData.isProfileComplete}`}
                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white active:scale-[0.98] md:w-auto"
              >
                <CiEdit className="text-lg transition-transform group-hover:scale-110" />
                <span>Complete your profile</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-slate-300 my-3 sm:my-3"></div>

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
              College:
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
