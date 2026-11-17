import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHome, FiCompass } from "react-icons/fi";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center px-4 overflow-hidden selection:bg-indigo-100 selection:text-indigo-700">
      {/* Soft Ambient Glows (No Grid) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative p-8 sm:p-10 text-center space-y-8">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-600 tracking-wide">
          <FiCompass className="w-3.5 h-3.5" />
          <span>404 ERROR</span>
        </div>

        {/* Clean Gradient 404 Display */}
        <div className="select-none">
          <h1 className="text-8xl sm:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-indigo-600">
            404
          </h1>
        </div>

        {/* Copy */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Oops! You're lost.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
            Even the best connections sometimes get lost. We couldn't find the
            page you're looking for. Let's get you back where the action is!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-sm font-semibold shadow-xs transition-all duration-200 cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all duration-200"
          >
            <FiHome className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
