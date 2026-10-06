import { motion } from "motion/react";
import { ProfileServices } from "./profileService";
import { Connections } from "./connections";
import { ShowAllPost } from "./showAllPost";
import { Analytics } from "./Analytics";

export const Dashboard = ({ AllPosts, userData, posts, setAllPosts }) => {
  return (
    <>
      <div className="flex items-center justify-center mt-15 mb-3">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-6xl grid grid-cols-1 md:grid-cols-4 md:gap-4"
        >
          {/* sticky top-15 left-0 */}
          <div className="hidden md:block md:col-span-1 sticky top-15 h-fit">
            <div className="rounded-lg p-6 shadow-sm bg-white mb-3 ">
              <ProfileServices userData={userData} />
            </div>
            <div className="border border-slate-300 rounded-lg p-6 shadow-sm bg-white mb-3">
              <Connections userData={userData} />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="md:border md:border-slate-300 md:rounded-lg md:p-6 md:shadow-sm md:bg-white bg-transparent">
              <ShowAllPost
                userData={userData}
                AllPosts={AllPosts}
                setAllPosts={setAllPosts}
              />
            </div>
          </div>
          <div>
            <div className="hidden md:block md:col-span-1 sticky top-15 h-fit">
              <div className="border border-slate-300 rounded-lg p-6 shadow-sm bg-white mb-3">
                <Analytics userData={userData} posts={posts} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
