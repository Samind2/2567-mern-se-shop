import Loading from "./Loading";
import loadingAnimation from "../Loading/loading.json";
console.log("loadingAnimation:", loadingAnimation);
console.log(loadingAnimation);



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
