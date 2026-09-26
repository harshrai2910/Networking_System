import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { updateProfileFromServer } from "../../../services/userLinkServices";
import { Sm_loader } from "../../Sm_Loader";
import { useState } from "react";

export const EditProfile = ({
  showProfileEdit,
  profileEdit,
  userData,
  setUserData,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [loaderOnUpdate, setLoaderOnUpdate] = useState(false);

  useEffect(() => {
    if (profileEdit) {
      document.body.style.overflow = "hidden";
      reset({
        firstName: userData.firstName,
        lastName: userData.lastName,
        headline: userData.headline,
        about: userData.about,
        clgName: userData.clgName,
        course: userData.course,
        gradYear: userData.gradYear,
      });
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [profileEdit]);

  const onSubmit = (data) => {
    setLoaderOnUpdate(true);
    updateProfileFromServer(data).then((data) => {
      setUserData(data.updatedProfile);
      showProfileEdit(false);
      setLoaderOnUpdate(false);
    });
  };

  return (
    <>
      <div
        onCanPlay={() => showProfileEdit(false)}
        className="fixed inset-0 bg-black/60 z-40"
      ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white w-2xl rounded-lg shadow-2xl">
          <div className="flex items-center justify-between px-5 py-2 border-b border-gray-500 bg-gray-100 shadow-xs">
            <h2 className="text-2xl font-semibold">Edit Profile</h2>
            <button
              onClick={() => showProfileEdit(false)}
              className="px-2 py-2 text-black font-medium rounded-full cursor-pointer hover:bg-gray-300 transition"
            >
              <RxCross2 className="text-xl" />
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full md:max-h-[65vh] max-h-[90vh] overflow-y-auto p-5"
          >
            <div className="flex justify-between items-center gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-slate-600">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-slate-600">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  placeholder="Enter your last name"
                  className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-600">
                Profile Image
              </label>
              <input
                type="file"
                {...register("profile")}
                className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-slate-600">
                  Course
                </label>

                <select
                  {...register("course")}
                  className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select your course
                  </option>

                  <option value="BCA">BCA</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="B.Com">B.Com</option>
                  <option value="BBA">BBA</option>
                  <option value="BA">BA</option>
                  <option value="MCA">MCA</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="M.Sc">M.Sc</option>
                  <option value="MBA">MBA</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-slate-600">
                  Graduation Year
                </label>

                <select
                  {...register("gradYear")}
                  className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select year
                  </option>

                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                  <option value="2032">2032</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-600">
                College Name
              </label>
              <input
                type="text"
                {...register("clgName")}
                placeholder="Enter your College name..."
                className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-600">
                Headline
              </label>
              <input
                type="text"
                {...register("headline")}
                placeholder="e.g. MERN Stack Developer | Designer"
                className="border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-600">
                About You
              </label>
              <textarea
                placeholder="Tell us about yourself..."
                rows={4}
                {...register("about")}
                className="text-sm border border-slate-300 rounded-lg px-3 sm:px-4 py-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
            <div className="flex items-center justify-end border-t border-gray-500 px-5 py-3 bg-gray-50">
              <button
                className={`py-2 border-none rounded-lg ${loaderOnUpdate ? "bg-blue-200 px-8" : "bg-blue-400 px-5"} text-white font-medium cursor-pointer`}
              >
                {loaderOnUpdate ? <Sm_loader /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
