import { FaRegUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { GrDocumentText } from "react-icons/gr";
import { PiTrendUpBold } from "react-icons/pi";

export const Steps = () => {
  const features = [
    {
      id: 1,
      title: "Create Your Profile",
      description:
        "Showcase your skills, interests, projects and achievements. Let others know what makes you unique.",
      icons: <FaRegUser className="text-xl text-blue-700" />,
      color: "bg-blue-200",
    },
    {
      id: 2,
      title: "Find & Connect",
      description:
        "Discover students by skills, interests and college. Send connection requests and grow your network.",
      icons: <IoSearch className="text-xl text-green-700" />,
      color: "bg-green-200",
    },
    {
      id: 3,
      title: "Share Your Work",
      description:
        "Post your projects, ideas and achievements. Get feedback and showcase your journey.",
      icons: <GrDocumentText className="text-xl text-purple-700" />,
      color: "bg-purple-200",
    },
    {
      id: 4,
      title: "Grow Together",
      description:
        "Learn, collaborate and build meaningful connections. Be part of a supportive student community.",
      icons: <PiTrendUpBold className="text-xl text-red-700" />,
      color: "bg-red-200",
    },
  ];
  return (
    <>
      <div className="my-5 mx-3">
        <div className="flex items-center justify-center flex-col gap-1">
          <p className="text-gray-500 font-medium text-xs">HOW IT WORKS</p>
          <h1 className="md:text-3xl text-2xl font-bold text-center">
            A Simple Way to Connect
          </h1>
          <p className="text-gray-600 font-medium text-sm text-center">
            Get started in a few simple steps and become a part of an active
            student community
          </p>
        </div>

        {/** ---------------------------------------------------------------- */}

        <div className="mt-8">
          <div className="flex gap-3 flex-col md:flex-row items-center w-full md:w-6xl">
            {features.map((items) => (
              <div className="flex-col border border-gray-200 rounded-2xl shadow-sm p-5 mx-3 md:mx-0">
                <div className={`w-fit p-3 rounded-full ${items.color} mb-2`}>
                  {items.icons}
                </div>

                <h1 className="font-medium md:font-bold text-gray-800 text-sm md:text-lg">
                  {items.id}. {items.title}
                </h1>
                <p className="text-xs md:font-medium text-gray-600">
                  {items.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
