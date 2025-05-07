"use client";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";

const TeacherPhoto = ({ src }) => {
  const [teacherImage, setTeacherImage] = useState(src || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTeacherImage(URL.createObjectURL(file));
    }
  };

  const handleImageRemove = () => {
    document.getElementById("teacherPhoto").value = null;
    setTeacherImage(null);
  };

  return (
    <div className="space-y-4">
      {teacherImage ? (
        <div className="relative mx-auto w-[250px]">
          <div className="relative h-64 w-full overflow-hidden rounded-xl border-2 border-dashed border-blue-200 bg-blue-50">
            <img
              src={teacherImage}
              alt="Teacher Preview"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={handleImageRemove}
              className="absolute right-2 top-2 rounded-full bg-white p-1 text-rose-500 shadow-md hover:bg-rose-500 hover:text-white"
            >
              <IoIosCloseCircle className="text-2xl" />
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="teacherPhoto"
          className="flex aspect-square h-64 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50 p-4 text-center transition hover:border-blue-300 hover:bg-blue-100"
        >
          <RiImageAddLine className="mb-2 text-4xl text-blue-400" />
          <span className="text-sm font-medium text-blue-600">
            Click to upload teacher photo
          </span>
          <span className="mt-1 text-xs text-blue-400">
            Recommended size: 500x500px
          </span>
        </label>
      )}

      <input
        type="file"
        name="photo"
        id="teacherPhoto"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        required
      />
    </div>
  );
};

export default TeacherPhoto;
