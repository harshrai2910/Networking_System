import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

export const UserPost = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium">Activity</h1>
          <Link
            to="/profile/create-post"
            className="border-2 px-5 py-1 font-medium rounded-2xl border-blue-500 text-blue-500 shadow-sm
          hover:text-blue-600 hover:shadow-blue-200 transition-all"
          >
            Create Post
          </Link>
        </div>
        <div className="flex items-center justify-center border-t border-slate-300 mt-2 font-medium">
          <Link
            to="/profile/post"
            className="flex items-center justify-center gap-2 text-slate-700 px-20 py-2 cursor-pointer"
          >
            Show all posts
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </>
  );
};
