import { RxCross2 } from "react-icons/rx";
import { HiPencil } from "react-icons/hi2";
import {
  deleteSkillFromServer,
  updateSkillFromServer,
  userDataFromServer,
} from "../../../services/userLinkServices";
import { useEffect, useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { FaSave } from "react-icons/fa";

export const Skills = ({ skills }) => {
  const [editSkill, setEditSkill] = useState(false);
  const [newSkill, setNewSkill] = useState([]);
  const skillRef = useRef();

  const handleDeleteSkill = async (skill) => {
    const result = await deleteSkillFromServer({ skill: skill });
    if (result) setNewSkill(result.updatedSkills);
  };

  const handleEditSkills = () => {
    const skill = skillRef.current.value;
    const updatedSkill = skill.charAt(0).toUpperCase() + skill.slice(1);
    setNewSkill((prev) => [...prev, updatedSkill]);
    skillRef.current.value = "";
  };

  const handleDeleteEditedSkill = (skill) => {
    const filteredSkill = newSkill.filter((s) => s !== skill);
    setNewSkill(filteredSkill);
  };

  const saveEditedSkill = async () => {
    const result = await updateSkillFromServer({ skills: newSkill });
    if (result) setNewSkill(result.updatedSkills);
    setEditSkill(false);
  };

  useEffect(() => {
    if (skills) setNewSkill(skills);
  }, [skills]);

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold text-gray-900">Skills</h1>
        <button
          onClick={() => setEditSkill(!editSkill)}
          className="flex border-none p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <HiPencil className="font-bold text-xl" />
        </button>
      </div>

      {newSkill?.length == 0 && !editSkill && (
        <p className="text-[13px] sm:text-[15px] font-medium text-gray-700 pt-2">
          No skills Added yet!
        </p>
      )}

      <div className="divide-y divide-gray-200">
        {!editSkill &&
          newSkill?.map((skill, index) => (
            <div
              key={index}
              className={
                "flex items-center justify-between py-2 text-sm font-medium text-gray-800"
              }
            >
              {skill}
              <button
                type="button"
                onClick={() => handleDeleteSkill(skill)}
                className="border-none p-2 rounded-full hover:bg-gray-100 cursor-pointer active:bg-gray-200 transition-colors"
              >
                <RxCross2 className="text-black" />
              </button>
            </div>
          ))}
      </div>

      {editSkill && (
        <>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex items-center justify-between w-full mt-2 gap-3">
              <input
                type="text"
                ref={skillRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEditSkills();
                }}
                placeholder="e.g.Node.js"
                className="border border-slate-300 rounded-lg w-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => handleEditSkills()}
                className="border-none px-3 py-1 bg-blue-500 text-white rounded-lg"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => saveEditedSkill()}
                className="border-none px-3 py-1 bg-yellow-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
          <div className="flex flex-wrap gap-2 mt-3">
            {newSkill.map((skill, unique) => (
              <span
                key={unique}
                className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-300 text-sm text-blue-600 rounded-full shadow-sm"
              >
                {skill}
                <button
                  onClick={() => handleDeleteEditedSkill(skill)}
                  type="button"
                  className="text-red-400 hover:text-red-600 text-xs"
                >
                  <RxCross2 />
                </button>
              </span>
            ))}
          </div>
        </>
      )}
    </>
  );
};
