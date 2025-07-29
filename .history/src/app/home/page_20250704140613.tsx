"use client";

import React from "react";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Ballpit from '@/components/reactbits/Ballpit'
import { OrbitingCircles } from "@/components/magic-ui/orbiting-circles";
import { File, Settings, Search } from "lucide-react";
import { MergeSortVisualizer } from "././leetco"
export default function AppleCardsCarouselDemo() {
  return (
<div className="bg-white min-h-screen ">
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <MergeSortVisualizer></MergeSortVisualizer>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
<div className="relative flex items-center justify-center overflow-hidden h-[800px] w-[80%] mx-auto pt-20">
  <OrbitingCircles path radius={380} className=" " >
    <File />
    <Settings />
    <File />
  </OrbitingCircles>
  <CardContainer className="inter-var w-[400px]  "
   containerClassName=""     // 作用于外层真正撑开高度的容器
  >
      <CardBody className="  bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl  font-bold text-neutral-600 dark:text-white"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full mt-4"
        >
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            translateX={-40}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            translateX={40}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  <OrbitingCircles path radius={300} reverse className="">
 
    <File />
    <Settings />
    <File />
    <Search />
  </OrbitingCircles>
</div>
<br/>
 <br/>
 <br/>
 <br/>
 <br/>



  <div
    style={{
      position: 'relative',       // 相对定位，方便内部元素定位
      overflow: 'hidden',         // 超出容器部分隐藏，防止溢出显示
      minHeight: '500px',         // 容器最小高度 500px
      maxHeight: '500px',         // 容器最大高度 500px，固定高度
      width: '80%',               // 宽度为父容器的80%，保持左右空隙
      backgroundColor: '#000000', // 黑色背景，突出球体颜色
      margin: '0 auto',           // 左右自动外边距，实现水平居中
      borderRadius: '12px',       // 边角圆润，增加视觉美感
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' // 轻微阴影，增加层次感
    }}
  >
    {/* Ballpit 组件：渲染带物理效果的彩色球体 */}
    <Ballpit
      count={100}            // 球的数量，设置为100个球
      gravity={0.8}          // 重力系数，数值越大球下落越快
      friction={1}         // 摩擦力，控制球体运动阻力
      wallBounce={0.95}      // 球体与墙壁碰撞的弹力系数，接近1表示弹力大
      followCursor={true}    // 允许球体跟随鼠标移动
      colors={[
        '#1e3a8a', // 深靛蓝，球体颜色1
        '#4b5563', // 暗石墨灰，球体颜色2
        '#374151', // 煤灰色，球体颜色3
        '#6d28d9', // 紫靛色，球体颜色4
        '#0f172a'  // 深夜蓝，球体颜色5
      ]}
      ambientColor={0xffffff}  // 环境光颜色，白色光源增强整体亮度
      ambientIntensity={0.8}   // 环境光强度，值越大越亮
      lightIntensity={180}     // 主光源强度，影响球体高光
      minSize={0.8}            // 球体最小尺寸
      maxSize={1.2}            // 球体最大尺寸
    />
  </div>
</div>


   


  
  );
}


