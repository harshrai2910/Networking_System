import { useState } from "react";
import { useEffect } from "react";
import { PostCard } from "./PostCard";
import { getAllPostsFromServer } from "../../services/userPostLinkServices";
import { Sm_loader } from "../Sm_Loader";

export const ShowAllPost = ({ AllPosts, userData, setAllPosts }) => {
  const [skip, setSkip] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [loader, setLoader] = useState(false);

  const handleLoadMore = () => {
    setLoader(true);
    getAllPostsFromServer(skip).then((result) => {
      setAllPosts((prev) => [...prev, ...result.usersPost]);
      setHasMore(result.hasMore);
      setSkip((prev) => prev + 5);
      setLoader(false);
    });
  };

  useEffect(() => {
    if (AllPosts) {
      setAllPosts(AllPosts);
    }
  }, [AllPosts]);

  return (
    <>
      <div className="flex flex-col md:gap-4 gap-2">
        <h1 className="font-medium text-xl hidden md:block">All Activity</h1>
        {AllPosts?.length === 0 && (
          <h1 className="font-medium text-sm text-gray-500">
            No post created Yet
          </h1>
        )}
        {AllPosts?.map((post) => (
          <PostCard
            post={post}
            postId={post.id}
            userData={userData}
            setAllPosts={setAllPosts}
          />
        ))}

        <div className="flex items-center justify-center">
          {hasMore && (
            <button
              onClick={() => handleLoadMore()}
              className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium text-sm shadow-sm hover:bg-gray-50
               hover:border-gray-400 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 inline-flex
                items-center justify-center min-w-30"
            >
              {loader ? <Sm_loader /> : "Load more"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
