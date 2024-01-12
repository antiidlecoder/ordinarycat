"use client";
import Canvas from "@/components/canvas";
import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-screen-lg mx-auto min-h-screen flex items-center">
      <div className="bg-black p-8">
        <p>~ ordinary catz ~</p>
        <Canvas />
      </div>
    </main>
  );
}
