import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { HiPencil } from "react-icons/hi2";
import { updateAchievementsFromServer } from "../../../services/userLinkServices";
import { useEffect } from "react";
import { ReduceContent } from "./ReduceContent";

export const Achievement = ({ achievement }) => {
  const [achive, setAchive] = useState(false);
  const [userAchievements, setUserAchievements] = useState("");
  const [achiveContent, setachiveContent] = useState("");

  const achiveRef = useRef(null);
  const achiveRefErr = useRef(null);

  useEffect(() => {
    setUserAchievements(achievement);
  }, [achievement]);

  const handleAchiveChange = (e) => {
    setachiveContent(e.target.value);
  };

  const OnSubmit = (e) => {
    e.preventDefault();
    if (achiveRef.current.value.length > 400) {
      achiveRefErr.current.style.display = "block";
      return;
    }

    updateAchievementsFromServer({
      achievements: achiveRef.current.value,
    }).then((userAchievement) => {
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
          className="inline-flex items-center justify-center border-none p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <HiPencil className="font-bold text-xl" />
        </button>
      </div>

      <p ref={achiveRefErr} className="mb-1 text-red-500 text-sm hidden">
        Cannot excede length more that 400
      </p>

      {achive ? (
        <form>
          <textarea
            placeholder="Tell us about your achievements..."
            ref={achiveRef}
            rows={4}
            onChange={(e) => handleAchiveChange(e)}
            className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm sm:text-base resize-none focus:outline-none"
          ></textarea>
          <p
            className={`h-4 text-xs ${achiveContent.length > 400 ? "text-red-500" : "text-blue-500"}`}
          >
            {achiveContent.length}/400
          </p>
          <div className="flex items-center justify-end w-full gap-3">
            <button
              onClick={() => {
                achiveRefErr.current.style.display = "none";
                setAchive(false);
              }}
              className="px-5 py-2 bg-gray-50 cursor-pointer border border-slate-300 font-medium text-gray-600 rounded-lg shadow-xs"
            >
              Cancel
            </button>
            <button
              onClick={(e) => OnSubmit(e)}
              className="px-5 py-2 border-none cursor-pointer rounded-lg bg-blue-400 text-white font-medium"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <p className="text-[13px] sm:text-[15px] font-medium text-gray-700">
          {!userAchievements ? (
            "No Achievement Added yet"
          ) : (
            <ReduceContent content={userAchievements} />
          )}
        </p>
      )}
    </>
  );
};
