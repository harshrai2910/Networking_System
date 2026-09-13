import { FaGithub } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";

export const Contact = ({ userData }) => {
  console.log(userData?.links?.g);
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

      {Links.map((link, unique) => (
        <div
          key={unique}
          className="flex items-center justify-between gap-2 mt-2"
        >
          <a href={link.name} className="text-xs text-blue-700 underline">
            {link.name}
          </a>
          <a
            href={link.name}
            className="p-2 border rounded-2xl text-gray-800 border-gray-800 text-md hover:text-white hover:bg-gray-800 transition-colors shadow-sm"
          >
            {link.icon}
          </a>
        </div>
      ))}
    </>
  );
};
