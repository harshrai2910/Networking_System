import { useRef, useState } from "react";
import { HiPencil } from "react-icons/hi2";

export const Achievement = ({ achievement }) => {
  const [achive, setAchive] = useState(false);
  const achiveRef = useRef();

  const saveEditAchievement = () => {
    // const new
  };

  const handleEditAchievement = () => {
    console.log(achiveRef.current.value);
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
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-end justify-between w-full mt-2 gap-3">
            <input
              type="text"
              ref={achiveRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditAchievement();
              }}
              placeholder="e.g.English"
              className="border border-slate-300 rounded-lg w-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => handleEditAchievement()}
              className="border-none px-3 py-1 bg-blue-500 text-white rounded-lg"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => saveEditAchievement()}
              className="border-none px-3 py-1 bg-yellow-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <p className="text-[13px] sm:text-[15px] font-medium text-gray-700 line-clamp-4">
          {!achievement ? "No Achievement Added yet" : `${achievement}`}
        </p>
      )}
    </>
  );
};
