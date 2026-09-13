import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import login from "../../images/login.png";

export const Login = ({ handleLoginData, loginErr }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    handleLoginData(data);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch max-w-6xl mx-auto md:p-4 py-2 mt-15">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white md:p-8 p-5 md:rounded-2xl shadow-sm"
        >
          <h2 className="md:text-3xl text-2xl font-bold text-center text-gray-800 mb-8">
            Login Your Account
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-600 ml-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="harsh@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-sm font-medium text-gray-600 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <p className="text-red-600 text-sm font-medium absolute top-19 italic">
                {loginErr?.mes}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-end">
              <motion.button
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="bg-blue-600 w-full items-center px-10 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors group"
              >
                Login
              </motion.button>
            </div>
          </form>

          {/* Don't have an account / Login switch container */}
          <div className="mt-4 w-full max-w-md mx-auto text-center flex items-center justify-center gap-2">
            <p className="text-sm text-gray-600 font-medium">
              Don't have an account?
            </p>
            <a
              href="/signup"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Sign up
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full flex items-center justify-center bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <img
            src={login}
            alt="Quick Signup"
            className="max-h-full max-w-full object-contain"
          />
        </motion.div>
      </div>
    </>
  );
};
