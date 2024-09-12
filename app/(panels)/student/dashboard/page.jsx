// import Image from "next/image";

const DashboardPage = async () => {
  return (
    <div>
      <div className="header mb-4 flex items-center justify-between border-b pb-2">
        <h1 className="text-lg font-medium text-green-600">My Profile</h1>
      </div>
      <div className="flex gap-5">
        {/* <div className="profile flex w-64 shrink-0 flex-col items-center gap-2 rounded-md border p-4">
          <div className="image">
            <div className="img overflow-hidden">
              <Image
                src={`/images/students/${student?.photo}`}
                alt={"student photo"}
                height={100}
                width={100}
                priority="true"
                className="aspect-square bg-gray-100 object-cover"
              />
            </div>
          </div>
          <div className="name flex flex-col items-center justify-center text-center">
            <span className="font-medium">Name: {student?.name}</span>
            <span>ID: {student?.id}</span>
            <span>
              Semester: {student?.sem}; Section: {student?.sec}
            </span>
            <span>Department of {student?.dept}</span>
          </div>
        </div> */}
        <div className="attendence flex-grow">
          <table className="w-full border">
            <thead>
              <tr className="border">
                <th className="border px-3 py-2">SL</th>
                <th className="border py-2">Course Code</th>
                <th className="border py-2">Course Title</th>
                <th className="border py-2">Total Classes</th>
                <th className="border py-2">Attendence</th>
                <th className="border py-2">Percentage</th>
                <th className="border py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border text-center">
                <td className="border p-1">1</td>
                <td className="border p-1">CSE-0610-112</td>
                <td className="border p-1">
                  Fourier Analysis and Laplace Transform
                </td>
                <td className="border p-1">6</td>
                <td className="border p-1">4</td>
                <td className="border p-1">76%</td>
                <td className="border p-1">Permitted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
