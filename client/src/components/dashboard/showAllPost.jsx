import { useState } from "react";
import { useEffect } from "react";
import { PostCard } from "./PostCard";
import { getAllPostsFromServer } from "../../services/userPostLinkServices";
import { Sm_loader } from "../Sm_Loader";
import InfiniteScroll from "react-infinite-scroll-component";

export const ShowAllPost = ({ AllPosts, userData, setAllPosts }) => {
  const [skip, setSkip] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [loader, setLoader] = useState(false);

  const handlefetchMore = () => {
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
        <InfiniteScroll
          dataLength={AllPosts.length}
          next={handlefetchMore}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center mt-4">
              <div className="inline-flex justify-center items-center space-x-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-duration:0.6s] [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-duration:0.6s] [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-duration:0.6s]"></div>
              </div>
            </div>
          }
        >
          {AllPosts?.map((post) => (
            <PostCard
              post={post}
              postId={post.id}
              userData={userData}
              setAllPosts={setAllPosts}
            />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};
