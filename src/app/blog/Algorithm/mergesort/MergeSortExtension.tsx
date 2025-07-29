"use client";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { CodeBlock } from "@/components/ui/code-block";
type Props = {
  renderTitle?: (title: string) => React.ReactNode;
};
export default function MergeSortExtension({ renderTitle }: Props) {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {mergeSortExtensionContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            {item.title && renderTitle ? (
  renderTitle(item.title)
) : item.title ? (
  <p className="text-xl mb-4 font-bold">{item.title}</p>
) : null}


            <div className="text-sm  prose prose-sm dark:prose-invert">
          
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

export const mergeSortExtensionContent = [
  {
    category:'algorithm',
    slug:'mergeSortExtension',
    title: "归并排序扩展",
  },
  {
    badge: '前言',
    description:(
      <>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;归并排序，作为经典的排序算法，很多人只把它当作一种工具用来“排序”。然而，随着算法学习的深入，我发现它其实不仅仅是排序的利器，更是一种强大的思维模式。  
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;以一道名为“区间和的个数”的问题为例，我们不仅需要计算子数组和落在指定区间内的数量，还要在保证效率的前提下，灵活运用归并排序的分治策略，结合前缀和和双指针技巧，实现复杂问题的简洁求解。  
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;本文将带你从最直观的暴力解法入手，逐步剖析问题中的优化思路，最终理解归并排序如何在排序的同时完成统计任务，实现时间复杂度由O(n²)优化至O(n log n)。这不仅是代码性能的提升，更是算法思想的升华。  
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;无论你是算法初学者还是有一定经验的程序员，希望通过这篇文章，你能体会到归并排序背后的分治思想如何解决实际问题，激发你对算法深层次理解的兴趣。  
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;归并排序，不只是排序；它是一种解决问题的利器，也是一种值得深入掌握的思考方式。让我们一起开启这段探索之旅。  
        </p>
      </>
    ),
  },
  { 
    description: (
      <>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;面对“区间和的个数”这个问题，最直接的想法就是穷举所有可能的子数组，然后计算它们的和，判断是否落在给定区间内。这个思路非常直观，容易理解，也是初学者常用的入门方法。  
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;具体来说，我们可以用两层循环，外层确定子数组起点，内层确定终点，然后逐个累加求和。伪代码如下：  
        </p>
        <div className="my-4">
          <CodeBlock
            language="java"
            filename="暴力解法"
            code={`int count = 0;
for (int i = 0; i < nums.length; i++) {
    int sum = 0;
    for (int j = i; j < nums.length; j++) {
        sum += nums[j];
        if (sum >= lower && sum <= upper) {
            count++;
        }
    }
}`}
          />
        </div>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;虽然写法简单，但这段代码的时间复杂度是O(n²)，对于数组规模很大的情况下，运行时间会非常长，效率不高。  
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;此外，每次计算子数组和都要从头累加，造成了大量重复计算。举个简单的例子，子数组 [i, j] 和 [i, j+1]，第二个子数组的和其实是前一个子数组和加上 nums[j+1]，这说明我们可以借助辅助结构来避免重复运算。  
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;这为我们下一步引入“前缀和”优化埋下了伏笔。它能够帮助我们快速计算任意区间和，避免重复累加，提高效率。  
        </p>
      </>
    ),
    badge:'暴力解法'
   },
  {
  
    description: (
      <>
        <p>
          Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
          deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
          non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
          sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
          velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
          commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
        </p>
      </>
    ),
    },
];
