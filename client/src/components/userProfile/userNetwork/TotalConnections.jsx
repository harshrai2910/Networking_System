import React from "react";
import ProfileImg from "../../../images/ProfileImg.png";

export const TotalConnection = ({ totalConnection }) => {
  return (
    <>
      <h1 className="text-2xl font-medium mb-5">
        Total Connections ({totalConnection?.length || 0})
      </h1>

      {totalConnection?.length === 0 ? (
        <p className="text-sm text-gray-500">No connections yet</p>
      ) : (
        totalConnection.map((data, index) => (
          <React.Fragment key={data._id}>
            <div className="flex items-center justify-between gap-3">
              {/* User Details */}
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <img
                    src={data.profile ? `${data.profile}` : ProfileImg}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                  />
                </div>

                <div className="flex flex-col gap-0.5">
                  <h2 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer">
                    {data.firstName} {data.lastName}
                  </h2>

                  {data.headline && (
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {data.headline}
                    </p>
                  )}

                  {data.clgName && (
                    <p className="text-xs text-gray-500 flex gap-1">
                      <span className="text-gray-600 line-clamp-1">
                        <span className="font-medium text-gray-500">
                          Student at{" "}
                        </span>
                        {data.clgName}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleRemoveConnection(data._id)}
                className="px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 rounded-full transition-colors"
              >
                Remove
              </button>
            </div>

            {index !== totalConnection.length - 1 && (
              <div className="w-full bg-gray-200 my-4"></div>
            )}
          </React.Fragment>
        ))
      )}
    </>
  );
};
