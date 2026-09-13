import { motion } from "motion/react";
import { RxCross2 } from "react-icons/rx";
import { IoIosAdd } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { completeDatafromServer } from "../../../services/userLinkServices";
import { Loader } from "../../loader";

export const CompleteProfile = () => {
  const { register, handleSubmit, reset } = useForm();
  const [mySkills, setMySkills] = useState([]);
  const [submiting, setSubmiting] = useState(false);
  const inputSkills = useRef();
  const navigate = useNavigate();

  const handleSkills = () => {
    const skill = inputSkills.current.value.trim();
    const newSkill = skill.charAt(0).toUpperCase() + skill.slice(1);

    if (!newSkill) return;

    setMySkills((prev) => [...prev, newSkill]);
    inputSkills.current.value = "";
  };

  const handleDeleteSkills = (skill) => {
    const filteredSkills = mySkills.filter((s) => s != skill);
    setMySkills(filteredSkills);
  };

  const professionalLinks = [
    {
      icon: <FaGithub />,
      placeholder: "https://github.com/username",
      register: "links.github",
    },
    {
      icon: <BsLinkedin />,
      placeholder: "https://linkedin.com/in/username",
      register: "links.linkedin",
    },
    {
      icon: <FaTwitter />,
      placeholder: "https://twitter.com/username",
      register: "links.twitter",
    },
  ];

  const onSubmit = async (data) => {
    console.log(data);
    setSubmiting(true);

    try {
      const finalData = { ...data, skills: mySkills };
      const result = await completeDatafromServer(finalData);

      console.log(result);

      if (result.completed) {
        navigate("/profile");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <>
      {submiting ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center md:p-4 py-2 mt-15">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border w-full bg-white p-4 sm:p-6 md:rounded-2xl border-slate-200 shadow-sm"
            >
              <div className="font-bold text-xl sm:text-2xl">
                <h1>Complete Your Profile</h1>
              </div>

              <div className="border-b my-4 sm:my-6"></div>

              {/** PROFILE */}
              <h1 className="text-base sm:text-lg font-semibold text-blue-500 mb-4">
                Profile Hook
              </h1>

              <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 mb-6">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-sm font-medium text-slate-600">
                        First Name
                      </label>
                      <input
                        type="text"
                        {...register("firstName")}
                        className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-sm font-medium text-slate-600">
                        Last Name
                      </label>
                      <input
                        type="text"
                        {...register("lastName")}
                        className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    {/* Course */}
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-sm font-medium text-slate-600">
                        Course
                      </label>

                      <select
                        {...register("course")}
                        className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select your course
                        </option>

                        <option value="BCA">BCA</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="B.Sc">B.Sc</option>
                        <option value="B.Com">B.Com</option>
                        <option value="BBA">BBA</option>
                        <option value="BA">BA</option>
                        <option value="MCA">MCA</option>
                        <option value="M.Tech">M.Tech</option>
                        <option value="M.Sc">M.Sc</option>
                        <option value="MBA">MBA</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Graduation Year */}
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-sm font-medium text-slate-600">
                        Graduation Year
                      </label>

                      <select
                        {...register("gradYear")}
                        className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select year
                        </option>

                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        <option value="2031">2031</option>
                        <option value="2032">2032</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-600">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      {...register("profile")}
                      className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  {/* Headline */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-600">
                      Headline
                    </label>
                    <input
                      type="text"
                      {...register("headline")}
                      placeholder="e.g. MERN Stack Developer | Designer"
                      className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* About */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-600">
                      About You
                    </label>
                    <textarea
                      placeholder="Tell us about yourself..."
                      rows={4}
                      {...register("about")}
                      className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/** SKILLS */}
              <div className="mb-6">
                <h1 className="text-base sm:text-lg font-semibold text-blue-500 mb-3">
                  Skills Section
                </h1>

                <div className="flex flex-col gap-4 border border-slate-200 p-4 sm:p-5 rounded-xl">
                  {/* Input + Button */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <input
                      type="text"
                      placeholder="Enter a skill (e.g. React, Node.js)"
                      ref={inputSkills}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSkills();
                        }
                      }}
                      className="border border-slate-300 rounded-lg w-full px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                      type="button"
                      onClick={handleSkills}
                      className="flex gap-2 items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white font-medium rounded-lg whitespace-nowrap"
                    >
                      <IoIosAdd className="font-extrabold text-xl" />
                      Add
                    </button>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap items-center gap-2">
                    {mySkills.map((item, unique) => (
                      <span
                        key={unique}
                        className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-300 text-xs sm:text-sm text-blue-600 rounded-full shadow-sm"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => handleDeleteSkills(item)}
                          className="text-red-400 hover:text-red-600 text-xs"
                        >
                          <RxCross2 />
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Hint */}
                  <p className="text-xs text-slate-500 italic">
                    *Focus on core tech stack first
                  </p>
                </div>
              </div>

              {/** PROOF OF WORK */}
              <div className="mb-6">
                <h1 className="text-base sm:text-lg font-semibold text-blue-500 mb-3">
                  Proof of Work
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Left Section */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-medium mb-3">
                      Professional Links
                    </h3>

                    <div className="flex flex-col gap-3">
                      {professionalLinks.map((user) => (
                        <div key={user.placeholder} className="relative w-full">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">
                            {user.icon}
                          </span>

                          <input
                            type="text"
                            placeholder={user.placeholder}
                            {...register(user.register)}
                            className="w-full pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-medium mb-3">
                      Major Achievements
                    </h3>

                    <textarea
                      {...register("achievements")}
                      placeholder="e.g. Built 10+ projects, implemented auth system, real-time chat..."
                      className="w-full flex-1 border border-slate-300 rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="border-b my-4 sm:my-6"></div>

              <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3">
                <p className="text-xs sm:text-sm text-center sm:text-left">
                  All information is saved locally until you submit
                </p>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 border-none bg-green-900 text-white font-medium rounded-xl shadow-sm"
                >
                  Save & Finish Profile
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};
