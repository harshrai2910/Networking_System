import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { FormField } from "./formField";

export const Signup = ({ handleSignupData }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    handleSignupData(data);
    reset();
  };

  return (
    <div className="flex items-center justify-center md:p-4 py-2 md:mt-20 mt-10">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white md:p-8 p-5 md:rounded-2xl shadow-sm"
      >
        <h2 className="md:text-3xl text-2xl font-bold text-center text-gray-800 mb-8">
          Create Your Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Row 1: Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="First Name"
              name="firstName"
              register={register}
              placeholder="Harsh"
            />
            <FormField
              label="Last Name"
              name="lastName"
              register={register}
              placeholder="Rai"
            />
          </div>

          {/* Row 2: College & Course */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="College Name"
              name="clgName"
              register={register}
              placeholder="XYZ college"
            />
            <FormField
              label="Course"
              name="course"
              type="select"
              register={register}
              placeholder="Select Course"
              options={[
                { value: "bca", label: "BCA" },
                { value: "bba", label: "BBA" },
                { value: "bcom", label: "B.com" },
              ]}
            />
          </div>

          {/* Row 3: Grad Year & Username */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Graduation Year"
              name="gradYear"
              type="select"
              register={register}
              placeholder="Choose Year"
              options={[
                { value: "2025", label: "2025" },
                { value: "2026", label: "2026" },
                { value: "2027", label: "2027" },
                { value: "2028", label: "2028" },
                { value: "2029", label: "2029" },
              ]}
            />
            <FormField
              label="Username"
              name="username"
              register={register}
              placeholder="Harsh_rai_123"
            />
          </div>

          {/* Row 4: Email (Full Width) */}
          <FormField
            label="Email"
            name="email"
            type="email"
            register={register}
            placeholder="harsh@example.com"
          />

          {/* Row 5: Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Password"
              name="password"
              type="password"
              register={register}
              placeholder="••••••••"
            />
            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              placeholder="••••••••"
            />
          </div>

          <div className="pt-4 flex items-center justify-end">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="bg-blue-600 w-full hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors"
            >
              Signup
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
