import { PiLinkSimpleBold } from "react-icons/pi";
import { LuLayoutTemplate } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";

export const MiddleInfo = () => {
  const items = [
    {
      icons: <PiStudent className="text-3xl text-blue-600" />,
      name: "Built for Students",
      para: "Learn • Connect • Grow",
    },
    {
      icons: <LuLayoutTemplate className="text-3xl text-blue-600" />,
      name: "Showcase Your Work",
      para: "Projects • Skills • Achievements",
    },
    {
      icons: <PiLinkSimpleBold className="text-3xl text-blue-600" />,
      name: "Build Connections",
      para: "Build meaningful connections",
    },
  ];
  return (
    <>
      <div className="flex md:items-center items-start justify-between flex-col md:flex-row gap-4 w-full md:w-4xl border border-blue-300 rounded-2xl md:py-5 md:px-15 px-2 py-2 shadow-sm m-2">
        {items.map((item, unique) => (
          <>
            <div className="flex gap-3 items-center">
              {item.icons}
              <div>
                <h1 className="font-medium text-sm">{item.name}</h1>
                <p className="text-xs">{item.para}</p>
              </div>
            </div>

            {unique !== items.length - 1 && (
              <span className="hidden md:block h-10 border"></span>
            )}
          </>
        ))}
      </div>
    </>
  );
};
