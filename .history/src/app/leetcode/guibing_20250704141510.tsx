"use client";

import React, { useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodeWidth = 40;
const nodeHeight = 40;

const arrToNodes = (arr, prefix, y, highlightedIndex = -1, takenIndices = []) =>
  arr.map((val, i) => ({
    id: `${prefix}-${i}`,
    position: { x: i * (nodeWidth + 10), y },
    data: { label: String(val) },
    style: {
      width: nodeWidth,
      height: nodeHeight,
      textAlign: "center",
      lineHeight: `${nodeHeight}px`,
      borderRadius: 4,
      border: "1px solid #333",
      backgroundColor:
        i === highlightedIndex
          ? "#007acc"
          : takenIndices.includes(i)
          ? "#ccc"
          : "#28a745",
      color: i === highlightedIndex ? "#fff" : "#000",
      opacity: takenIndices.includes(i) ? 0.3 : 1,
      fontWeight: "bold",
      userSelect: "none",
    },
  }));

const mergeNodes = (mergedArr) =>
  mergedArr.map((val, i) => ({
    id: `merged-${i}`,
    position: { x: i * (nodeWidth + 10), y: 220 },
    data: { label: String(val) },
    style: {
      width: nodeWidth,
      height: nodeHeight,
      textAlign: "center",
      lineHeight: `${nodeHeight}px`,
      borderRadius: 4,
      border: "1px solid #333",
      backgroundColor: "#d32f2f",
      color: "#fff",
      fontWeight: "bold",
      userSelect: "none",
    },
  }));

export default function MergeSortMergeStep() {
  // 两个有序数组，演示合并过程
  const leftArr = [2, 5, 9];
  const rightArr = [1, 3, 7];

  const [i, setI] = useState(0); // 左指针
  const [j, setJ] = useState(0); // 右指针
  const [merged, setMerged] = useState([]);

  // 被取走的索引集合
  const [leftTaken, setLeftTaken] = useState([]);
  const [rightTaken, setRightTaken] = useState([]);

  // 下一步合并逻辑
  const nextStep = () => {
    if (i >= leftArr.length && j >= rightArr.length) return; // 结束

    if (i < leftArr.length && (j >= rightArr.length || leftArr[i] <= rightArr[j])) {
      setMerged((m) => [...m, leftArr[i]]);
      setLeftTaken((t) => [...t, i]);
      setI((x) => x + 1);
    } else if (j < rightArr.length) {
      setMerged((m) => [...m, rightArr[j]]);
      setRightTaken((t) => [...t, j]);
      setJ((x) => x + 1);
    }
  };

  const reset = () => {
    setI(0);
    setJ(0);
    setMerged([]);
    setLeftTaken([]);
    setRightTaken([]);
  };

  // 构造节点
  const nodes = [
    ...arrToNodes(leftArr, "left", 20, i < leftArr.length ? i : -1, leftTaken),
    ...arrToNodes(rightArr, "right", 110, j < rightArr.length ? j : -1, rightTaken),
    ...mergeNodes(merged),
  ];

  return (
    <div className="w-full h-[300px] bg-white border rounded p-4">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={[]}
          fitView
          proOptions={{ hideAttribution: true }}
          zoomOnScroll={false}
          panOnDrag={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          nodesDraggable={false}
          nodesConnectable={false}
        >
          <Background variant="dots" gap={16} size={1} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </ReactFlowProvider>

      <div className="mt-4 flex justify-center gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={nextStep}
          disabled={i >= leftArr.length && j >= rightArr.length}
        >
          下一步合并
        </button>
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          onClick={reset}
        >
          还原
        </button>
      </div>

      <div className="mt-6 text-center text-gray-700">
        <p>蓝色高亮表示当前比较的元素，灰色表示已被取出。</p>
      </div>
    </div>
  );
}
