import { Suspense } from "react";
import Attendance from "./attendance";

const Page = () => {
  return (
    <Suspense>
      <Attendance />
    </Suspense>
  );
};

export default Page;
