import { GoShieldCheck } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";
import { AiTwotoneLike } from "react-icons/ai";
import profileImg from "../../images/ProfileImg.png";
import { useState } from "react";
import { useEffect } from "react";
import { putLikesFromServer } from "../../services/userPostLinkServices";
import { postfollowRequestFromServer } from "../../services/networkLinkServices";

export const ShowAllPost = ({ AllPosts, userData }) => {
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState();
  const [followMsg, setFollowMsg] = useState("follow");

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

  useEffect(() => {
    if (AllPosts) {
      setPosts(AllPosts);
    }
  }, [AllPosts]);

  const handleFollow = async (userId) => {
    const result = await postfollowRequestFromServer({ receiverId: userId });
    console.log("result", result);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="font-medium text-xl hidden md:block">All Activity</h1>
        {posts?.map((post, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 border border-slate-300 rounded-xl shadow-xs bg-white"
          >
            <div className="flex gap-2 items-center sm:p-4 p-3 pb-2">
              <div className="relative shrink-0">
                <img
                  src={
                    post.UserId.profile ? `${post.UserId.profile}` : profileImg
                  }
                  alt=""
                  className="h-10 w-10 sm:h-15 sm:w-15 rounded-full object-cover shadow-sm"
                />
              </div>
              <div className="w-full">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1">
                    <h1 className="sm:text-lg text-sm font-medium">
                      {post.UserId.firstName} {post.UserId.lastName}
                    </h1>

                    <GoShieldCheck />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {post.UserId.headline}
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleFollow(post.UserId._id)}
                  className="text-blue-500 font-bold flex gap-1 items-center cursor-pointer"
                >
                  <IoMdAdd className="font-extrabold" />
                  {post.isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            </div>

            <div className="sm:px-4 px-2">{post.content}</div>

            <div>
              <img src={`${post.postImage}`} alt="" className="w-full " />
            </div>

            <div>
              <div className="p-2 border-t border-slate-300 flex gap-2 items-center">
                <div className="border rounded-full border-blue-500 bg-blue-100 p-1">
                  <BiSolidLike className="text-blue-500 transform scale-x-[-1]" />
                </div>

                <span>{post.likes.length}</span>
              </div>

              <div className="grid grid-cols-3 py-1 border-t border-slate-300">
                <button
                  onClick={() => handleLikeClick(post._id)}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer
                    transition-all`}
                  // ${post.likes.includes(userData._id) ? "text-blue-500" : "text-black"}
                >
                  <div
                  // className={
                  //   post.likes.includes(userData._id)
                  //     ? "border rounded-full border-blue-500 bg-blue-100 p-1"
                  //     : ""
                  // }
                  >
                    <BiSolidLike className="transform scale-x-[-1]" />
                  </div>
                  Like
                </button>

                <button className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                  <FaRegCommentDots />
                  Comment
                </button>

                <button className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                  <RiSendPlaneFill />
                  Send
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
