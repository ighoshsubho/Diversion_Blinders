"use client";
import axios from "axios";

import Image from "next/image";
import Typewriter from "typewriter-effect/dist/core";
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
            Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE}}`,
          },
          method: "POST",
          inputs: prompt,
        },
        { responseType: "blob" }
      );
      // convert blob to a image file type
      const file = new File([response.data], "image.png", {
        type: "image/png",
      });
      console.log(file);
      setFile(file);
      console.log(response);
      const url = URL.createObjectURL(response.data);
      // console.log(url)
      console.log(url);
      setImageBlob(url);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const cohere = require("cohere-ai");
  cohere.init("vPeFqvj73Z7fMyFDb99H27sbt1fSIQN44uqCu5TG"); // This is your trial API key
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
    setResult(`${response.body.generations[0].text}`);
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

  // console.log(prompt);
  // console.log(model);
  // console.log(result);
  const contentpost = result;
  console.log(contentpost);

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
            onClick={generateArt}
            className="bg-primary-gradient text-white rounded-md p-2"
          >
            Next
          </button>
          {loading && <p>Loading...</p>}
        </div>
        {imageBlob && (
          <div className="flex flex-col gap-4 items-center justify-center">
            <img src={imageBlob} alt="AI generated image" />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        {/* <button
          onClick={cohereBlogPostIntro}
          className="bg-[#2fd12f] text-white rounded-md p-3"
        >
          Next
        </button> */}
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
            className="space-x-4"
          >
            <span>Blog Post </span>+
          </Button>
          <Button
            variant="primary"
            size="large"
            title="BlogPost"
            onClick={cohereBlogPostIntro}
            className="justify-between"
          >
            <span>Blog Intro </span>
          </Button>
          {/* <textarea defaultValue={postContent} /> */}
          {/* <p>{contentpost}</p>
           */}
        </div>
        <div className="p-auto">
          <>
            <p className="p-10">{contentpost}</p>
          </>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
