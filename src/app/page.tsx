'use client'

// import Image from "next/image"
import LibraryContent from "@/lib/LibraryContent"

export default function Home() {
  return (<>
    <main 
      // bg-gradient-to-b from-gray-900 to-black
      className="flex-1 
        bg-slate-50
        relative
      "
    >
      <div className="container h-full
        mx-auto 
        px-4 py-8 pb-16
        flex flex-col
      ">
        <LibraryContent></LibraryContent>
      </div>
    </main>
  </>);
}
