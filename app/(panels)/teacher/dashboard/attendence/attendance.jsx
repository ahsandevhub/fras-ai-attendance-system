"use client";

import * as faceapi from "face-api.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
    faceapi.draw.drawDetections(canvasRef.current, resizedDetections);

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

  const detectedIdArray = useMemo(
    () => detectedFaces.map((face) => face.label.split(" ")[0]),
    [detectedFaces],
  );

  return (
    <div className="space-y-3">
      {isModelLoading ? (
        <div className="flex items-center gap-2 rounded-md border bg-gray-100 px-4 py-3">
          <VscLoading className="animate-spin text-xl text-blue-600" />
          <p>Loading Models, Please wait...</p>
        </div>
      ) : (
        <>
          <Filters />
          <div className="relative max-w-full overflow-hidden rounded-md border bg-sky-100">
            <label htmlFor="image" className="cursor-pointer">
              {image ? (
                <div className="relative aspect-video">
                  <img
                    id="renderedImage"
                    src={image.src}
                    alt="image"
                    className="object-cover"
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute left-0 top-0 h-full w-full"
                  />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center">
                  <span className="h-max rounded border-2 border-dotted border-blue-500 px-8 py-4 text-lg font-medium text-blue-600">
                    + Click to add Image
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
            <>
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
              <div className="grid grid-cols-1 gap-3">
                {detectedFaces.map((faceData, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      src={faceData.face}
                      alt={`Face ${index + 1}`}
                      className="h-16 w-16 rounded"
                    />
                    <p>{faceData.label.split(" ")[0]}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {students.length > 0 && (
            <>
              <h2 className="text-xl font-semibold">Matched Faces</h2>
              <ul>
                {students
                  .filter((student) => detectedIdArray.includes(student.id))
                  .map((student) => (
                    <li key={student.id} className="flex items-center">
                      <p>{student.name}</p>
                      <button
                        className="btn-primary ml-auto"
                        onClick={() => handleAttendance(student.id)}
                      >
                        Mark Present
                      </button>
                    </li>
                  ))}
              </ul>
            </>
          )}

          {detectedFaces.length > 0 && (
            <div className="mt-3 text-right">
              <button
                className="btn-primary"
                onClick={() => setDetectedFaces([])}
              >
                Clear Results
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Attendance;
