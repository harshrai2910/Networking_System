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

export const CreatePost = ({ setPost, userData }) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [isPost, setIsPost] = useState(false);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  const postImage = watch("postImage");

  const imagePreview = postImage?.[0]
    ? URL.createObjectURL(postImage[0])
    : null;

  const onSubmit = async (data) => {
    if (data.content === "" && data.postImage === "") return;
    setDisabled(true);

    createPostFromServer(data).then((d) => {
      if (d) {
        setIsPost(true);
        setDisabled(false);
      }
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
        className="md:w-3xl w-xl mx-auto p-3 mt-2 bg-white md:rounded-lg shadow-md border border-gray-200"
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Create Post</h1>

        <div className="flex items-center gap-3 mb-5">
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Content Field */}
          <textarea
            placeholder="What do you want to talk about?"
            {...register("content")}
            className="w-full font-medium texl-lg p-3 rounded-md min-h-50 focus:outline-none resize-none border border-gray-200"
          />

          {/* Media Upload Section */}
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

            {/* Styled Dropzone */}
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

            {/* Media Preview (Supports both Image & Video) */}
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

          {/* Action Buttons */}
          <div className="flex justify-end pt-2">
            <button
              disabled={disabled}
              className={`px-7 py-2 ${disabled ? "bg-blue-200" : "bg-blue-600"} text-white rounded-md font-medium ${disabled ? "hover:bg-none" : "hover:bg-blue-700"} transition`}
            >
              {!disabled ? "post" : <Sm_loader />}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
