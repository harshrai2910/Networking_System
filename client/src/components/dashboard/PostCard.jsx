import { Link } from "react-router-dom";
import {
  postImpressionFromServer,
  putLikesFromServer,
} from "../../services/userPostLinkServices";
import { postfollowRequestFromServer } from "../../services/networkLinkServices";
import { GoShieldCheck } from "react-icons/go";
import { FaRegCommentDots } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";
import profileImg from "../../images/ProfileImg.png";
import { useEffect, useRef } from "react";

export const PostCard = ({ post, postId, userData, setPosts }) => {
  const postRef = useRef(null);

  // increment/decrement like count to improve UX
  const handleLikeClick = async (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post._id !== postId) return post;

        const isLiked = post.likes.includes(userData._id);

        return {
          ...post,
          likes: !isLiked
            ? [...post.likes, userData._id]
            : post.likes.filter((id) => id != userData._id),
        };
      }),
    );

    // API call for the like count to backend
    try {
      await putLikesFromServer(postId);
    } catch (err) {
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, likes: post.likes.filter((id) => id != userData._id) }
            : post,
        ),
      );
    }
  };

  const handleFollow = async (userId) => {
    await postfollowRequestFromServer({ receiverId: userId });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entities) => {
        // information about intersation of observed elem
        entities.forEach((entry) => {
          // true/false
          if (entry.isIntersecting) {
            recordImpression(post._id); // function to call backend API
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    if (postRef.current) {
      observer.observe(postRef.current);
    }

    return () => observer.disconnect();
  }, [post._id]);

  const recordImpression = async (postId) => {
    await postImpressionFromServer(postId);
  };

  return (
    <div
      key={postId}
      ref={postRef}
      className="flex flex-col gap-2 sm:border border-y border-slate-300 sm:rounded-lg sm:shadow-xs bg-white"
    >
      <div className="flex gap-2 items-center sm:p-4 p-3 pb-2">
        <Link
          to={
            userData._id === post.UserId._id
              ? "/profile"
              : `/profile/search=true/${post.UserId._id}`
          }
          className="relative shrink-0"
        >
          <img
            src={post.UserId.profile ? `${post.UserId.profile}` : profileImg}
            alt=""
            className="h-10 w-10 sm:h-15 sm:w-15 rounded-full object-cover shadow-sm"
          />
        </Link>
        <div className="w-full">
          <div className="flex items-start justify-between">
            <Link
              to={`/profile/search=true/${post.UserId._id}`}
              className="flex items-center gap-1"
            >
              <h1 className="sm:text-lg text-sm font-medium">
                {post.UserId.firstName} {post.UserId.lastName}
              </h1>

              <GoShieldCheck />
            </Link>
          </div>
          <div>
            <p className="text-xs text-gray-500 line-clamp-1">
              {post.UserId.headline}
            </p>
          </div>
        </div>
        <div>
          {userData._id !== post.UserId._id && (
            <button
              onClick={() => handleFollow(post.UserId._id)}
              className="text-blue-500 font-bold flex gap-1 items-center cursor-pointer"
            >
              {post.isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>
      </div>

      <div className="sm:px-4 px-2">{post.content}</div>

      <div>
        <img
          src={post.postImage}
          alt=""
          className="w-full h-auto max-h-150 object-contain"
        />
      </div>

      <div>
        <div className="p-2 border-slate-300 flex gap-2 items-center">
          <div className="border rounded-full border-blue-500 bg-blue-100 p-1">
            <BiSolidLike className="text-blue-500 transform scale-x-[-1]" />
          </div>

          <span>{post.likes.length}</span>
        </div>

        <div className="grid grid-cols-3 p-1 border-t border-slate-300">
          <button
            onClick={() => handleLikeClick(post._id)}
            title="Like"
            className={`flex items-center justify-center gap-2 py-2 ${post.likes.includes(userData._id) ? "text-blue-500" : "text-black"} 
            rounded-lg hover:bg-gray-100 cursor-pointer transition-all`}
          >
            <div
              className={`border border-white p-1 rounded-full 
              ${post.likes.includes(userData._id) && "border-blue-500 bg-blue-100"}`}
            >
              <BiSolidLike className="transform scale-x-[-1]" />
            </div>
            Like
          </button>

          <button
            title="pending..."
            className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <FaRegCommentDots />
            Comment
          </button>

          <button
            title="pending"
            className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <RiSendPlaneFill />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
