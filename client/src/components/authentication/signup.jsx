import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { FormField } from "./formField";
import signupImg from "../../images/signup.png";

export const Signup = ({ handleSignupData }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    handleSignupData(data);
    console.log(data);

    reset();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch max-w-6xl mx-auto md:p-4 py-2 mt-15">
      <div className="w-full max-w-2xl bg-white md:p-8 p-5 md:rounded-2xl shadow-sm">
        <h2 className="md:text-3xl text-2xl font-bold text-center text-gray-800 mb-8">
          Create Your Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label="Username"
            name="username"
            register={register}
            placeholder="Harsh_rai_123"
            required={true}
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            register={register}
            placeholder="harsh@example.com"
            required={true}
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            register={register}
            placeholder="••••••••"
            required={true}
          />
          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            placeholder="••••••••"
            required={true}
          />

          <div className="pt-4 flex items-center justify-end">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="bg-blue-600 w-full hover:bg-blue-700 cursor-pointer text-white font-semibold py-3 rounded-lg shadow-md transition-colors"
            >
              Signup
            </motion.button>
          </div>
        </form>
      </div>

      <div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full flex items-center justify-center bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
      >
        <img
          src={signupImg}
          alt="Quick Signup"
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};
