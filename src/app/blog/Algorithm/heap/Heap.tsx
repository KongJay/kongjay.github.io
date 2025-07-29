"use client";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { CodeBlock } from "@/components/ui/code-block";
type Props = {
  renderTitle?: (title: string) => React.ReactNode;
};
export default function Heap({ renderTitle }: Props) {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {heapContent.map((item, index) => (
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

export const heapContent = [
    {
        category: 'algorithm',
        slug: 'heapStructure',
        title: '堆',
      },
      {
        badge: '前言',
        description: (
          <>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;堆（Heap）是数据结构中一个经常出现在各种面试题和实际项目中的重点工具。很多初学者听到“堆”会以为它是操作系统里的“堆内存”，其实不是。这里的“堆”是一种<strong>特殊的完全二叉树</strong>，经常用来实现优先级队列，并且在排序、调度、图算法等场景中有着非常广泛的应用。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;本文将从最基本的概念讲起，解释什么是完全二叉树、什么是大根堆与小根堆，再讲解堆的核心操作如插入（heapInsert）与下沉（heapify），并通过堆排序和典型面试题来展示堆的实际应用场景。你不仅能看懂，还能写出堆的代码，实现从“理解”到“掌握”的转变。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;无论你是算法初学者，还是准备面试的开发者，希望通过这篇文章，你能建立起对“堆”的整体认知，把它真正变成手中的利器。
            </p>
          </>
        ),
      },
      {
        badge: '什么是堆？',
        description: (
          <>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;堆是一种<strong>完全二叉树（Complete Binary Tree）</strong>。完全二叉树的特点是：从上到下、从左到右逐层填满，除了最后一层可以不满，其余层必须是满的。这使得堆可以用<strong>数组</strong>而不是指针结构来高效表示。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;堆分为两种类型：
              <ul>
                <li><strong>大根堆（Max-Heap）</strong>：父节点的值 ≥ 子节点的值，堆顶是最大值。</li>
                <li><strong>小根堆（Min-Heap）</strong>：父节点的值 ≤ 子节点的值，堆顶是最小值。</li>
              </ul>
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;在数组中表示堆时，有一套固定的下标规则，可以通过当前节点的位置 i 来计算它的父节点和子节点的位置：
            </p>
            <div className="my-4">
              <CodeBlock
                language="text"
                filename="下标公式"
                code={`当前节点下标：i
      父节点下标： (i - 1) / 2
      左子节点下标： i * 2 + 1
      右子节点下标： i * 2 + 2`}
              />
            </div>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;理解这些下标关系，是你实现堆结构操作的基础。
            </p>
          </>
        ),
      },
      {
        badge: 'heapInsert：插入操作',
        description: (
          <>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;在大根堆中，每次插入一个新元素时，我们要将它插入到堆的最后面，然后执行“上浮”操作，也称为 heapInsert。这个过程是从下往上比较与父节点的值，如果比父节点大，就交换位置，直到满足堆的性质或者到达堆顶。
            </p>
            <div className="my-4">
              <CodeBlock
                language="java"
                filename="heapInsert"
                code={`public void heapInsert(int[] arr, int index) {
          while (arr[index] > arr[(index - 1) / 2]) {
              swap(arr, index, (index - 1) / 2);
              index = (index - 1) / 2;
          }
      }`}
              />
            </div>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;这个过程最多上浮 logN 层（N 是堆的大小），所以时间复杂度是 <strong>O(logN)</strong>。
            </p>
          </>
        ),
      },
      {
        badge: 'heapify：下沉操作',
        description: (
          <>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;当我们从堆中删除最大值（堆顶）时，要将最后一个元素移到堆顶，然后执行“下沉”操作，也叫 heapify。这个操作从上到下比较当前节点和子节点，选择较大的子节点进行交换，直到重新满足大根堆的性质。
            </p>
            <div className="my-4">
              <CodeBlock
                language="java"
                filename="heapify"
                code={`public void heapify(int[] arr, int index, int heapSize) {
          int left = index * 2 + 1;
          while (left < heapSize) {
              int largest = left + 1 < heapSize && arr[left + 1] > arr[left] ? left + 1 : left;
              largest = arr[largest] > arr[index] ? largest : index;
              if (largest == index) break;
              swap(arr, index, largest);
              index = largest;
              left = index * 2 + 1;
          }
      }`}
              />
            </div>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;与插入操作类似，下沉操作的时间复杂度同样是 <strong>O(logN)</strong>。
            </p>
          </>
        ),
      },
      {
        badge: 'Java中的堆：PriorityQueue',
        description: (
          <>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;在 Java 中，堆已经被封装在 <code>PriorityQueue</code> 类中，默认实现是<strong>小根堆</strong>。如果你想要大根堆，需要传入自定义比较器。
            </p>
            <div className="my-4">
              <CodeBlock
                language="java"
                filename="PriorityQueue 示例"
                code={`PriorityQueue<Integer> minHeap = new PriorityQueue<>(); // 默认小根堆
      
      PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a); // 大根堆
      
      minHeap.add(10);
      minHeap.add(5);
      minHeap.add(7);
      
      System.out.println(minHeap.poll()); // 输出最小值 5`}
              />
            </div>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;这就是我们不手写堆的时候，优先使用的标准库类。
            </p>
          </>
        ),
      },
      {
        badge: '堆排序（heapSort）',
        description: (
          <>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;<strong>堆排序</strong> 是一个基于堆结构的排序算法，排序过程包含两步：
              <ol>
                <li>先将整个数组建成一个<strong>大根堆</strong>，确保堆顶是当前最大的值。</li>
                <li>然后不断将堆顶元素（最大值）与堆尾元素交换，并对剩余部分重新 heapify。</li>
              </ol>
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;<strong>建堆的方式</strong> 有两种：
              <ul>
                <li>一种是从前往后逐个 heapInsert，时间复杂度是 O(N logN)。</li>
                <li>更优的一种是从后往前 heapify，这样的时间复杂度是 O(N)，是堆排序真正推荐使用的方法。</li>
              </ul>
            </p>
            <div className="my-4">
              <CodeBlock
                language="java"
                filename="HeapSort - 从下往上 heapify 建堆"
                code={`public void heapSort(int[] arr) {
          if (arr == null || arr.length < 2) return;
      
          // Step 1：从最后一个非叶子节点开始 heapify 建堆
          for (int i = arr.length / 2 - 1; i >= 0; i--) {
              heapify(arr, i, arr.length);
          }
      
          // Step 2：每次把堆顶（最大值）换到末尾，并heapify剩下部分
          int heapSize = arr.length;
          while (heapSize > 0) {
              swap(arr, 0, --heapSize);
              heapify(arr, 0, heapSize);
          }
      }
      
      // 下沉操作
      private void heapify(int[] arr, int index, int heapSize) {
          int left = index * 2 + 1;
          while (left < heapSize) {
              int largest = left + 1 < heapSize && arr[left + 1] > arr[left] ? left + 1 : left;
              largest = arr[largest] > arr[index] ? largest : index;
              if (largest == index) break;
              swap(arr, index, largest);
              index = largest;
              left = index * 2 + 1;
          }
      }
      
      private void swap(int[] arr, int i, int j) {
          int tmp = arr[i];
          arr[i] = arr[j];
          arr[j] = tmp;
      }`}
              />
            </div>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;最终，堆排序会将一个<strong>无序数组</strong>排成<strong>升序数组</strong>（前提是使用大根堆），因为每次我们都把最大的数放到数组末尾，逐步锁定它的位置。
            </p>
            <p>
              <strong>时间复杂度：</strong>
              <ul>
                <li>建堆（heapify 从下往上）：O(N)</li>
                <li>排序过程（每次 O(logN)，执行 N 次）：O(N logN)</li>
              </ul>
              所以整体时间复杂度是 <strong>O(N logN)</strong>，空间复杂度为 O(1)，是一种<strong>原地排序算法</strong>。
            </p>
          </>
        ),
      },
      
      {
        badge: '经典题：每个数最多错位k范围内排序',
        description: (
          <>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;题目描述：一个几乎有序的数组，意味着每个元素离它排序后的位置最多只有 k 个距离，如何将其排序？这是堆的一个经典应用。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;思路是使用一个大小为 k+1 的小根堆，保持堆中总是当前“窗口”内的元素，依次将堆顶元素弹出放入结果中，即可完成排序。
            </p>
            <div className="my-4">
              <CodeBlock
                language="java"
                filename="距离不超过K的排序"
                code={`public void sortAlmostSortedArray(int[] arr, int k) {
          PriorityQueue<Integer> heap = new PriorityQueue<>();
          int index = 0;
      
          for (int i = 0; i <= Math.min(k, arr.length - 1); i++) {
              heap.add(arr[i]);
          }
      
          for (int i = k + 1; i < arr.length; i++) {
              heap.add(arr[i]);
              arr[index++] = heap.poll();
          }
      
          while (!heap.isEmpty()) {
              arr[index++] = heap.poll();
          }
      }`}
              />
            </div>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;这种方法的时间复杂度是 <strong>O(N logK)</strong>，比传统排序在这种特殊情况下更高效。
            </p>
          </>
        ),
      },
      
];
