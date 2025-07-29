"use client";

import React, { useState } from "react";
import Tree from "react-d3-tree";

type TreeNode = {
  name: string;
  children?: TreeNode[];
  value?: number; // 叶子节点存数字
};

// 递归拆分，生成树节点
function buildMergeSortTree(arr: number[]): TreeNode {
  if (arr.length === 1) {
    return { name: arr[0].toString(), value: arr[0] };
  }
  const mid = Math.floor(arr.length / 2);
  return {
    name: `[${arr[0]}...${arr[arr.length - 1]}]`,
    children: [
      buildMergeSortTree(arr.slice(0, mid)),
      buildMergeSortTree(arr.slice(mid)),
    ],
  };
}

// 中序遍历叶子节点，收集排序数组
function inorderLeafValues(node: TreeNode, result: number[] = []) {
  if (!node.children || node.children.length === 0) {
    if (typeof node.value === "number") {
      result.push(node.value);
    }
  } else {
    node.children.forEach((child) => inorderLeafValues(child, result));
  }
  return result;
}

export default function MergeSortTreeDemo() {
  // 示例数组
  const inputArray = [8, 3, 5, 4, 6, 1, 7, 2];

  // 生成树数据
  const treeData = buildMergeSortTree(inputArray);

  // 用状态保存排序结果
  const [sortedArray, setSortedArray] = useState<number[]>([]);

  const handleGetSortedArray = () => {
    const sorted = inorderLeafValues(treeData);
    setSortedArray(sorted);
  };

  // react-d3-tree 需要数据是数组形式
  const treeRootData = [treeData];

  return (
    <div style={{ width: "100%", height: "600px", fontFamily: "Arial, sans-serif", padding: 16 }}>
      <h2>归并排序拆分树示例</h2>

      <button
        onClick={handleGetSortedArray}
        style={{
          marginBottom: 12,
          padding: "8px 16px",
          fontSize: 16,
          borderRadius: 6,
          border: "none",
          backgroundColor: "#3b82f6",
          color: "white",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        获取叶子节点顺序数组
      </button>

      <div style={{ marginBottom: 24 }}>
        排序结果数组: <strong>[{sortedArray.join(", ")}]</strong>
      </div>

      <div id="treeWrapper" style={{ width: "100%", height: "450px", border: "1px solid #ddd", borderRadius: 8, background: "#fafafa" }}>
        <Tree
          data={treeRootData}
          orientation="vertical"
          pathFunc="elbow"
          translate={{ x: 350, y: 50 }}
          nodeSize={{ x: 140, y: 80 }}
          separation={{ siblings: 1, nonSiblings: 1.5 }}
          zoomable={true}
          zoom={0.7}
        />
      </div>
    </div>
  );
}
