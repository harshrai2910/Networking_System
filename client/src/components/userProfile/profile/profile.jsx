import { motion } from "motion/react";
import { Skills } from "./skills";
import { UserProfile } from "./userProfile";
import { Achievement } from "./achievement";
import { Language } from "./language";
import { ProfileURL } from "./profileURL";
import { Contact } from "./contact";
import { UserPost } from "./post";

export const Profile = ({ userData, setUserData }) => {
  const skills = userData.skills;
  const achievement = userData.achievements;
  return (
    <div className="flex justify-center px-3 sm:px-6 lg:px-8 mt-15 mb-3 sm:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-4"
      >
        {/* MAIN CONTENT COLUMN */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="border border-slate-200 rounded-lg p-4 sm:p-5 shadow-sm bg-white">
            <UserProfile userData={userData} setUserData={setUserData} />
          </div>

          <div className="border border-slate-200 rounded-lg p-4 sm:p-5 shadow-sm bg-white">
            <Skills skills={skills} />
          </div>

          <div className="border border-slate-200 rounded-lg p-4 sm:p-5 shadow-sm bg-white">
            <UserPost />
          </div>

          <div className="border border-slate-200 rounded-lg p-4 sm:p-5 shadow-sm bg-white">
            <Achievement achievement={achievement} />
          </div>
        </div>

        {/* SIDEBAR COLUMN */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="border border-slate-200 rounded-lg p-4 sm:p-5 shadow-sm bg-white">
            <Language userData={userData} />
          </div>

          <div className="border border-slate-200 rounded-lg p-4 sm:p-5 shadow-sm bg-white">
            <ProfileURL userData={userData} />
          </div>

          <div className="border border-slate-200 rounded-lg p-4 sm:p-5 shadow-sm bg-white">
            <Contact userData={userData} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
