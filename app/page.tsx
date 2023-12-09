import Posts from "@/components/Posts";

export default function Home({ searchParams }: any) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <main className=" min-h-screen bg-slate-800">
      <Posts page={page} />
    </main>
  );
}
