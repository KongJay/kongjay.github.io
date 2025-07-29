"use client";
import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Cover } from "@/components/ui/cover";
import { ShinyButton } from "../components/magic-ui/shiny-button"
import { SmoothCursor } from "../components/magic-ui/smooth-cursor";
import { InteractiveHoverButton } from "../components/magic-ui/interactive-hover-button";
import { useRouter } from "next/navigation";
import { Zoom } from 'react-awesome-reveal';
// pages/index.tsx 或 app/page.tsx
import { Inter } from 'next/font/google'
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // 可按需添加
  display: 'swap'
})
export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        backgroundImage: "url('/snow.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%"
      }}
    >
    

    <div className={inter.className}>
      <h1 className="text-4xl font-bold">Hello 红模仿 Inter</h1>
     
    </div>
         <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          <Cover> 你好，欢迎来到我的世界</Cover>  
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center leading-relaxed">
          我是一名全栈开发者，热衷于用代码打造属于自己的小宇宙。<br />
          平时喜欢听歌、看电影、健身，当然，还有周杰伦的歌单在每个深夜循环播放。<br />
          这个博客，是我记录灵感、分享项目和生活碎片的地方。<br />
          <span className="inline-block mt-4 font-semibold text-xl tracking-wide">我是 红模仿 </span>
        </p>
        <br/>
        <br/>
        <br/>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <ShinyButton onClick={() => router.push("/home")}>进入主页</ShinyButton>
          <InteractiveHoverButton
            className="bg-white text-black group-hover:bg-black group-hover:text-white border border-black"
            onClick={() => router.push("/blog")}
          >
            查看博客
          </InteractiveHoverButton>
        </div>
   
      
    </div>
  );
}
