import Image from "next/image";
import React from "react";
import { GrFormView } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import PostComments from "./PostComments";
import Link from "next/link";

export interface IPost {
  id: number;
  avatar: string;
  createAt: string;
  title: string;
  desc: string;
  img: string;
  views: string;
  userEmail: string;
  user: string;
  slug: string;
}

const Post = ({
  avatar,
  createAt,
  title,
  desc,
  img,
  views,
  userEmail,
  user,
  slug,
}: IPost) => {
  return (
    <Link
      href={`/posts/${slug}`}
      className="flex flex-row flex-1 gap-1 p-2 bg-slate-300 rounded-xl mb-3 mr-3 ml-3"
    >
      <div className="flex-1">
        <div className="flex mb-2 gap-2 justify-between">
          <div className="flex gap-2 items-center">
            <Image
              src={avatar}
              alt="avatar"
              width={6}
              height={6}
              className="rounded-full"
            />
            <p>{user}</p>
          </div>
          <span className="flex gap-1 items-center">
            <GrFormView className="w-5 h-5" />
            {views}
          </span>
        </div>
        <Image
          src={img}
          alt="image"
          width={6}
          height={6}
          className="rounded-md"
        />
        <p className="">{desc}</p>
        <div className="flex items-center justify-between">
          <button>
            <FaRegHeart className="w-5 h-5" />
          </button>
          <span>{createAt}</span>
        </div>
      </div>
    </Link>
  );
};

export default Post;
