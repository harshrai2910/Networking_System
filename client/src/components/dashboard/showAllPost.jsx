import { useState } from "react";
import { useEffect } from "react";
import { PostCard } from "./PostCard";

export const ShowAllPost = ({ AllPosts, userData }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (AllPosts) {
      setPosts(AllPosts);
    }
  }, [AllPosts]);

  return (
    <>
      <div className="flex flex-col md:gap-4 gap-2">
        <h1 className="font-medium text-xl hidden md:block">All Activity</h1>
        {posts?.length === 0 && (
          <h1 className="font-medium text-sm text-gray-500">
            No post created Yet
          </h1>
        )}
        {posts?.map((post) => (
          <PostCard
            post={post}
            postId={post.id}
            userData={userData}
            setPosts={setPosts}
          />
        ))}
      </div>
    </>
  );
};
