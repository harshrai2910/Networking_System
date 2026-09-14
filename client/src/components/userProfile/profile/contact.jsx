import { FaGithub } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";
// import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateLinksFromServer } from "../../../services/userLinkServices";

export const Contact = ({ userData }) => {
  const [editContact, setEditContact] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const OnSubmit = async (data) => {
    updateLinksFromServer(data).then((links) => {
      setEditContact(false);
    });
  };

  const Links = [
    { name: userData?.links?.github, icon: <FaGithub /> },
    { name: userData?.links?.linkedin, icon: <BsLinkedin /> },
    { name: userData?.links?.twitter, icon: <FaTwitter /> },
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Contact</h1>
        <button
          to="/profile/edit=true"
          onClick={() => setEditContact(!editContact)}
          className="border-none p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <HiPencil className="font-bold text-xl" />
        </button>
      </div>

      {userData?.links?.length == 0 && (
        <p className="text-[13px] sm:text-[15px] font-medium text-gray-600 pt-2">
          Add public links
        </p>
      )}

      <div className="divide-y divide-gray-200">
        {!editContact &&
          Links.map((link, unique) => (
            <div
              key={unique}
              className="flex items-center justify-between gap-2 py-1"
            >
              <a href={link.name} className="text-xs text-blue-700 underline">
                {link.name}
              </a>
              <a
                href={link.name}
                className="p-2 border rounded-2xl text-gray-800 text-md hover:text-white hover:bg-gray-800 transition-colors shadow-sm"
              >
                {link.icon}
              </a>
            </div>
          ))}
      </div>

      {editContact && (
        <form onSubmit={handleSubmit(OnSubmit)}>
          <div>
            <div className="flex gap-2 items-center justify-between mt-1">
              <input
                type="text"
                placeholder="eg. https://github.com/username"
                {...register("github")}
                className="border border-slate-300 text-sm rounded-lg w-full px-3 py-1 mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <span className="p-2 border rounded-2xl text-gray-800 text-md hover:text-white hover:bg-gray-800 transition-colors shadow-sm">
                <FaGithub />
              </span>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <input
                type="text"
                placeholder="eg. https://linkedin.com/in/username"
                {...register("linkedin")}
                className="border border-slate-300 text-sm rounded-lg w-full px-3 py-1 mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <span className="p-2 border rounded-2xl text-gray-800 text-md hover:text-white hover:bg-gray-800 transition-colors shadow-sm">
                <BsLinkedin />
              </span>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <input
                type="text"
                placeholder="eg. https://twitter.com/username"
                {...register("twitter")}
                className="border border-slate-300 text-sm rounded-lg w-full px-3 py-1 mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <span className="p-2 border rounded-2xl text-gray-800 text-md hover:text-white hover:bg-gray-800 transition-colors shadow-sm">
                <FaTwitter />
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center mt-3">
            <button
              onClick={() => setEditContact(false)}
              className="w-full border border-gray-500 text-gray-600 font-medium py-1 rounded-lg bg-gray-100"
            >
              Cancel
            </button>
            <button className="w-full border border-amber-500 py-1 rounded-lg bg-amber-400 text-white font-medium">
              Save
            </button>
          </div>
        </form>
      )}
    </>
  );
};
