import React from "react";
import CategoryCards from "../components/Cards";
import { VelocityText } from "../components/VerText";
import FreelancerTimeline from "../components/Scroll";
import Footer from "../components/Footer";
import QuickStartCards from "../components/QuickStartCards";


function Home() {
  return (
    <>
<div className="flex flex-col items-center justify-center min-w-1px min-h-10px bg-gray-0">
   <div className="w-full flex justify-center my-6">
  <div className="w-10/12 h-2 bg-black rounded"></div>
</div>


    <div className="flex flex-col items-center justify-center min-h-10px bg-black-0">
  <h1 className="font-heading font-extrabold text-8xl text-[#320E3B] transform scale-y-125 md:text-9xl lg:text-[14rem] tracking-widest3 relative transition-all duration-300 hover:scale-105 hover:text-[#E9DBDE] hover:shadow-[4px_4px_15px_rgba(0,0,0,0.3)]">
  WORKSPHERE
</h1>


  <div className="w-full flex justify-center my-6">
  <div className="w-1/2 h-1 bg-black rounded"></div>
</div>


    </div>
    </div>
    <div className="w-full flex text-2xl text-[#667E7F] font-light justify-center my-1 tracking-widest font-cursive relative transition-all duration-300 hover:scale-105" >
  "Whether you’re just starting out or already skilled, WorkSphere helps you move forward"
</div>

<QuickStartCards />
<div className="w-3/4 mx-auto border-t-2 border-dotted border-black my-8"></div>

    <VelocityText />
    <FreelancerTimeline />
    <Footer />
   



</>
  );
}

export default Home;