import { useFormStatus } from "react-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const AdminLoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex h-10 w-full items-center rounded-lg px-4 text-sm font-medium text-white transition-colors ${pending ? "cursor-not-allowed bg-gray-500 opacity-50" : "bg-blue-500 hover:bg-blue-600"} `}
    >
      {pending ? (
        <>
          <AiOutlineLoading className="mr-auto animate-spin text-lg text-gray-50" />
          Logging in...
        </>
      ) : (
        <>
          Log in
          <HiOutlineArrowNarrowRight className="ml-auto h-5 w-5 text-gray-50" />
        </>
      )}
    </button>
  );
};

export default AdminLoginButton;
