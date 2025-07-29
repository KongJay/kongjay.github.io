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

let id = 0;
const getId = () => `${id++}`;

// 使用不同颜色区分层级
const levelColors = ["#007acc", "#28a745", "#ff9800", "#d32f2f", "#9c27b0"];

const buildMergeSortTree = (arr, x = 400, y = 0, level = 0) => {
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
  };

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
  const fullTree = buildMergeSortTree(inputArray);

  const [step, setStep] = useState(0);

  const visibleNodes = fullTree.nodes.slice(0, step + 1);
  const visibleEdges = fullTree.edges.filter(
    (edge) =>
      visibleNodes.find((n) => n.id === edge.source) &&
      visibleNodes.find((n) => n.id === edge.target)
  );

  const handleReset = () => {
    setStep(0);
  };

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
            if (step < fullTree.nodes.length - 1) setStep((s) => s + 1);
          }}
        >
          下一步
        </button>
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          onClick={handleReset}
        >
          还原
        </button>
      </div>
    </div>
  );
};

export default MergeSortVisualizer;
