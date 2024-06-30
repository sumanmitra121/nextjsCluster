import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center p-6">
        <div className="container mx-auto flex justify-content-center flex-col items-center">
            <h2 className="text-4xl text-white font-bold mb-4">Browse our blog collection</h2>
            <Link href={'/blogs'} className="bg-white text-sm text-blue-700 font-semibold py-2 px-6 rounded">Explore Blogs</Link>
        </div>
    </div>
  );
}
