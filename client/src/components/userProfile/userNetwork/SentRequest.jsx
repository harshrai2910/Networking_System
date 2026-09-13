import ProfileImg from "../../../images/ProfileImg.png";
import React from "react";

export const SentRequest = ({ sentRequest, handleWithdraw }) => {
  return (
    <>
      <h1 className="text-2xl font-medium mb-5">Invite Sent</h1>

      {sentRequest.length === 0 ? (
        <p className="text-sm text-gray-500">No request sent</p>
      ) : (
        sentRequest.map((data, index) => (
          <React.Fragment key={data._id || data.receiver._id}>
            <div className="flex items-center justify-between gap-3">
              {/* Profile Details */}
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <img
                    src={
                      data.receiver.profile
                        ? `${data.receiver.profile}`
                        : ProfileImg
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                  />
                </div>

                <div className="flex flex-col gap-0.5">
                  <h2 className="text-base font-semibold text-gray-900 leading-snug hover:text-indigo-600 transition-colors cursor-pointer">
                    {data.receiver.firstName} {data.receiver.lastName}
                  </h2>

                  {data.receiver.headline && (
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {data.receiver.headline}
                    </p>
                  )}

                  {data.receiver.clgName && (
                    <p className="text-xs text-gray-600 line-clamp-1">
                      <span className="font-medium text-gray-500">
                        Student at{" "}
                      </span>
                      {data.receiver.clgName}
                    </p>
                  )}
                </div>
              </div>

              {/* Withdraw Button */}
              {handleWithdraw && (
                <button
                  onClick={() => handleWithdraw(data._id)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-red-600 border border-gray-300 hover:border-red-300 rounded-full transition-colors"
                >
                  Withdraw
                </button>
              )}
            </div>

            {/* Divider */}
            {index !== sentRequest.length - 1 && (
              <div className="w-full h-[1px] bg-gray-200 my-4"></div>
            )}
          </React.Fragment>
        ))
      )}
    </>
  );
};
