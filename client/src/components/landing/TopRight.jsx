import img_04 from "../../assets/img_04.png";
import img_05 from "../../assets/img_05.png";
import img_06 from "../../assets/img_06.png";

export const TopRight = () => {
  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px] overflow-hidden bg-linear-to-br">
      {/* Main image */}
      <div
        className="
          absolute
          left-[8%] top-[8%]
          w-[55%] h-[65%]
          sm:w-[50%] sm:h-[72%]
          lg:w-[46%] lg:h-[78%]
          rounded-3xl overflow-hidden bg-gray-200
        "
      >
        <img
          src={img_04}
          alt="Student"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top-right image */}
      <div
        className="
          absolute
          right-[8%] top-[6%]
          w-[32%] h-[32%]
          sm:right-[10%] sm:w-[30%] sm:h-[35%]
          lg:right-[13%] lg:w-[28%] lg:h-[38%]
          rounded-3xl overflow-hidden bg-gray-300 rotate-6
        "
      >
        <img
          src={img_06}
          alt="Student"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom-right image */}
      <div
        className="
          absolute
          right-[8%] bottom-[10%]
          w-[52%] h-[35%]
          sm:right-[10%] sm:w-[48%] sm:h-[38%]
          lg:right-[15%] lg:w-[45%] lg:h-[38%]
          rounded-3xl overflow-hidden
          border-[4px] sm:border-[6px]
          border-white shadow-lg
        "
      >
        <img
          src={img_05}
          alt="Student"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Build Connections */}
      <div
        className="
          absolute left-0 top-[10%]
          w-24 sm:w-28.75
          rounded-2xl bg-white/95 backdrop-blur-md
          px-3 sm:px-4 py-3 sm:py-4 shadow-sm
        "
      >
        <div className="mb-2 sm:mb-3 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-50">
          <span className="text-xl text-blue-600">♧</span>
        </div>

        <p className="text-xs sm:text-sm font-semibold leading-tight text-gray-900">
          Build
          <br />
          Connections
        </p>
      </div>

      {/* Share Projects */}
      <div
        className="
          absolute left-0 top-[43%]
          w-24 sm:w-26.25
          rounded-2xl bg-white/95 backdrop-blur-md
          px-3 sm:px-4 py-3 sm:py-4 shadow-sm
        "
      >
        <div className="mb-2 sm:mb-3 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-50">
          <span className="text-lg font-bold text-blue-600">&lt;/&gt;</span>
        </div>

        <p className="text-xs sm:text-sm font-semibold leading-tight text-gray-900">
          Share
          <br />
          Projects
        </p>
      </div>

      {/* Showcase */}
      <div
        className="
          absolute right-[30%] top-[8%]
          z-20
          w-22 sm:w-23.75
          rounded-2xl bg-white/95 backdrop-blur-md
          px-3 sm:px-4 py-3 sm:py-4 shadow-sm
        "
      >
        <div className="mb-2 sm:mb-3 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-50">
          <span className="text-xl text-blue-600">▥</span>
        </div>

        <p className="text-[11px] sm:text-xs font-semibold leading-tight text-gray-900">
          Showcase
          <br />
          Your Skills
        </p>
      </div>
    </div>
  );
};
