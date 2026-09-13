import { GoShieldCheck } from "react-icons/go";
import { Link } from "react-router-dom";
import profileImg from "../../images/ProfileImg.png";

export const ProfileServices = ({ userData }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <Link to="/profile" className="inline-block group">
          <img
            src={
              userData?.profile
                ? `http://localhost:3006/uploads/profile/${userData.profile}`
                : profileImg
            }
            alt={userData?.username || "User Profile"}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-blue-500 transition-all"
          />
        </Link>

        <span title="Verified Profile">
          <GoShieldCheck className="text-2xl text-blue-600 hover:text-blue-700 transition-colors" />
        </span>
      </div>

      {/* User Details */}
      <div className="flex flex-col gap-3">
        {/* Name & Handle */}
        <div>
          <Link to="/profile" className="group">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              {userData?.firstName} {userData?.lastName}
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-medium">
              @{userData?.username}
            </p>
          </Link>
        </div>

        {/* Headline & Location */}
        <div className="space-y-1">
          <Link to="/profile" className="block">
            <p className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 line-clamp-2 leading-relaxed">
              {userData?.headline || "No headline provided"}
            </p>
          </Link>

          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
            {userData?.location || "India"}
          </p>
        </div>
      </div>
    </div>
  );
};
