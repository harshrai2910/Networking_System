import { useState } from "react";

export const PostContent = ({ content }) => {
  const [ShowMore, setShowMore] = useState(false);
  const words = content.split(" ");
  const isLong = words.length > 15;

  const displayContent =
    isLong && !ShowMore ? words.slice(0, 15).join(" ") : words.join(" ");

  return (
    <>
      <div className="whitespace-pre-wrap">
        {displayContent}

        {isLong && (
          <button
            onClick={() => setShowMore(!ShowMore)}
            className="text-blue-500 ml-1 font-semibold cursor-pointer hover:underline"
          >
            {!ShowMore ? "More" : "Less"}
          </button>
        )}
      </div>
    </>
  );
};
