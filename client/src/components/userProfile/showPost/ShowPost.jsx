import { GoShieldCheck } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";

import {
  deletePostFromServer,
  getPostFromServer,
} from "../../../services/userPostLinkServices";

export const ShowPost = ({ userData, posts, setPost }) => {
  const [activePost, setActivePost] = useState(null);
  const [isPost, setIsPost] = useState(false);

  console.log(posts);

  const handleDeletePost = async (delId) => {
    const result = await deletePostFromServer({ delId: delId });
    console.log(result);
    setIsPost(true);
  };

  useEffect(() => {
    if (isPost) {
      getPostFromServer().then((result) => {
        setPost(result?.post);
        setIsPost(false);
      });
    }
  }, [isPost]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="font-medium text-xl hidden md:block">All Activity</h1>
        {posts?.length === 0 && (
          <div>
            <h1>No post created Yet</h1>
          </div>
        )}
        {posts?.map((post, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 border bg-white border-slate-300 rounded-xl shadow-xs"
          >
            <div className="flex gap-2 items-center p-4">
              <div className="flex justify-between">
                <img
                  src={`${userData.profile}`}
                  alt=""
                  className="h-15 w-15 rounded-full object-cover shadow-sm"
                />
              </div>
              <div className="w-full">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1">
                    <h1 className="text-lg font-medium">
                      {userData.firstName} {userData.lastName}
                    </h1>

                    <GoShieldCheck />

                    <p className="flex items-end text-xs text-gray-500">
                      <LuDot /> You
                    </p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActivePost(activePost === post._id ? null : post._id)
                      }
                      className="px-3 py-1 cursor-pointer"
                    >
                      <HiDotsHorizontal />
                    </button>
                    {activePost === post._id && (
                      <div className="absolute top-6 right-0 py-2 w-30 bg-white flex flex-col gap-1 border border-slate-300 shadow-sm rounded-lg">
                        <button className="border-none hover:bg-slate-100 py-2 w-full transition-all cursor-pointer">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="border-none hover:bg-slate-100 py-2 w-full transition-all cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {userData.headline}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-4">{post.content}</div>

            <div>
              <img src={`${post.postImage}`} alt="" className="w-full " />
            </div>

            <div className="flex items-center justify-around py-2">
              <div className="flex items-center gap-2 cursor-pointer">
                <button>
                  <BiSolidLike className="transform scale-x-[-1]" />
                </button>
                Like
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <button>
                  <FaRegCommentDots />
                </button>
                Comment
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <button>
                  <RiSendPlaneFill />
                </button>
                Send
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
