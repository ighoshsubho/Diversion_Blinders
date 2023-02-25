import axios from "axios";
import Image from "next/image";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function CreatePost() {
  const [prompt, setPrompt] = useState("");
  const [imageBlob, setImageBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [loading1, setLoading1] = useState(false);
  const [result, setResult] = useState("");
  const [error1, setError1] = useState(null);
  const [model, setModel] = useState("EleutherAI/gpt-j-6B");

  const [error2, setError2] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [result1, setResult1] = useState("");

  const logout = () => {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("uid");
    router.push("/login");
  };

  let router = useRouter();

  const getPromptForStableDiffusion = async () => {
    setLoading2(true);
    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/merve/chatgpt-prompts-bart-long`,
        {
          headers: {
            Authorization: "Bearer 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",
          },
          method: "POST",
          inputs: prompt,
        },
        { responseType: "text" }
      );
      setResult1(response.data);
    } catch (err) {
      console.log(err);
      setError2(true);
    } finally {
      setLoading2(false);
    }
  };

  const generateText = async () => {
    setLoading1(true);
    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          headers: {
            Authorization: "Bearer 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",
          },
          method: "POST",
          inputs: prompt,
        },
        { responseType: "text" }
      );
      setResult(response.data);
    } catch (err) {
      console.log(err);
      setError1(true);
    } finally {
      setLoading1(false);
    }
  };

  const generateArt = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://mean-eggs-dream-34-124-168-229.loca.lt/text2img`,
        {
          prompt: prompt,
          negative_prompt: "string",
          scheduler: "EulerAncestralDiscreteScheduler",
          image_height: 512,
          image_width: 512,
          num_images: 1,
          guidance_scale: 7,
          steps: 50,
          seed: 42,
        }
      );
      JSON.stringify(response.data.images);

      setImageBlob(response.data.images);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  console.log(prompt);
  console.log(model);
  console.log(result);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-extrabold">AI Image Generator</h1>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-4">
          <input
            className="border-2 border-black rounded-md p-2 text-background"
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Enter a prompt"
          />
          <button
            onClick={getPromptForStableDiffusion}
            className="bg-black text-white rounded-md p-2"
          >
            Next
          </button>
          {!loading && <p>Loading...</p>}
          {loading ? <p>Loading...</p> : generateArt}
        </div>
        {imageBlob && (
          <div className="flex flex-col gap-4 items-center justify-center">
            <Image
              src={`data:image/png;base64,${imageBlob}`}
              alt="AI generated image"
              height={500}
              width={500}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={generateText}
          className="bg-[#2fd12f] text-white rounded-md p-3"
        >
          Next
        </button>
        {loading1 && <p>Loading...</p>}

        {!loading1 && console.log(result)}
      </div>
    </div>
  );
}

export default CreatePost;
