import { Link } from "react-router-dom";

export const ProfileAnalytics = ({ userData, posts }) => {
  const totalPostImpression = posts?.reduce(
    (total, data) => total + data?.postImpression || 0,
    0,
  );

  return (
    <>
      <h3 className="font-semibold text-gray-800 text-sm mb-3">
        Analytics Overview
      </h3>

      <div className="flex flex-col gap-2">
        <Link className="flex justify-between items-center py-1 border-b border-slate-100">
          <span className="text-xs text-gray-700 font-medium">
            Profile Views
          </span>
          <span className="text-sm font-bold text-blue-500">
            {userData?.ProfileViews?.length !== 0
              ? userData?.ProfileViews?.length
              : 0}
          </span>
        </Link>

        <div className="flex justify-between items-center py-1 border-b border-slate-100">
          <span className="text-xs text-gray-700 font-medium">
            Post Impressions
          </span>
          <span className="text-sm font-bold text-blue-500">
            {totalPostImpression}
          </span>
        </div>

        <div className="flex justify-between items-center py-1">
          <span className="text-xs text-gray-700 font-medium">Total Posts</span>
          <span className="text-sm font-bold text-gray-700">
            {posts?.length !== 0 ? posts?.length : 0}
          </span>
        </div>
      </div>
    </>
  );
};
