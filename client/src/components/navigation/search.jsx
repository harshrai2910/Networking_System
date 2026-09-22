import { useState } from "react";
import ProfileImg from "../../images/ProfileImg.png";
import { getNetworkStatusFromServer } from "../../services/networkLinkServices";
import { getSearchResultFromServer } from "../../services/searchLinkServices";
import { Link } from "react-router-dom";

export const Search = ({ searchData, setSearchResultData, onSelect }) => {
  const handleSearchClick = async (userId) => {
    if (onSelect) onSelect();

    const result = await getSearchResultFromServer(userId);
    setSearchResultData(result);
  };
  return (
    <>
      {searchData.length !== 0 && (
        <div className="flex flex-col bg-white w-full max-h-80 overflow-y-auto border border-slate-200 rounded-xl py-1 shadow-xl z-50">
          {searchData.map((searchRes) => (
            <Link
              to={`/profile/search=true/${searchRes._id}`}
              onClick={() => handleSearchClick(searchRes._id)}
              key={searchRes._id || searchRes.username}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors border-b last:border-b-0 border-slate-300"
            >
              <img
                src={searchRes.profile ? `${searchRes.profile}` : ProfileImg}
                alt={searchRes.username || "User"}
                className="h-10 w-10 rounded-full object-cover "
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-gray-800 truncate">
                  {searchRes.firstName} {searchRes.lastName}
                </span>
                <span className="text-xs text-slate-500 truncate">
                  @{searchRes.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
