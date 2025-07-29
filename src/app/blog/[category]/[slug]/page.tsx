"use client";

import React from "react";
import { useParams } from "next/navigation";
import {allPosts} from "@/app/blog/allContent";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { LineShadowText } from "@/components/magic-ui/line-shadow-text";
import Particles from '@/components/reactbits/Particles';
export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;
  const slug = params.slug as string;

  const post = allPosts.find(p => p.slug === slug && p.category === category);
  const { resolvedTheme } = useTheme();
  const shadowColor = "white" ;
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            文章未找到
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            抱歉，您访问的文章不存在。
          </p>
          <button
            onClick={() => router.push('/blog')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回博客列表
          </button>
        </div>
      </div>
    );
  }

  // 渲染找到的文章组件
  const PostComponent = post.component;
  return (
   
  <section className="relative w-full">
  <div className="absolute inset-0 z-0 pointer-events-none">
  <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
  </div>
  <div className="relative z-10">
    <PostComponent 
renderTitle={(title) => {
  return (
    <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-center">
     <LineShadowText className="italic" shadowColor={shadowColor} >
      {title}
    </LineShadowText>
  </h1>
  );
}}

    
    />
  </div>
</section>

  );
} 