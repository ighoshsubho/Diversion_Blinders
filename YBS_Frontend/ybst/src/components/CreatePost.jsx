"use client";
import Image from "next/image";
import axios from "axios";
import React, { useState, useEffect } from "react";
// import { preview } from '../assets';
import { getRandomPrompt } from "../random/page";

import FormField from "./FormField";
import Loader from "./Loader";
import { auth, database, storage } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";

const CreatePost = () => {
  // const [text, setText] = useState('');
  // const [file, setFile] = useState("");
  // const [data, setData] = useState({});
  // const [per, setPerc] = useState(null);

  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [option, setOption] = useState(false);
  const [id, setId] = useState("");
  const [fireData, setFireData] = useState([]);
  const [file, setFile] = useState(null);

  const databaseRef = collection(database, "users");

  let router = useRouter();

  useEffect(() => {
    let token = sessionStorage.getItem("Token");
    if (token) {
      getData();
    }
    if (!token) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [option]);

  // const handleInput = (e) => {
  //     const id = e.target.id;
  //     const value = e.target.value;

  //     setData({ ...data, [id]: value });
  // };

  // console.log(data)

  // const handleAdd = async (e) => {
  //     e.preventDefault();
  //     try {
  //         await setDoc(doc(database, "users", sessionStorage.getItem('uid')), {
  //             ...data,
  //             timeStamp: serverTimestamp(),
  //         });
  //         router.push("/createPost")
  //     } catch (err) {
  //         console.log(err);
  //     }
  // };

  const addData = () => {
    addDoc(databaseRef, {
      text: text,
      image: image,
      uid: sessionStorage.getItem("uid"),
    })
      .then(() => {
        alert("Data Sent");
        getData();
        setText("");
        setImage("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getData = async () => {
    await getDocs(databaseRef).then((response) => {
      setFireData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.uid };
        })
      );
    });
  };

  const getID = (id, text, image) => {
    setId(id);
    setText(text);
    setImage(image);
  };

  //   const deleteDocument = (id) => {
  //     let fieldToEdit = doc(databaseRef, 'users', id);
  //     deleteDoc(fieldToEdit)
  //     .then(() => {
  //       alert('Data Deleted')
  //       getData()
  //     })
  //     .catch((err) => {
  //       alert('Cannot Delete that field..')
  //     })
  //   }

  const logout = () => {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("uid");
    router.push("/login");
  };

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await axios.post(
          `https://empty-parks-fall-34-126-125-57.loca.lt/text2img`,
          {
            // Accept: 'application/json',
            // Media- Type: "application/json;charset=UTF-8",

            prompt: prompt,
            // "negative_prompt": "string",
            // "scheduler": "EulerAncestralDiscreteScheduler",
            // "image_height": 512,
            // "image_width": 512,
            // "num_images": 1,
            // "guidance_scale": 7,
            // "steps": 50,
            // "seed": 42,

            method: "POST",
            inputs: prompt,
          }
          // { responseType: "blob" }
        );

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Generate me an image");
    }
  };

  return (
    //     <div className={styles.container}>
    //   <Head>
    //     <title>Next CRUD AUTH</title>
    //     <meta name="description" content="Generated by create next app" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

    //   <main className={styles.main}>
    //     <div>
    //       <button onClick={logout}>Log Out</button>
    //     </div>
    //     <h1>Home</h1>

    //     <input
    //       placeholder='Name'
    //       className={styles.inputBox}
    //       type="text"
    //       value={name}
    //       onChange={event => setName(event.target.value)}
    //     />
    //     <input
    //       placeholder='Age'
    //       className={styles.inputBox}
    //       type="number"
    //       value={age}
    //       onChange={event => setAge(event.target.value)}
    //     />
    // <div className="bg-page-gradient pt-navigation-height">

    // <div>
    //   {fireData.map((data) => {
    //     return (
    //       <div className={styles.flex}>
    //         <h3>Name: {data.name}</h3>
    //         <p>Age: {data.age}</p>
    //         <button
    //           className={styles.button}
    //           onClick={() => getID(data.id, data.name, data.age)}
    //         >Update</button>
    //         <button
    //           className={styles.button}
    //           onClick={() => deleteDocument(data.id)}
    //         >Delete</button>
    //       </div>
    //       )
    //     })}
    //   </div>
    <div className="min-h-[calc(100vh-73px)] w-full bg-[#171b29] px-4 py-8 sm:p-8">
      <section className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-[32px] font-extrabold text-[#e0e1e9]">Create</h1>
          <p className="mt-2 max-w-[500px] text-[14px] text-[#e6eaed]">
            Generate an imaginative image{" "}
          </p>
        </div>

        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="Eg., John Doe"
              value={form.name}
              handleChange={handleChange}
            />

            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="A batter playing"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className="border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 w-64 h-64 relative flex items-center justify-center rounded-lg border bg-white p-3 text-sm">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="h-full w-full object-contain"
                />
              ) : (
                <img
                  src=""
                  alt="preview"
                  className="h-9/12 w-9/12 object-contain opacity-40"
                />
              )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex items-center justify-center rounded-lg bg-[rgba(239,82,82,0.5)]">
                  <Loader />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className=" px-2.5 w-full rounded-md bg-[#21bf0f] py-3 text-center text-sm font-medium text-white sm:w-auto"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </section>
      <button
        class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        onClick={logout}
      >
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Purple to blue
        </span>
      </button>
    </div>
    // </div>
  );
};

export default CreatePost;
