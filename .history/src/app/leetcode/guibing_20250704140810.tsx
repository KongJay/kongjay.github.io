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

// 用于生成唯一 ID
let id = 0;
const getId = () => `${id++}`;

// 递归生成归并拆分节点树
const buildMergeSortTree = (arr, x = 400, y = 0, level = 0) => {
  const nodeId = getId();
  const node = {
    id: nodeId,
    position: { x, y },
    data: { label: JSON.stringify(arr) },
    style: { width: 80, padding: 8, textAlign: "center" },
  };

  // base case: 一个元素，无需拆分
  if (arr.length <= 1) {
    return { nodes: [node], edges: [] };
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const leftTree = buildMergeSortTree(left, x - 150 / (level + 1), y + 100, level + 1);
  const rightTree = buildMergeSortTree(right, x + 150 / (level + 1), y + 100, level + 1);

  const edgeL = { id: `${getId()}-l`, source: nodeId, target: leftTree.nodes[0].id };
  const edgeR = { id: `${getId()}-r`, source: nodeId, target: rightTree.nodes[0].id };

  return {
    nodes: [node, ...leftTree.nodes, ...rightTree.nodes],
    edges: [edgeL, edgeR, ...leftTree.edges, ...rightTree.edges],
  };
};

const MergeSortVisualizer = () => {
  const inputArray = [5, 2, 9, 1];
  const [step, setStep] = useState(0);
  const { nodes, edges } = buildMergeSortTree(inputArray);

  const visibleNodes = nodes.slice(0, step + 1);
  const visibleEdges = edges.filter(
    (edge) =>
      visibleNodes.find((n) => n.id === edge.source) &&
      visibleNodes.find((n) => n.id === edge.target)
  );

  return (
    <div className="w-full h-[600px]">
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
      <div className="mt-4 text-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            if (step < nodes.length - 1) setStep((s) => s + 1);
          }}
        >
          下一步
        </button>
      </div>
    </div>
  );
};

export default MergeSortVisualizer;
