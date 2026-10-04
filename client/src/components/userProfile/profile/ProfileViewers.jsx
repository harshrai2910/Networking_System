import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { totalProfileViewFromServer } from "../../../services/userLinkServices";
import { Link } from "react-router-dom";
import profileImg from "../../../images/ProfileImg.png";

export const ProfileViewers = ({ userData }) => {
  const [profileViewers, setProfileViewers] = useState([]);
  useEffect(() => {
    totalProfileViewFromServer().then((data) => {
      setProfileViewers(data.ProfileViews);
    });
  }, []);

  console.log(profileViewers);
  return (
    <>
      <div className="flex justify-center md:px-3 sm:px-6 lg:px-8 mt-15 mb-3 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-4xl bg-white md:rounded-lg border border-slate-200 shadow-sm p-5 sm:p-6"
        >
          {/* Header Section */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h1 className="text-xl font-semibold text-slate-800">
                Profile Views ({profileViewers.length})
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                People who viewed your profile recently
              </p>
            </div>
          </div>

          {/* Viewers List */}
          {profileViewers.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {profileViewers.map((viewer, index) => {
                const fullName =
                  `${viewer.firstName || ""} ${viewer.lastName || ""}`.trim();

                return (
                  <motion.div
                    key={viewer._id || index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between py-3.5 px-2 transition-colors group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {viewer.profile ? (
                        <Link
                          to={
                            userData._id === viewer._id
                              ? "/profile"
                              : `/profile/search=true/${viewer._id}`
                          }
                        >
                          <img
                            src={viewer.profile}
                            alt={fullName}
                            className="w-12 h-12 rounded-full object-cover border border-slate-200 flex-shrink-0"
                          />
                        </Link>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-base shadow-sm flex-shrink-0">
                          {viewer.firstName?.[0]}
                          {viewer.lastName?.[0]}
                        </div>
                      )}

                      <Link
                        to={
                          userData._id === viewer._id
                            ? "/profile"
                            : `/profile/search=true/${viewer._id}`
                        }
                        className="min-w-0"
                      >
                        <h2 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {fullName || "Anonymous User"}
                        </h2>
                        {viewer.headline && (
                          <p className="text-xs text-slate-500 truncate mt-0.5 max-w-xs sm:max-w-md">
                            {viewer.headline}
                          </p>
                        )}
                      </Link>
                    </div>

                    <Link
                      to={
                        userData._id === viewer._id
                          ? "/profile"
                          : `/profile/search=true/${viewer._id}`
                      }
                      className="hidden sm:block border-none text-sm px-4 py-1 rounded-lg font-medium text-indigo-400 bg-slate-50/80 hover:bg-slate-100/80 shadow-sm transition-all"
                    >
                      View Profile
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                👁️
              </div>
              <p className="text-sm font-medium text-slate-600">
                No profile views yet
              </p>
              <p className="text-xs text-slate-400 mt-1">
                When people view your profile, they will show up here.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};
