"use client";
import { IPost } from "@/components/Post";
import PostComments from "@/components/PostComments";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const getPost = async (slug: any) => {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
const SinglePage = async ({ params }: any) => {
  const { slug } = params;
  const data: IPost = await getPost(slug);

  return (
    <div className="w-full bg-slate-800 min-h-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
        <div className=" flex flex-col">
          <Swiper
            spaceBetween={2}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            width={600}
            height={600}
            style={{ maxWidth: "600px" }}
          >
            <SwiperSlide>
              <Image
                src={data.img}
                alt="image"
                width={600}
                height={600}
                className=" rounded-xl"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={data.img}
                alt="image"
                width={600}
                height={600}
                className=" rounded-xl"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={data.img}
                alt="image"
                width={600}
                height={600}
                className=" rounded-xl"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={data.img}
                alt="image"
                width={600}
                height={600}
                className=" rounded-xl"
              />
            </SwiperSlide>
          </Swiper>
          <div className="p-2">
            <h2 className="text-lg mb-3 font-bold text-white">{data.title}</h2>
            <p className="text-white">{data.desc}</p>
          </div>
        </div>
        <PostComments postSlug={slug} />
      </div>
    </div>
  );
};

export default SinglePage;
