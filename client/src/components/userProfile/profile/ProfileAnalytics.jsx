import { Link } from "react-router-dom";
import {
  FiEye,
  FiTrendingUp,
  FiFileText,
  FiChevronRight,
} from "react-icons/fi";

export const ProfileAnalytics = ({ userData, posts }) => {
  const totalPostImpression =
    posts?.reduce((total, data) => total + (data?.postImpression || 0), 0) || 0;

  const profileViewsCount = userData?.ProfileViews?.length || 0;
  const totalPostsCount = posts?.length || 0;

  return (
    <>
      <div className="flex items-center justify-between sm:mb-4 mb-3">
        <h3 className="text-lg font-medium">Analytics Overview</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 sm:gap-2 gap-1 ">
        <Link
          to="/analytics/profile-views"
          className="group flex items-center justify-between p-3 rounded-lg border border-gray-100 shadow-xs hover:border-blue-100 hover:bg-slate-50 transition-all duration-150"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FiEye className="w-4 h-4" />
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-700 group-hover:text-gray-900">
                Profile Views
              </p>

              <p className="text-[10px] text-gray-400">Total profile visits</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-blue-500">
              {profileViewsCount.toLocaleString()}
            </span>

            <FiChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>

        <div className="flex items-center justify-between p-3 rounded-lg border shadow-xs border-gray-100 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <FiTrendingUp className="w-4 h-4" />
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-700">
                Post Impressions
              </p>

              <p className="text-[10px] text-gray-400">Content reach & views</p>
            </div>
          </div>

          <span className="text-sm font-bold text-gray-900">
            {totalPostImpression.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border shadow-xs border-gray-100 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
              <FiFileText className="w-4 h-4" />
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-700">Total Posts</p>

              <p className="text-[10px] text-gray-400">Published contents</p>
            </div>
          </div>

          <span className="text-sm font-bold text-gray-900">
            {totalPostsCount.toLocaleString()}
          </span>
        </div>
      </div>
    </>
  );
};
