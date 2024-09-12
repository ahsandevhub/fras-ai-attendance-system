"use client";
import Image from "next/image";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

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
    <fieldset className="product_image space-y-5">
      <div className="group flex items-center gap-8">
        <label htmlFor="photo" className="w-32">
          Student Photo:
        </label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/*"
          onChange={handleImageChange}
          className="flex-grow rounded border bg-white px-3 py-2 text-sm outline-none"
        />
      </div>
      <div className="">
        {studentImage ? (
          <div className="mx-auto w-[250px]">
            <div className="relative h-full w-full rounded-md border bg-white p-2">
              <Image
                src={studentImage}
                alt="student image"
                height={300}
                width={300}
                className="aspect-square h-auto w-full rounded-md object-cover"
              />
              <div
                className="absolute -right-2 -top-2 cursor-pointer rounded-full bg-white text-3xl text-rose-500 hover:bg-rose-500 hover:text-gray-50"
                onClick={handleImageRemove}
              >
                <IoIosCloseCircle />
              </div>
            </div>
          </div>
        ) : (
          <label
            htmlFor="photo"
            className="mx-auto flex aspect-square w-[250px] flex-grow cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white object-cover shadow-inner"
          >
            <div className="text-center text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm11 7a1 1 0 010 2h-3v3a1 1 0 01-2 0v-3H7a1 1 0 110-2h3V7a1 1 0 012 0v3h3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="mt-2 block text-sm font-medium">
                Click to add Image
              </span>
            </div>
          </label>
        )}
      </div>
    </fieldset>
  );
};

export default StudentImage;
