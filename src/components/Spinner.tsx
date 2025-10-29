const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex items-center justify-center${className ? " " + className : ""}`}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
    </div>
  );
};

export default Spinner;
