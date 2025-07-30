// 该文件定义了一个带有响应式导航栏的页面组件
// 使用了Next.js的客户端组件模式
"use client";

import React from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
// 导入3D卡片组件
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
// 导入Ballpit组件
import Ballpit from '@/components/reactbits/Ballpit'
// 导入OrbitingCircles动画组件
import { OrbitingCircles } from "@/components/magic-ui/orbiting-circles";
// 导入图标组件
import { File, Settings, Search } from "lucide-react";
// 导入响应式导航栏组件
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
// 导入useState钩子用于状态管理
import { useState } from "react";

/**
 * AppleCardsCarouselDemo组件
 * 功能: 展示带有3D卡片效果的轮播演示页面
 * 包含响应式导航栏，适配桌面和移动设备
 */
export default function AppleCardsCarouselDemo() {
    // 导航菜单项配置
    const navItems = [
        {
            name: "Features", // 功能特性
            link: "#features",
        },
        {
            name: "Pricing", // 价格
            link: "#pricing",
            subItems: [
                { name: "Product 1", link: "/products/1" },
                { name: "Product 2", link: "/products/2" },
            ]  
        },
        {
            name: "博客", // 博客
            link: "#contact",
        },
    ];

    // 移动菜单状态管理
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
      <div className="bg-black min-h-screen "> {/* 黑色背景，全屏高度 */}
          <div className="relative w-full"> {/* 相对定位，全宽度 */}
              <Navbar > {/* 导航栏组件 */}
                  {/* 桌面导航 */}
                  <NavBody> {/* 导航主体 */}
                      <NavbarLogo/> {/* 导航栏Logo */}
                   
                      <NavItems  items={navItems}/> {/* 导航菜单项 */}
                      <div className="flex items-center gap-4"> {/* 按钮容器 */}
                          <NavbarButton variant="secondary">Login</NavbarButton> {/* 登录按钮 */}
                          <NavbarButton variant="primary">Book a call</NavbarButton> {/* 预约按钮 */}
                      </div>
                  </NavBody>

                  {/* 移动导航 */}
                  <MobileNav> {/* 移动导航组件 */}
                      <MobileNavHeader> {/* 移动导航头部 */}
                          <NavbarLogo/> {/* Logo */}
                          <MobileNavToggle
                              isOpen={isMobileMenuOpen}
                              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // 切换菜单打开状态
                          /> /* 菜单切换按钮 */
                      </MobileNavHeader>

                      <MobileNavMenu
                          isOpen={isMobileMenuOpen}
                          onClose={() => setIsMobileMenuOpen(false)} // 关闭菜单
                      > {/* 移动菜单内容 */}
                          {navItems.map((item, idx) => (
                              <a
                                  key={`mobile-link-${idx}`}
                                  href={item.link}
                                  onClick={() => setIsMobileMenuOpen(false)} // 点击后关闭菜单
                                  className="relative text-neutral-600 dark:text-neutral-300"
                              >
                                  <span className="block">{item.name}</span>
                              </a>
                          ))}
                          <div className="flex w-full flex-col gap-4"> {/* 移动按钮容器 */}
                              <NavbarButton
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  variant="primary"
                                  className="w-full"
                              >
                                  Login
                              </NavbarButton>
                              <NavbarButton
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  variant="primary"
                                  className="w-full"
                              >
                                  Book a call
                              </NavbarButton>
                          </div>
                      </MobileNavMenu>
                  </MobileNav>
              </Navbar>
          </div>
      </div>
  );
}


