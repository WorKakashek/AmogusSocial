"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
interface IFile {
  name: string;
}
const Create = () => {
  const { data, status } = useSession();
  const router = useRouter();

  const [file, setFile] = useState<IFile | null>(null);
  const [media, setMedia] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  //init fire base
  const storage = getStorage(app);

  useEffect(() => {
    const upLoad = () => {
      //@ts-ignore
      const name = new Date().getTime + file.name;
      const storageRef = ref(storage, name);
      //@ts-ignore
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };
    file && upLoad();
  }, [file]);
  // Handle loading state
  if (status === "loading") {
    return <h1 className="flex items-center justify-center">Loading...</h1>;
  }

  // Handle unauthenticated state
  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col">
        <h1>To create a post you must be authenticated</h1>
        <button className=" h-1" onClick={() => router.push("/login")}>
          Authenticate
        </button>
      </div>
    );
  }

  const slugify = (str: string) => {
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };
  const publichPost = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        desc: desc,
        img: media,
        slug: title,
      }),
    });
  };
  // Render the create post form
  return (
    <div className="w-full bg-slate-800 p-3">
      <h1 className="text-white">Create a post</h1>
      <input
        type="text"
        placeholder="Enter a title of your post"
        onChange={(e) => setTitle(e.target.value)}
        className=" p-3 rounded-lg mb-3"
      />
      <div className="flex gap-2">
        <textarea
          className=" p-3 rounded-lg"
          name=""
          id=""
          placeholder="Type a text"
          cols={30}
          rows={10}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <button onClick={() => setOpen(!open)}>
          <FaPlus />
        </button>
        {open && (
          <div>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              // style={{ display: "none" }}
            />
            <button onClick={() => setOpen(!open)}>
              <label htmlFor="image">
                <FaPlus />
              </label>
            </button>
            <button onClick={() => setOpen(!open)}>
              <FaPlus />
            </button>
            <button onClick={() => setOpen(!open)}>
              <FaPlus />
            </button>
          </div>
        )}
      </div>
      <button
        className="text-white p-3 rounded-lg bg-red-600"
        onClick={publichPost}
      >
        Publish
      </button>
    </div>
  );
};

export default Create;
