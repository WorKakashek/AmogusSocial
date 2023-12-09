"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR from "swr";
import { BsSendFill } from "react-icons/bs";
import Image from "next/image";
interface IPostComments {
  postSlug: String;
}
const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const PostComments = ({ postSlug }: IPostComments) => {
  const { status } = useSession();
  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );
  const [text, setText] = useState("");
  const handleComment = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc: text, postSlug: postSlug }),
    });
    setText("");
  };
  return (
    <div className="p-3 rounded-lg bg-white flex-1 flex flex-col justify-between ">
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <>loading</>
        ) : (
          data?.map((comment: any) => {
            const dateObject = new Date(comment.createAt);
            const dateString = dateObject.toISOString().split("T")[0];
            return (
              <div className=" p-2 rounded-lg  bg-gray-400" key={comment._id}>
                <div className="flex gap-2">
                  <Image
                    className=" rounded-full"
                    alt="avatar"
                    src={comment.user.image}
                    width={25}
                    height={25}
                  />
                  <p>{comment.user.name}</p>
                  <p className=" text-neutral-500">{dateString}</p>
                </div>
                <p className=" px-3">{comment.desc}</p>
              </div>
            );
          })
        )}
      </div>
      <div className="flex w-full">
        <textarea
          className=" flex-1 rounded-xl outline outline-offset-2 outline-4 p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className=" overflow-visible" onClick={handleComment}>
          <BsSendFill />
        </button>
      </div>
    </div>
  );
};

export default PostComments;
