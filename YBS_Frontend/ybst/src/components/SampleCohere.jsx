'use client'
import axios from "axios";
import Image from "next/image";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function SampleCohere() {
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

const generateTextFromPrompt = async () => {
    setLoading(true)
    try {
        const response = await axios.post(
            `https://mean-eggs-dream-34-124-168-229.loca.lt/text2img`,
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

const getTextFromImage = async () => {
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

const cohere = require('cohere-ai');
cohere.init('vPeFqvj73Z7fMyFDb99H27sbt1fSIQN44uqCu5TG'); // This is your trial API key
const cohereGetParagraphGenerator = async () => {
  const response = await cohere.generate({
    model: 'command-xlarge-nightly',
    prompt: prompt,
    max_tokens: 300,
    temperature: 0.9,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: [],
    return_likelihoods: 'NONE'
  });
  setResult(`${response.body.generations[0].text}`);
};


const cohereGetLinkedInPostGenerator = async () => {
    const response = await cohere.generate({
      model: 'command-xlarge-nightly',
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.9,
      k: 0,
      p: 0.75,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    });
  setResult(`${response.body.generations[0].text}`);
};

const cohereBlogPostGenerator = async () => {
  const response = await cohere.generate({
    model: 'command-xlarge-nightly',
    prompt: prompt,
    max_tokens: 300,
    temperature: 0.9,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: [],
    return_likelihoods: 'NONE'
  });
  setResult(`${response.body.generations[0].text}`);
};

const cohereBlogPostIntro = async () => {
    const response = await cohere.generate({
        model: 'command-xlarge-nightly',
        prompt: prompt,
        max_tokens: 300,
        temperature: 0.9,
        k: 0,
        p: 0.75,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: [],
        return_likelihoods: 'NONE'
      });
    setResult(`${response.body.generations[0].text}`);
  };

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
                        onClick={cohereBlogPostIntro}
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

export default SampleCohere;