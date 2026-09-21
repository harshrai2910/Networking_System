import { motion } from "motion/react";
import { TopLeft } from "./TopLeft";
import { TopRight } from "./TopRight";
import { MiddleInfo } from "./MiddleInfo";
import { Steps } from "./Steps";
import { JoinSection } from "./JoinSection";

export const LandingPage = () => {
  return (
    <>
      <div className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-7 bg-blue-50 pt-15">
          <div className="md:col-span-1 pl-5 hidden md:block">
            <div className="h-15 w-15 bg-blue-100 rounded-2xl rotate-45 mt-20"></div>
            <div className="h-35 w-35 bg-blue-100 rounded-3xl rotate-45 mt-20"></div>
          </div>

          {/* Top right corner box */}
          <div className="md:col-span-3 md:pt-15 pt-5 px-5">
            <TopLeft />
          </div>
          {/* Top left (image) corner box */}
          <div className="md:col-span-3">
            <TopRight />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <MiddleInfo />
        </div>
        <div className="flex items-center justify-center">
          <Steps />
        </div>
        <div className="flex items-center justify-center">
          <JoinSection />
        </div>
      </div>
    </>
  );
};
