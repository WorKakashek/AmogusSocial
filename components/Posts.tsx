import React from "react";
import Post, { IPost } from "./Post";

interface IPosts {
  page: number;
}
const getPosts = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/posts`, {
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
const Posts = async ({ page }: IPosts) => {
  const posts = await getPosts();
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4">
      {posts ? (
        posts.map((post: IPost) => (
          <Post
            key={posts._id}
            id={post._id}
            avatar={post.avatar}
            createAt={post.createAt}
            title={post.title}
            desc={post.desc}
            img={post.img}
            views={post.views}
            userEmail={post.userEmail}
            user={post.user}
            slug={post.slug}
          />
        ))
      ) : (
        <div>No Posts</div>
      )}
    </div>
  );
};

export default Posts;
