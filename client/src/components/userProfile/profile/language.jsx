import { useRef, useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { IoAdd } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoIosAdd } from "react-icons/io";

import { languageDataFromServer } from "../../../services/userLinkServices";
import { useEffect } from "react";

export const Language = ({ userData }) => {
  const [editLang, setEditLang] = useState(false);
  const [lang, setLang] = useState([]);
  const langRef = useRef(null);

  useEffect(() => {
    setLang(userData.language);
  }, [userData]);

  const handleLangClick = () => {
    const language = langRef.current.value;
    const newLanguage = language.charAt(0).toUpperCase() + language.slice(1);
    setLang((prev) => [...prev, newLanguage]);
    langRef.current.value = "";
  };

  const handleLangDelete = (language) => {
    const filterLang = lang.filter((l) => l != language);
    setLang(filterLang);
  };

  const saveLanguage = async () => {
    const finalData = { language: lang };
    const result = await languageDataFromServer(finalData);
    if (result) {
      setLang(result.language.language);
      setEditLang(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium">Language Known</h1>
            <button
              onClick={() => setEditLang(!editLang)}
              to="/profile/edit=true"
              className="inline-flex items-center justify-center border-none p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <HiPencil className="font-bold text-xl" />
            </button>
          </div>

          {editLang && lang?.length == 0 && (
            <p className="text-[13px] sm:text-[15px] font-medium text-gray-600 pt-2">
              No Language Add yet
            </p>
          )}

          <div className="divide-y divide-gray-200">
            {!editLang
              ? lang?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 text-sm font-medium text-gray-800 border-gray-200"
                  >
                    {item}
                  </div>
                ))
              : ""}
          </div>
        </div>
        {editLang && (
          <>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center justify-between w-full gap-2 mt-2">
                <input
                  type="text"
                  ref={langRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLangClick();
                  }}
                  placeholder="e.g.English"
                  className="border border-slate-300 rounded-lg w-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={() => handleLangClick()}
                  className="border-none p-1 bg-blue-500 text-white rounded-full"
                >
                  <IoAdd />
                </button>
                <button
                  type="button"
                  onClick={() => saveLanguage()}
                  className="border-none p-1 bg-yellow-500 text-white rounded-full"
                >
                  <FaSave />
                </button>
              </div>
            </form>
            <div className="flex flex-wrap gap-2 mt-3">
              {lang.map((item, unique) => (
                <span
                  key={unique}
                  className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-300 text-sm text-blue-600 rounded-full shadow-sm"
                >
                  {item}
                  <button
                    onClick={() => handleLangDelete(item)}
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
      </div>
    </>
  );
};
