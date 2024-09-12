"use client";

import { useState } from "react";

const TeacherPhoto = () => {
  const [teacherPhoto, setTeacherPhoto] = useState(null);

  // handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setTeacherPhoto(file);
  };

  const handleImageRemove = () => {
    const fileInput = document.getElementById("photo");
    fileInput.value = null;

    setTeacherPhoto(null);
  };

  return (
    <div className="space-y-5">
      <div className="group flex items-center gap-8">
        <label htmlFor="photo" className="w-32">
          Teacher Photo:
        </label>
        <input
          name="photo"
          id="photo"
          type="file"
          onChange={handleImageChange}
          className="flex-grow rounded border px-3 py-2 text-sm outline-none"
          required
        />
      </div>
      <div className="group relative mx-auto flex w-40 items-center justify-center gap-8">
        {teacherPhoto && (
          <img
            src={teacherPhoto ? URL.createObjectURL(teacherPhoto) : ""}
            alt="photo"
            className="aspect-square border bg-white object-cover p-1"
          />
        )}
        {teacherPhoto && (
          <div
            className="absolute -right-2 -top-2 flex aspect-square w-6 cursor-pointer items-center justify-center rounded bg-gray-300 text-sm font-medium text-rose-600 hover:bg-rose-600 hover:text-white"
            onClick={handleImageRemove}
          >
            X
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherPhoto;
