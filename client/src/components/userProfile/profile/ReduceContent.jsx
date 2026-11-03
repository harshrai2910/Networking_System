import { useState } from "react";

export const ReduceContent = ({ content }) => {
  const [ShowMore, setShowMore] = useState(false);
  const words = content.split(" ");
  const isLong = words.length > 30;

  const displayContent =
    isLong && !ShowMore ? words.slice(0, 30).join(" ") : words.join(" ");

  return (
    <>
      {displayContent}

      {isLong && (
        <button
          onClick={() => setShowMore(!ShowMore)}
          className="text-blue-500 ml-1 font-semibold cursor-pointer hover:underline"
        >
          {!ShowMore ? "More" : "Less"}
        </button>
      )}
    </>
  );
};
