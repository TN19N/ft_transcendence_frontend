import Background from "./Background";
const Loader: React.FC = () => {
  return (
    <div className='h-[100vh] flex items-center justify-center'>
      <Background />
    <div className="flex flex-col gap-4  bg-transparent ring ring-white ring-opacity-10 rounded-lg w-[90%]">
   <section className=' flex gap-2  h-[78vh] mb-6 m-auto items-center justify-center bg-background'> 
      <div className="loader">
        <div className="loader-ball"></div>
      </div>
    </section>
    </div>
    </div>
  );
};

export default Loader;
