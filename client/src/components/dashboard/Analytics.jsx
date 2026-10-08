import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getPostFromServer } from "../../services/userPostLinkServices";

export const Analytics = ({ userData }) => {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    try {
      getPostFromServer().then((result) => {
        setPost(result?.post);
      });
    } catch (err) {
      console.log(err);
      setPost([]);
    }
  }, []);

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
        <Link
          to="/analytics/profile-views"
          className="flex justify-between items-center py-1 border-b border-slate-100 hover:bg-blue-100 hover:px-2 rounded-lg transition-all"
        >
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
          <span className="text-sm font-bold text-gray-700">
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
