"use client";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";

const StudentImage = ({ src }) => {
  const [studentImage, setStudentImage] = useState(src || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setStudentImage(URL.createObjectURL(file));
  };

  const handleImageRemove = () => {
    document.getElementById("photo").value = null;
    setStudentImage(null);
  };

  return (
    <div className="space-y-4">
      {studentImage ? (
        <div className="relative mx-auto w-[250px]">
          <div className="relative h-64 w-full overflow-hidden rounded-xl border-2 border-dashed border-blue-200 bg-blue-50">
            <img
              src={studentImage}
              alt="Student Preview"
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
          htmlFor="photo"
          className="flex aspect-square h-64 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50 p-4 text-center transition hover:border-blue-300 hover:bg-blue-100"
        >
          <RiImageAddLine className="mb-2 text-4xl text-blue-400" />
          <span className="text-sm font-medium text-blue-600">
            Click to upload student photo
          </span>
          <span className="mt-1 text-xs text-blue-400">
            Recommended size: 500x500px
          </span>
        </label>
      )}

      <input
        type="file"
        name="photo"
        id="photo"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        required
      />
    </div>
  );
};

export default StudentImage;
