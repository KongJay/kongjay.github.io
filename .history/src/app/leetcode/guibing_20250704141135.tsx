"use client";

import React, { useState, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

let id = 0;
const getId = () => `${id++}`;

const levelColors = ["#007acc", "#28a745", "#ff9800", "#d32f2f", "#9c27b0"];

function buildSplitTree(arr, x = 400, y = 0, level = 0) {
  const nodeId = getId();
  const color = levelColors[level % levelColors.length];
  const node = {
    id: nodeId,
    position: { x, y },
    data: { label: JSON.stringify(arr) },
    style: {
      width: 80,
      padding: 8,
      textAlign: "center",
      backgroundColor: color,
      color: "#fff",
      borderRadius: 6,
      border: "1px solid #333",
      fontSize: 12,
    },
    level,
  };

  if (arr.length <= 1) {
    return { nodes: [node], edges: [], rootId: nodeId };
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const leftTree = buildSplitTree(left, x - 150 / (level + 1), y + 100, level + 1);
  const rightTree = buildSplitTree(right, x + 150 / (level + 1), y + 100, level + 1);

  const edgeL = { id: `${getId()}-l`, source: nodeId, target: leftTree.rootId };
  const edgeR = { id: `${getId()}-r`, source: nodeId, target: rightTree.rootId };

  return {
    nodes: [node, ...leftTree.nodes, ...rightTree.nodes],
    edges: [edgeL, edgeR, ...leftTree.edges, ...rightTree.edges],
    rootId: nodeId,
  };
}

// 合并两数组的步骤收集器
function mergeSteps(leftArr, rightArr, baseX, baseY, level) {
  let i = 0,
    j = 0;
  let merged = [];
  const steps = [];
  while (i < leftArr.length || j < rightArr.length) {
    let stepArr = [...merged];
    if (i < leftArr.length && (j >= rightArr.length || leftArr[i] <= rightArr[j])) {
      merged.push(leftArr[i]);
      i++;
    } else if (j < rightArr.length) {
      merged.push(rightArr[j]);
      j++;
    }
    steps.push({
      label: JSON.stringify(merged),
      x: baseX,
      y: baseY,
      color: "#4caf50", // 合并节点颜色绿
      level,
      mergedArr: [...merged],
    });
  }
  return steps;
}

export default function MergeSortFullVisualizer() {
  const inputArray = [5, 2, 9, 1];

  // 重置id计数器
  id = 0;

  // 拆分树
  const { nodes: splitNodes, edges: splitEdges, rootId } = buildSplitTree(inputArray);

  // 用于记录合并步骤的节点和边
  const [mergeNodes, setMergeNodes] = React.useState([]);
  const [mergeEdges, setMergeEdges] = React.useState([]);

  // 当前显示步骤，先拆分，后合并
  const [step, setStep] = useState(0);

  // 记录所有步骤分段
  const totalSplitSteps = splitNodes.length; // 拆分节点数
  const totalMergeSteps = 10; // 预估合并步骤数，后面动态扩展更好

  // 模拟递归合并，生成合并步骤节点
  // 简单示范，实际合并的步骤你可以用递归记录所有中间合并过程
  React.useEffect(() => {
    // 这里演示如何生成合并步骤节点，仅示意合并过程
    const mid = Math.floor(inputArray.length / 2);
    const left = inputArray.slice(0, mid);
    const right = inputArray.slice(mid);

    // 合并过程节点位置
    const baseX = 400;
    const baseY = 350;

    const steps = mergeSteps(left, right, baseX, baseY, 0);

    // 转为节点形式
    const nodes = steps.map((s, idx) => ({
      id: `merge-${idx}`,
      position: { x: s.x + idx * 100, y: s.y },
      data: { label: s.label },
      style: {
        width: 80,
        padding: 8,
        textAlign: "center",
        backgroundColor: s.color,
        color: "#fff",
        borderRadius: 6,
        border: "1px solid #333",
        fontSize: 12,
      },
    }));
    setMergeNodes(nodes);
    // 简单连线（示意）
    setMergeEdges(
      nodes.slice(0, -1).map((n, i) => ({
        id: `merge-edge-${i}`,
        source: n.id,
        target: nodes[i + 1].id,
      }))
    );
  }, []);

  // 组合要显示的节点与边
  const visibleNodes = step < totalSplitSteps
    ? splitNodes.slice(0, step + 1)
    : [
        ...splitNodes,
        ...mergeNodes.slice(0, step - totalSplitSteps + 1),
      ];

  const visibleEdges = step < totalSplitSteps
    ? splitEdges.filter(
        (e) =>
          visibleNodes.find((n) => n.id === e.source) &&
          visibleNodes.find((n) => n.id === e.target)
      )
    : [
        ...splitEdges,
        ...mergeEdges.slice(0, step - totalSplitSteps),
      ];

  return (
    <div className="w-full h-[600px] bg-white border rounded">
      <ReactFlowProvider>
        <ReactFlow
          nodes={visibleNodes}
          edges={visibleEdges}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background variant="dots" gap={16} size={1} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </ReactFlowProvider>
      <div className="mt-4 flex justify-center gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            if (step < totalSplitSteps + mergeNodes.length - 1) setStep(s => s + 1);
          }}
        >
          下一步
        </button>
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          onClick={() => setStep(0)}
        >
          还原
        </button>
      </div>
    </div>
  );
}
