import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import {
  createPostFromServer,
  getPostFromServer,
} from "../../../services/userPostLinkServices";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sm_loader } from "../../Sm_Loader";
import profileImg from "../../../images/ProfileImg.png";
import { FiUploadCloud } from "react-icons/fi";
import { IoImages } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiGeminiFill } from "react-icons/ri";

export const CreatePost = ({ setPost, userData }) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [isPost, setIsPost] = useState(false);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [postReviewData, setPostReviewData] = useState("");
  const [isPostReview, setIsPostReview] = useState(false);

  const postImage = watch("postImage");

  const imagePreview = postImage?.[0]
    ? URL.createObjectURL(postImage[0])
    : null;

  const onSubmit = async (data) => {
    if (data.content === "" && data.postImage === "") return;
    setDisabled(true);
    setIsPostReview(true);

    createPostFromServer(data).then((data) => {
      if (data.action === "ALLOW") {
        setIsPost(true);
      } else {
        console.log(data.reason);
        setPostReviewData(data.reason);
        reset();

        // setTimeout(() => {
        //   setIsPostReview(false);
        // }, 5000);
      }

      setDisabled(false);
    });
  };

  useEffect(() => {
    if (isPost) {
      getPostFromServer().then((result) => {
        setPost(result?.post);
        setIsPost(false);
        navigate("/profile/post");
        reset();
      });
    }
  }, [isPost]);

  return (
    <div className="flex items-center justify-center mt-15">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-3xl w-xl mx-auto p-3 mt-2 bg-white md:rounded-lg md:shadow-md border border-gray-200"
      >
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Create Post</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <img
                src={userData?.profile ? `${userData?.profile}` : profileImg}
                alt="profile"
                className="h-13 w-13 rounded-full object-cover shadow-sm"
              />
              <div>
                <h2 className="text-xl font-medium">
                  {userData?.firstName} {userData?.lastName}
                </h2>
                <p className="text-xs text-gray-400 font-medium">
                  Share your thoughts with your network
                </p>
              </div>
            </div>

            <button
              disabled={disabled}
              className={`px-7 py-2 ${disabled ? "bg-blue-200" : "bg-blue-600"} text-white rounded-md font-medium ${disabled ? "hover:bg-none" : "hover:bg-blue-700"} cursor-pointer shadow-sm transition-all`}
            >
              {!disabled ? "post" : <Sm_loader />}
            </button>
          </div>

          {isPostReview && (
            <div className="relative overflow-hidden rounded-lg border-none shadow-sm border-gray-200 bg-blue-50 mb-3 p-2">
              <div className="flex items-center gap-4">
                <div className="relative flex p-2 md:p-3 items-center justify-center rounded-xl bg-linear-to-tr via-indigo-300 to-purple-300 text-white shadow-md shadow-indigo-500/20">
                  <style>{`
                      @keyframes continuousColorChange {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                      }
                      .animate-continuous-bg {
                        animation: continuousColorChange 4s linear infinite;
                      }
                  `}</style>

                  <div className="animate-continuous-bg absolute inset-0 rounded-xl bg-linear-to-tr from-blue-300 via-indigo-300 to-purple-300" />

                  {/* Icon */}
                  <RiGeminiFill className="relative md:text-xl text-lg text-blue-700 drop-shadow-sm" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex gap-1 items-center">
                    <h3 className="font-medium text-sm text-gray-900">
                      AI Post Review
                    </h3>
                    <span className="rounded-lg bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
                      AI
                    </span>
                  </div>

                  {/* Content */}
                  <p className="text-xs md:text-sm text-slate-600">
                    {postReviewData}
                  </p>
                </div>
              </div>
            </div>
          )}

          <textarea
            placeholder="What do you want to talk about?"
            {...register("content")}
            className="w-full font-medium texl-lg p-3 rounded-md min-h-50 focus:outline-none resize-none border border-gray-200"
          />

          <div className="flex flex-col w-full">
            <label className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-gray-700 mb-1.5">
                Add Image/Video
              </span>
              <span className="text-gray-500 text-xs font-medium flex items-center gap-1">
                <AiOutlineInfoCircle className="text-lg" />
                You can add upto 1 file (Image)
              </span>
            </label>
            <label className="relative flex flex-col items-center justify-center w-full h-38 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-500 transition-all duration-200">
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <FiUploadCloud className="text-4xl text-gray-400" />
                <p className="text-xs text-gray-400 my-1">Images only</p>

                <p className="text-sm font-medium text-gray-600 my-1">
                  <span className="text-blue-600 font-semibold flex items-center gap-2 px-5 py-2 bg-blue-100 rounded-full">
                    <IoImages />
                    Click to upload
                  </span>
                </p>
                <p className="text-xs text-gray-400 my-1">
                  Supports: JPG, PNG, JPEG (Max 5mb)
                </p>
              </div>

              <input
                type="file"
                {...register("postImage")}
                accept="image/*,video/*"
                className="hidden"
              />
            </label>
            {imagePreview && (
              <div className="relative mt-4 group rounded-xl border border-gray-200 bg-black/5 flex justify-center">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Selected media preview"
                    className="max-h-72 rounded-xl"
                  />
                )}
              </div>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};
