"use client";
import axios from "axios";

import Image from "next/image";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Button } from "./Button";


function CreatePost() {
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [imageBlob, setImageBlob] = useState(null);
  const [file, setFile] = useState(null);

  const [loading1, setLoading1] = useState(false);
  const [result, setResult] = useState("");
  const [error1, setError1] = useState(null);
  const [model, setModel] = useState("EleutherAI/gpt-j-6B");
  const [content, setContent] = useState("");
  const logout = () => {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("email");
    router.push("/login");
  };

  let router = useRouter();

  const generateArt = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_APP_HUGGING_FACE}}`,
          },
          method: "POST",
          inputs: prompt,
        },
        { responseType: "blob" }
      );

      const file = new File([response.data], "image.png", {
        type: "image/png",
      });
      console.log(file);
      setFile(file);
      console.log(response);
      const url = URL.createObjectURL(response.data);

      console.log(url);
      setImageBlob(url);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let token = sessionStorage.getItem('Token')
    if (token) {
        getData()
    }
    if (!token) {
        router.push('/login')
    }
}, [])

  const cohere = require("cohere-ai");
  cohere.init(process.env.NEXT_APP_COHERE);
  const cohereGetParagraphGenerator = async () => {
    const response = await cohere.generate({
      model: "command-xlarge-nightly",
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.9,
      k: 0,
      p: 0.75,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: [],
      return_likelihoods: "NONE",
    });
    setResult(`${response.body.generations.text}`);
  };

  const cohereGetLinkedInPostGenerator = async () => {
    const response = await cohere.generate({
      model: "command-xlarge-nightly",
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.9,
      k: 0,
      p: 0.75,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: [],
      return_likelihoods: "NONE",
    });
    setResult(`${response.body.generations[0].text}`);
  };

  const cohereBlogPostGenerator = async () => {
    const response = await cohere.generate({
      model: "command-xlarge-nightly",
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.9,
      k: 0,
      p: 0.75,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: [],
      return_likelihoods: "NONE",
    });
    setResult(`${response.body.generations[0].text}`);
  };

  const cohereBlogPostIntro = async () => {
    const response = await cohere.generate({
      model: "command-xlarge-nightly",
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.9,
      k: 0,
      p: 0.75,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: [],
      return_likelihoods: "NONE",
    });
    setResult(`${response.body.generations[0].text}`);
  };

  let contentpost = 0;
  contentpost = result;
  console.log(contentpost);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-page-gradient py-6">
      <h1 className="text-4xl font-sans">AI Image Generator</h1>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <input
            className="border-2 text-2xl border-black rounded-full p-2 text-background font-light"
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Enter a prompt"
          />
          <Button
            variant="primary"
            size="large"
            onClick={generateArt}
            className=" flex flex-col justify-center dark:bg-slate-600 bg-amber-200 lg:text-lg p-5  dark:text-white lg:text-violet-500"
          >
            <span>Image</span>
          </Button>

          {loading && <p>Loading...</p>}
        </div>
        {imageBlob && (
          <div className="flex flex-col gap-4 items-center justify-center">
            <Image
              src={imageBlob}
              alt="AI generated image"
              width={500}
              height={500}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        {loading1 && <p>Loading...</p>}

        {!loading1 && console.log(result)}
      </div>
      <div className="relative w-full lg:max-w-sm">
        <div className="flex flex-row space-x-5 justify-center dark:bg-slate-600 bg-amber-200 lg:text-lg p-5  dark:text-white lg:text-violet-500">
          <Button
            variant="primary"
            size="large"
            title="LinkedIn"
            onClick={cohereGetLinkedInPostGenerator}
            className="justify-between"
          >
            <span>LinkedIn </span>
          </Button>
          <Button
            variant="primary"
            size="large"
            title="Paragraph"
            onClick={cohereGetParagraphGenerator}
            className="space-x-4"
          >
            <span>Paragraph </span>
          </Button>
          <Button
            variant="primary"
            size="large"
            title="BlogIntro"
            onClick={cohereBlogPostGenerator}
            className="space-x-4 px-10"
          >
            <span className="inline-block">Blog Post</span>
          </Button>
          <Button
            variant="primary"
            size="large"
            title="BlogPost"
            onClick={cohereBlogPostIntro}
            className="justify-between inline-flex px-10"
          >
            <span>Blog Intro</span>
          </Button>
        </div>
        <div className="p-auto">
          <>
            <p className="p-10 inline-flex">{contentpost}</p>
          </>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
