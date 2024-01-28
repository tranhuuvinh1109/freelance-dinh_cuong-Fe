import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      style={{ background: 'rgba(0,0,0,0.5)', zIndex: 10000000 }}
    >
      <div className="animate-spin text-white">
        <AiOutlineLoading3Quarters fontSize={58} />
      </div>
    </div>
  );
};

export default Loading;
