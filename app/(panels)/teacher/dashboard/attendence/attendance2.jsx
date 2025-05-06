"use client";

import * as faceapi from "face-api.js";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { VscLoading } from "react-icons/vsc";
import Filters from "./filters";

const Attendance = ({ students, labels, filters }) => {
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

  return (
    <div className="space-y-3">
      {isModelLoading ? (
        <div className="flex h-[calc(100vh-62px)] flex-col items-center justify-center gap-2 rounded-md border bg-gray-100">
          <VscLoading className="animate-spin text-5xl text-blue-600" />
          <p className="text-xl font-medium">Loading Models, Please wait...</p>
        </div>
      ) : (
        <div className="">
          <Filters />
          <div className="sticky top-0 z-50 h-3 bg-white"></div>
          <div className="main grid grid-cols-2 gap-5">
            <div className="left">
              <div className="sticky top-3 space-y-3">
                <div className="max-w-full overflow-hidden rounded-md border bg-gray-100">
                  <label htmlFor="image" className="cursor-pointer">
                    {image ? (
                      <div className="relative aspect-video">
                        <img
                          id="renderedImage"
                          src={image.src}
                          alt="image"
                          className="object-contain grayscale"
                        />
                        <canvas
                          ref={canvasRef}
                          className="absolute left-0 top-0 h-full w-full"
                        />
                      </div>
                    ) : (
                      <div
                        className={`flex aspect-video items-center justify-center ${labels.length <= 0 ? "cursor-not-allowed" : ""}`}
                      >
                        {labels.length <= 0 ? (
                          <span className="h-max rounded border-2 border-dotted border-orange-500 px-8 py-4 text-lg font-medium text-orange-600">
                            Please select dept, sem, sec and course!
                          </span>
                        ) : (
                          <span className="h-max rounded border-2 border-dotted border-blue-500 px-8 py-4 text-lg font-medium text-blue-600">
                            Take attendance with photo!
                          </span>
                        )}
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
                    <TiDelete
                      className="absolute right-0 top-0 m-1 cursor-pointer text-3xl text-white hover:bg-rose-600"
                      onClick={handleImageRemove}
                    />
                  )}
                </div>
                {image && (
                  <div className="">
                    <div className="flex items-center justify-between rounded-md border p-2">
                      <p>{detectedFaces.length} faces detected!</p>
                      <div className="flex items-center gap-2">
                        <label htmlFor="confidence">Min Confidence:</label>
                        <input
                          type="number"
                          id="confidence"
                          max={0.9}
                          min={0.1}
                          step={0.1}
                          value={confidence}
                          onChange={handleConfidenceChange}
                          className="rounded border text-center"
                        />
                      </div>
                    </div>
                    <div className="flex w-full flex-wrap gap-3 py-3">
                      {detectedFaces
                        .sort((a, b) =>
                          a.label
                            .split(" ")[0]
                            .localeCompare(b.label.split(" ")[0]),
                        )
                        .map((faceData, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center border"
                          >
                            <img
                              src={faceData.face}
                              alt={`Face ${index + 1}`}
                              className="h-14 w-14 brightness-110"
                            />
                            <p className="text-xs">
                              {faceData.label.split(" ")[0]}
                            </p>
                          </div>
                        ))}
                    </div>
                    {/* <button
                      type="button"
                      className="block w-full cursor-not-allowed rounded-md bg-blue-500 px-5 py-3 text-white hover:bg-gray-300"
                    >
                      + Add new image
                    </button> */}
                  </div>
                )}
              </div>
            </div>
            <div className="right flex-grow">
              <p className="mb-2 rounded border bg-gray-50 p-2 text-sm font-medium">{`${filters.dept ? filters.dept : "Department is not selected"} > ${filters.sem ? filters.sem : "Semester is not selected"} > ${filters.sec ? filters.sec : "Section is not selected"} > ${filters.course ? filters.course : "Course is not selected"}`}</p>
              {students.length > 0 ? (
                <div className="">
                  <table className="relative w-full border-separate border-spacing-0 text-sm md:text-base">
                    <thead>
                      <tr className="sticky top-3 bg-gray-100">
                        <th className="border-b-2 border-l border-r border-t border-gray-300 py-2">
                          SL
                        </th>
                        <th className="border-b-2 border-r border-t border-gray-300 py-2">
                          Photo
                        </th>
                        <th className="border-b-2 border-r border-t border-gray-300 py-2">
                          ID
                        </th>
                        <th className="border-b-2 border-r border-t border-gray-300 py-2">
                          Name
                        </th>
                        <th className="border-b-2 border-r border-t border-gray-300 py-2">
                          Attendance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr
                          key={index}
                          className="text-center odd:bg-white even:bg-gray-50"
                        >
                          <td className="border-b border-l border-r border-gray-300 p-1">
                            {((filters.page || 1) - 1) * (filters.limit || 50) +
                              index +
                              1}
                          </td>
                          <td className="border-b border-r border-gray-300 p-1">
                            <Image
                              src={student.photo}
                              width={50}
                              height={50}
                              alt={student.id}
                              className="mx-auto h-12 w-12 object-cover"
                            />
                          </td>
                          <td className="border-b border-r border-gray-300 p-1">
                            {student.id}
                          </td>
                          <td className="border-b border-r border-gray-300 p-1">
                            {student.name}
                          </td>
                          <td className="border-b border-r border-gray-300 p-1">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-blue-600"
                              defaultChecked={detectedIdArray.includes(
                                student.id,
                              )}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="button_group my-5 flex items-center justify-between">
                    <p>Total {5} students are marked as present!</p>
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-md bg-blue-500 px-5 py-2 text-sm text-white hover:bg-blue-600 hover:shadow-md"
                    >
                      <IoMdDoneAll className="text-xl" />
                      Confirm & Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-md border bg-gray-100 p-3">
                  <IoWarningOutline className="text-5xl text-orange-500" />
                  <div className="right space-y-1">
                    <p className="text-lg font-medium leading-none text-blue-500">
                      No students found!
                    </p>
                    <p className="leading-none">
                      Please select dept, sem, sec!
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
