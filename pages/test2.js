import Nav from "../components/Layout/Nav";

export default function Posts() {
  return (
    <div>
      <div className="w-screen flex">
        <div className="snap-x snap-mandatory w-3/4 h-screen overflow-scroll flex">
          <div className="snap-center bg-amber-200 w-full h-screen flex items-center justify-center text-8xl">
            1
          </div>
          <div className="snap-center bg-teal-200 w-full  h-screen flex items-center justify-center text-8xl">
            2
          </div>
          <div className="snap-center bg-cyan-200 w-full h-screen flex items-center justify-center text-8xl">
            3
          </div>
          <div className="snap-center bg-fuchsia-200 w-full h-screen flex items-center justify-center text-8xl">
            4
          </div>
        </div>
        <div className="w-1/4">TEST</div>
      </div>
    </div>
  );
}
