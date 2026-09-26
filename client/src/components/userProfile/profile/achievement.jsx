import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiPencil } from "react-icons/hi2";
import { updateAchievementsFromServer } from "../../../services/userLinkServices";
import { useEffect } from "react";

export const Achievement = ({ achievement }) => {
  const [achive, setAchive] = useState(false);
  const { register, handleSubmit } = useForm();
  const [userAchievements, setUserAchievements] = useState("");

  useEffect(() => {
    setUserAchievements(achievement);
  }, [achievement]);

  const OnSubmit = (data) => {
    updateAchievementsFromServer(data).then((userAchievement) => {
      setUserAchievements(userAchievement.updatedAchievements);
      setAchive(false);
    });
  };
  return (
    <>
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h1 className="text-lg font-medium">Achievements</h1>
        <button
          onClick={() => setAchive(!achive)}
          className="inline-flex items-center justify-center border-none p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <HiPencil className="font-bold text-xl" />
        </button>
      </div>
      {achive ? (
        <form onSubmit={handleSubmit(OnSubmit)}>
          <textarea
            placeholder="Tell us about your achievements..."
            rows={4}
            {...register("achievements")}
            className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <div className="flex items-center justify-end w-full mt-2 gap-3">
            <button
              onClick={() => setAchive(false)}
              className="px-5 py-2 border border-gray-500 text-gray-600 font-medium rounded-lg bg-gray-100"
            >
              Cancel
            </button>
            <button className="px-5 py-2 border-none rounded-lg bg-blue-400 text-white font-medium">
              Save
            </button>
          </div>
        </form>
      ) : (
        <p className="text-[13px] sm:text-[15px] font-medium text-gray-700 line-clamp-4">
          {!userAchievements
            ? "No Achievement Added yet"
            : `${userAchievements}`}
        </p>
      )}
    </>
  );
};
