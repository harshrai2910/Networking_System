import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmark } from "react-icons/io5";
import ProfileImg from "../../../images/ProfileImg.png";

export const ReceivedRequest = ({
  receivedRequest,
  handleAccept,
  handleReject,
}) => {
  return (
    <>
      <h1 className="text-2xl font-medium mb-5">Invite Received</h1>
      {receivedRequest.length === 0 ? (
        <p className="text-sm text-gray-500">No received request</p>
      ) : (
        <div>
          {receivedRequest.map((data, index) => (
            <React.Fragment key={data._id || data.sender._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={
                        data.sender.profile
                          ? `${data.sender.profile}`
                          : ProfileImg
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                    />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <h2 className="font-semibold text-gray-900">
                      {data.sender.firstName} {data.sender.lastName}
                    </h2>

                    {data.sender.headline && (
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {data.sender.headline}
                      </p>
                    )}

                    {data.sender.clgName && (
                      <p className="text-xs text-gray-500 flex gap-1">
                        <span className="text-gray-600 line-clamp-1">
                          {data.sender.clgName}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    title="Accept"
                    className="p-2.5 rounded-full text-gray-500 bg-gray-100 hover:bg-green-50 hover:text-green-600 transition-all duration-200 cursor-pointer"
                    onClick={() => handleAccept(data._id)}
                  >
                    <IoCheckmark className="w-5 h-5" />
                  </button>

                  <button
                    title="Reject"
                    className="p-2.5 rounded-full text-gray-500 bg-gray-100 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 cursor-pointer"
                    onClick={() => handleReject(data._id)}
                  >
                    <RxCross2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {index !== receivedRequest.length - 1 && (
                <div className="w-full h-0.5 bg-gray-300 mt-4 mb-4"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};
