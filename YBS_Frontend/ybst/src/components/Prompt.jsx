'use client'
import axios from "axios";
import Image from "next/image";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function Prompt() {
  const [prompt, setPrompt] = useState("");
  const [imageBlob, setImageBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [loading1, setLoading1] = useState(false);
  const [result, setResult] = useState('')
  const [error1, setError1] = useState(null);
  const [model, setModel] = useState('EleutherAI/gpt-j-6B')

  const logout = () => {
    sessionStorage.removeItem('Token')
    sessionStorage.removeItem('uid')
    router.push('/login')
}

let router = useRouter();

const getPrompts = async () => {
  setLoading1(true);
  try{
  const response = await axios.post(
      `https://api-inference.huggingface.co/models/Gustavosta/MagicPrompt-Stable-Diffusion`,
      {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          inputs: prompt,
          max_return_sequences: 4
      },
      { responseType: "text" }
  );
  setResult(response.data);
  }
  catch (err){
      console.log(err);
      setError1(true)
  }
  finally{
      setLoading1(false)
  }
}

const generateText = async () => {
  setLoading1(true);
  try{
  const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          inputs: prompt,
      },
      { responseType: "text" }
  );
  setResult(response.data);
  }
  catch (err){
      console.log(err);
      setError1(true)
  }
  finally{
      setLoading1(false)
  }
}

    console.log(prompt)
    console.log(model)
    console.log(result)

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
                  onClick={getPrompts}
                  className="bg-black text-white rounded-md p-2"
              >
                  Next
              </button>
              {loading && <p>Loading...</p>}
          </div>
          {imageBlob && (
              <div className="flex flex-col gap-4 items-center justify-center">
                  <Image src={`data:image/png;base64,${imageBlob}`} alt="AI generated image" height={500} width={500} />

              </div>
          )}
      </div>
      <div className="flex flex-col justify-center items-center">
                    <button
                        onClick={getPrompts}
                        className="bg-[#2fd12f] text-white rounded-md p-3"
                    >
                        Next
                    </button>
                    {error && <span className="">Bad Response!</span>}

                    {loading1 && <p>Loading...</p>}

                    {!loading1 && console.log(result)}
                </div>
  </div>
  
);
}

export default Prompt;