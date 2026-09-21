import React from "react";
import { HiArrowRight } from "react-icons/hi";
import img_07 from "../../assets/img_07.png";

export const JoinSection = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="relative overflow-hidden rounded-3xl bg-blue-50 border border-blue-100/60 shadow-sm px-6 py-12 sm:px-12 sm:py-16 md:py-20 text-center select-none">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

        {}
        <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-12 pointer-events-none text-left">
          <div
            className="relative font-sans text-blue-500/80 font-bold text-lg sm:text-xl tracking-wide leading-tight italic"
            style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
          >
            <p>Students</p>
            <p className="ml-2">Today</p>
            <p className="ml-1">Leaders</p>
            <p className="ml-3">Tomorrow</p>
          </div>
        </div>

        {}
        {/* Top Right Spiral Arrow */}
        <div className="hidden md:block absolute right-24 top-8 sm:top-10 pointer-events-none text-blue-500">
          <img src={img_07} alt="" className="h-13 hidden md:block shrink-0" />
        </div>

        {/* Bottom Right Handwritten Text (Learn Collaborate Grow) */}
        <div className="hidden lg:block absolute right-8 bottom-8 pointer-events-none text-left rotate-6">
          <div
            className="font-sans text-blue-500/80 font-bold text-base sm:text-lg leading-snug italic"
            style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
          >
            <p>Learn</p>
            <p className="ml-1">Collaborate</p>
            <p className="ml-2 flex items-center gap-1">
              Grow
              <span className="inline-block text-xl">→</span>
            </p>
          </div>
        </div>

        {}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          {/* Top Subtitle Badge */}
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-blue-500/90 mb-3">
            BE A PART OF SOMETHING BIGGER
          </span>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Ready to Connect, Learn & Grow?
          </h2>

          {/* Description Paragraph */}
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-xl">
            Join thousands of students who are already sharing, learning and
            building a brighter future together on ConnectSD.
          </p>

          {}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            {/* Primary Button */}
            <button className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer">
              <span>Get Started</span>
              <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary Button */}
            <button className="w-full sm:w-auto px-7 py-3.5 bg-white/90 hover:bg-white text-blue-600 font-semibold rounded-xl border border-blue-400/80 hover:border-blue-500 shadow-sm transition-all duration-200 flex items-center justify-center cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <JoinSection />
    </div>
  );
}
