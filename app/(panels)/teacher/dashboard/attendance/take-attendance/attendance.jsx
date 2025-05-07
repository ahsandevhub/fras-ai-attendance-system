"use client";

import { addAttendance } from "@/app/lib/actions";
import * as faceapi from "face-api.js";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { FaClipboardCheck } from "react-icons/fa6";
import { IoMdDoneAll } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import {
  RiBookLine,
  RiBuilding2Line,
  RiCalendarLine,
  RiGroupLine,
} from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import Filters from "./filters";

const Attendance = ({ students, labels, filters, courses, instructor }) => {
  const [isPending, startTransition] = useTransition();
  const canvasRef = useRef();
  const [image, setImage] = useState(null);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [confidence, setConfidence] = useState(0.5);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isAllImageLoaded, setAllImageLoaded] = useState(false);
  const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState([]);

  const loadModels = useCallback(async () => {
    if (!isModelLoading) return;
    setIsModelLoading(true);
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    setIsModelLoading(false);
  }, [isModelLoading]);

  useEffect(() => {
    loadModels();
  }, [loadModels]);

  const loadLabeledImages = useCallback(async () => {
    if (isModelLoading || !filters.dept || !filters.sem || !filters.sec) return;
    setIsImageLoading(true);
    const descriptors = [];

    for (const label of labels) {
      const img = await faceapi.fetchImage(
        `https://frasbucket.s3.amazonaws.com/images/students/${label}.jpg`,
      );
      const detection = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      if (detection) {
        descriptors.push(
          new faceapi.LabeledFaceDescriptors(label, [detection.descriptor]),
        );
      }
    }
    setLabeledFaceDescriptors(descriptors);
    setIsImageLoading(false);
    setAllImageLoaded(true);
  }, [isModelLoading, filters, labels]);

  useEffect(() => {
    if (!isModelLoading) {
      loadLabeledImages();
    }
  }, [isModelLoading, loadLabeledImages]);

  const handleAttendance = (id) => {
    console.log("Clicked: " + id);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const img = await faceapi.bufferToImage(file);
    setConfidence(0.5);
    setImage(img);
    detectFaces(img);
  };

  const handleImageRemove = () => {
    const fileInput = document.getElementById("image");
    fileInput.value = null;
    setConfidence(0.5);
    setImage(null);
    setDetectedFaces([]);
  };

  const handleConfidenceChange = (e) => {
    setConfidence(parseFloat(e.target.value));
  };

  const detectFaces = async (img) => {
    if (isImageLoading || labeledFaceDescriptors.length === 0) return;

    const detections = await faceapi
      .detectAllFaces(
        img,
        new faceapi.SsdMobilenetv1Options({ minConfidence: confidence }),
      )
      .withFaceLandmarks()
      .withFaceDescriptors();

    const imgElement = document.getElementById("renderedImage");
    const displaySize = {
      width: imgElement.offsetWidth,
      height: imgElement.offsetHeight,
    };

    canvasRef.current.width = displaySize.width;
    canvasRef.current.height = displaySize.height;

    faceapi.matchDimensions(canvasRef.current, displaySize);

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const ctx = canvasRef.current.getContext("2d");

    // Draw only the bounding boxes
    resizedDetections.forEach((detection) => {
      const { x, y, width, height } = detection.detection.box;
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red"; // Change color if desired
      ctx.rect(x, y, width, height);
      ctx.stroke();
    });

    extractAndMatchFaces(img, detections);
  };

  const extractAndMatchFaces = async (img, detections) => {
    if (labeledFaceDescriptors.length === 0) return;

    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
    const faces = await Promise.all(
      detections.map(async (detection) => {
        const { x, y, width, height } = detection.detection.box;
        const faceCanvas = document.createElement("canvas");
        faceCanvas.width = width;
        faceCanvas.height = height;
        faceCanvas
          .getContext("2d")
          .drawImage(img, x, y, width, height, 0, 0, width, height);
        const faceDescriptor = detection.descriptor;
        const bestMatch = faceMatcher.findBestMatch(faceDescriptor);
        return { face: faceCanvas.toDataURL(), label: bestMatch.toString() };
      }),
    );
    setDetectedFaces(faces);
  };

  useEffect(() => {
    if (image) {
      detectFaces(image);
    }
  }, [confidence, image]);

  const detectedIdArray = useMemo(
    () => detectedFaces.map((face) => face.label.split(" ")[0]),
    [detectedFaces],
  );

  const attendanceArray = labels.map((id) => ({
    id,
    attend: detectedIdArray.includes(id),
  }));

  return (
    <div className="">
      {isModelLoading ? (
        <div className="flex h-[calc(100vh-62px)] flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 shadow-sm">
          <div className="relative">
            {/* Outer ring */}
            <div className="h-20 w-20 rounded-full border-4 border-rose-100"></div>

            {/* Animated spinner */}
            <div className="absolute left-0 top-0 h-20 w-20 animate-spin rounded-full border-4 border-rose-600 border-t-transparent"></div>

            {/* Center icon */}
            <FaClipboardCheck className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-rose-600" />
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Loading Attendance System
            </h3>
            <p className="mt-1 text-gray-500">
              Initializing face recognition models...
            </p>
          </div>

          {/* Progress bar with linear animation */}
          <div className="mt-4 w-full max-w-xs overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-2 bg-gradient-to-r from-rose-500 to-rose-600"
              style={{
                width: "100%",
                transformOrigin: "0% 50%",
                animation: "progress 1.5s linear infinite",
              }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="">
          <Filters courses={courses} />
          <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left Column - Image Upload */}
            <div className="h-max space-y-4 md:sticky md:top-16">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <label htmlFor="image" className="cursor-pointer">
                  {image ? (
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img
                        id="renderedImage"
                        src={image.src}
                        alt="image"
                        className="h-full w-full object-contain grayscale"
                      />
                      <canvas
                        ref={canvasRef}
                        className="absolute left-0 top-0 h-full w-full"
                      />
                      <TiDelete
                        className="absolute right-2 top-2 m-1 cursor-pointer rounded-full bg-white/80 p-1 text-3xl text-rose-600 hover:bg-rose-100"
                        onClick={handleImageRemove}
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex aspect-video items-center justify-center rounded-lg border-2 border-dashed ${labels.length <= 0 ? "cursor-not-allowed border-orange-300 bg-orange-50" : "border-blue-300 bg-blue-50"}`}
                    >
                      <span
                        className={`px-8 py-4 text-lg font-medium ${labels.length <= 0 ? "text-orange-600" : "text-blue-600"}`}
                      >
                        {labels.length <= 0
                          ? "Please select dept, sem, sec and course!"
                          : "Take attendance with photo!"}
                      </span>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  disabled={labels.length <= 0}
                  className="hidden"
                />

                {image && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <p className="font-medium">
                        {detectedFaces.length} faces detected!
                      </p>
                      <div className="flex items-center gap-2">
                        <label htmlFor="confidence" className="text-sm">
                          Min Confidence:
                        </label>
                        <input
                          type="number"
                          id="confidence"
                          max={0.9}
                          min={0.1}
                          step={0.1}
                          value={confidence}
                          onChange={handleConfidenceChange}
                          className="w-16 rounded-lg border border-gray-300 px-2 py-1 text-center text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3 md:grid-cols-6 2xl:grid-cols-10">
                      {detectedFaces
                        .sort((a, b) =>
                          a.label
                            .split(" ")[0]
                            .localeCompare(b.label.split(" ")[0]),
                        )
                        .map((faceData, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center rounded-lg border border-gray-200 p-1"
                          >
                            <img
                              src={faceData.face}
                              alt={`Face ${index + 1}`}
                              className="aspect-square h-auto w-full rounded-md object-cover brightness-110"
                            />
                            <p className="mt-1 text-xs font-medium">
                              {faceData.label.split(" ")[0]}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Student List */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gray-50 p-4">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium text-gray-600">Filters:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${filters.dept ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-500"}`}
                    >
                      <RiBuilding2Line className="mr-1" />
                      {filters.dept || "Department"}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${filters.sem ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-500"}`}
                    >
                      <RiCalendarLine className="mr-1" />
                      {filters.sem || "Semester"}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${filters.sec ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-500"}`}
                    >
                      <RiGroupLine className="mr-1" />
                      {filters.sec || "Section"}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${filters.course ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-500"}`}
                    >
                      <RiBookLine className="mr-1" />
                      {filters.course || "Course"}
                    </span>
                  </div>
                </div>
              </div>

              {students.length > 0 ? (
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-spacing-0 text-center text-sm">
                      <thead>
                        <tr className="bg-gray-50 *:border *:p-3">
                          <th className="rounded-tl-lg">SL</th>
                          <th className="">Photo</th>
                          <th className="">ID</th>
                          <th className="">Name</th>
                          <th className="rounded-tr-lg">Attendance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student, index) => (
                          <tr
                            key={index}
                            className="*:border *:px-3 *:py-2 hover:bg-gray-50"
                          >
                            <td className="">
                              {((filters.page || 1) - 1) *
                                (filters.limit || 50) +
                                index +
                                1}
                            </td>
                            <td className="">
                              <Image
                                src={student.photo}
                                width={50}
                                height={50}
                                alt={student.id}
                                className="mx-auto h-12 w-12 rounded-md object-cover"
                              />
                            </td>
                            <td className="font-medium">{student.id}</td>
                            <td className="">{student.name}</td>
                            <td className="">
                              <input
                                type="checkbox"
                                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked={detectedIdArray.includes(student.id)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                    <p className="text-sm font-medium">
                      {detectedIdArray.length} students marked as present
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        startTransition(() =>
                          addAttendance({
                            course:
                              courses.find(
                                (course) => course.code === filters.course,
                              )?._id || null,
                            instructor: instructor,
                            dept: filters.dept,
                            sem: filters.sem,
                            sec: filters.sec,
                            attendance: attendanceArray,
                          }),
                        )
                      }
                      disabled={!filters.course}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-blue-700 ${!filters.course ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400" : "bg-blue-600"} `}
                    >
                      <IoMdDoneAll className="text-lg" />
                      {isPending ? "Saving Attendance..." : "Confirm & Save"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 p-6">
                  <IoWarningOutline className="text-4xl text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-800">
                      No students found!
                    </p>
                    <p className="text-sm text-gray-600">
                      Please select department, semester and section
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
