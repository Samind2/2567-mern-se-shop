import Loading from "./Loading";
import loadingAnimation from "../Loading/Loading2.json";

const SuspenseContent = () => {
  return (
    <div className="w-full h-screen z-0">
      <div className="flex items-center justify-center h-full">
        <Loading animation={loadingAnimation} />
      </div>
    </div>
  );
};

export default SuspenseContent;