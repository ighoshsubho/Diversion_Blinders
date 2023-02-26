"use client";
// import ImagePost from "@/components/ImagePost";
// import TextPost from "@/components/CreatePost";
import { useState } from "react";
import CreatePost from "@/components/CreatePost";
const Service = () => {
  const [prompt, setPrompt] = useState("");
  return (
    // <div className="py-16">
    //   {/* <SampleCohere /> */}
    //   <div className="flex items-center justify-center gap-4 py-16">
    //     <h1 className="text-white">Enter prompt</h1>
    //     <br />
    //     <input
    //       className="border-2 border-black rounded-md p-2 text-background"
    //       onChange={(e) => setPrompt(e.target.value)}
    //       type="text"
    //       placeholder="Enter a prompt"
    //       setPrompt()
    //     />

    //   </div>
    //   <ImagePost params={prompt} />
    //   <TextPost params={prompt} />
    <div>
      <CreatePost />
    </div>
  );
};

export default Service;
