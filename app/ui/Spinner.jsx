const Spinner = () => (
  <div className="flex h-screen items-center justify-center">
    <svg
      className="h-12 w-12 animate-spin text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="opacity-25"
      />
      <path d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12z" className="opacity-75" />
    </svg>
  </div>
)

export default Spinner
