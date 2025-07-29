"use client";

import React, { useState, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// 画布和节点样式参数
const nodeWidth = 80;
const nodeHeight = 40;
const verticalGap = 100;
const horizontalGap = 100;

// 用不同颜色区分拆分层级和合并层级
const splitColors = ["#007acc", "#28a745", "#ff9800", "#d32f2f", "#9c27b0"];
const mergeColor = "#d32f2f";

let globalId = 0;
const getId = () => `node_${globalId++}`;

// 递归构建拆分流程节点与边，返回完整拆分树
function buildSplitTree(arr, x = 600, y = 0, level = 0) {
  const nodeId = getId();
  const node = {
    id: nodeId,
    position: { x, y },
    data: { label: `[${arr.join(", ")}]` },
    style: {
      width: nodeWidth,
      height: nodeHeight,
      textAlign: "center",
      lineHeight: `${nodeHeight}px`,
      backgroundColor: splitColors[level % splitColors.length],
      color: "white",
      borderRadius: 6,
      fontWeight: "bold",
      userSelect: "none",
      border: "1px solid #333",
    },
    level,
    arr,
  };

  if (arr.length <= 1) {
    // 叶子节点，无子节点
    return {
      nodes: [node],
      edges: [],
      rootId: nodeId,
      splitSubtrees: [], // 方便后续合并过程追踪
    };
  }

  // 拆分左右子数组
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // 递归生成左子树和右子树
  const leftTree = buildSplitTree(left, x - horizontalGap / (level + 1), y + verticalGap, level + 1);
  const rightTree = buildSplitTree(right, x + horizontalGap / (level + 1), y + verticalGap, level + 1);

  // 连接边
  const edgeL = { id: `edge_${getId()}`, source: nodeId, target: leftTree.rootId };
  const edgeR = { id: `edge_${getId()}`, source: nodeId, target: rightTree.rootId };

  return {
    nodes: [node, ...leftTree.nodes, ...rightTree.nodes],
    edges: [edgeL, edgeR, ...leftTree.edges, ...rightTree.edges],
    rootId: nodeId,
    splitSubtrees: [...leftTree.splitSubtrees, ...rightTree.splitSubtrees, { nodeId, leftArr: left, rightArr: right }],
  };
}

// 合并两个有序数组的每一步详细状态，包含当前指针、已合并数组
function generateMergeSteps(leftArr, rightArr) {
  let i = 0, j = 0;
  const merged = [];
  const steps = [];

  while (i < leftArr.length || j < rightArr.length) {
    const leftVal = i < leftArr.length ? leftArr[i] : null;
    const rightVal = j < rightArr.length ? rightArr[j] : null;

    if (leftVal !== null && (rightVal === null || leftVal <= rightVal)) {
      merged.push(leftVal);
      steps.push({
        leftArr,
        rightArr,
        merged: [...merged],
        leftIndex: i,
        rightIndex: j,
        takenSide: "left",
      });
      i++;
    } else if (rightVal !== null) {
      merged.push(rightVal);
      steps.push({
        leftArr,
        rightArr,
        merged: [...merged],
        leftIndex: i,
        rightIndex: j,
        takenSide: "right",
      });
      j++;
    }
  }
  return steps;
}

export default function MergeSortFullVisualizer() {
  // 初始数组，可修改
  const inputArr = [5, 2, 9, 1];

  // 初始化id计数
  globalId = 0;

  // 拆分树和拆分步骤(拆分树里带了所有拆分节点和层次)
  const { nodes: splitNodes, edges: splitEdges, splitSubtrees } = buildSplitTree(inputArr);

  // 用于存储合并所有步骤的数组，按拆分顺序合并
  // 每个元素为合并过程的详细步骤数组
  const [allMergeSteps, setAllMergeSteps] = useState([]);

  // 当前整体步骤序号：先展示拆分节点，后展示合并步骤
  // 拆分阶段展示节点，合并阶段展示合并动画
  const [currentStep, setCurrentStep] = useState(0);

  // 合并阶段用的索引，定位当前在所有合并步骤的哪个阶段
  const [mergeIndex, setMergeIndex] = useState(0);

  // 合并阶段用的步骤序号，当前子合并步骤内部步数
  const [subStepIndex, setSubStepIndex] = useState(0);

  // 每个拆分的子问题，生成合并步骤（只做一次）
  useEffect(() => {
    // 所有拆分子问题的合并步骤集合
    const merges = splitSubtrees.map(({ leftArr, rightArr }) =>
      generateMergeSteps(leftArr, rightArr)
    );
    setAllMergeSteps(merges);
  }, []);

  // 控制下一步点击
  const onNextStep = () => {
    // 总拆分节点数
    const splitNodesCount = splitNodes.length;

    // 先展示所有拆分节点
    if (currentStep < splitNodesCount - 1) {
      setCurrentStep(currentStep + 1);
      return;
    }

    // 进入合并动画阶段
    // 当前子合并步骤总数
    if (allMergeSteps.length === 0) return; // 等待合并步骤生成

    const currentSubSteps = allMergeSteps[mergeIndex];

    if (subStepIndex < currentSubSteps.length - 1) {
      // 当前子合并步骤继续推进
      setSubStepIndex(subStepIndex + 1);
    } else {
      // 当前子合并步骤完成，切换到下一个子合并步骤
      if (mergeIndex < allMergeSteps.length - 1) {
        setMergeIndex(mergeIndex + 1);
        setSubStepIndex(0);
      } else {
        // 全部完成，不再前进
      }
    }
  };

  // 还原回初始状态
  const onReset = () => {
    setCurrentStep(0);
    setMergeIndex(0);
    setSubStepIndex(0);
  };

  // 当前拆分节点展示范围
  const visibleSplitNodes = splitNodes.slice(0, currentStep + 1);

  // 当前拆分边展示范围（保证两端节点都可见）
  const visibleSplitEdges = splitEdges.filter(
    (e) =>
      visibleSplitNodes.find((n) => n.id === e.source) &&
      visibleSplitNodes.find((n) => n.id === e.target)
  );

  // 合并动画相关数据
  const currentMergeSteps = allMergeSteps[mergeIndex] || [];
  const currentMergeStep = currentMergeSteps[subStepIndex] || null;

  // 用于动态展示合并阶段的节点
  // 左数组元素节点，已取出元素变灰，当前比较元素高亮
  const leftNodes =
    currentMergeStep?.leftArr.map((val, idx) => ({
      id: `left-${idx}`,
      position: { x: 100 + idx * (nodeWidth + 10), y: 400 },
      data: { label: String(val) },
      style: {
        width: nodeWidth,
        height: nodeHeight,
        textAlign: "center",
        lineHeight: `${nodeHeight}px`,
        borderRadius: 6,
        border: "1px solid #333",
        backgroundColor:
          idx === currentMergeStep.leftIndex
            ? "#007acc"
            : idx < currentMergeStep.leftIndex
            ? "#ccc"
            : "#28a745",
        color: idx === currentMergeStep.leftIndex ? "white" : "black",
        opacity: idx < currentMergeStep.leftIndex ? 0.3 : 1,
        fontWeight: "bold",
        userSelect: "none",
      },
    })) || [];

  // 右数组元素节点，已取出元素变灰，当前比较元素高亮
  const rightNodes =
    currentMergeStep?.rightArr.map((val, idx) => ({
      id: `right-${idx}`,
      position: { x: 100 + idx * (nodeWidth + 10), y: 460 },
      data: { label: String(val) },
      style: {
        width: nodeWidth,
        height: nodeHeight,
        textAlign: "center",
        lineHeight: `${nodeHeight}px`,
        borderRadius: 6,
        border: "1px solid #333",
        backgroundColor:
          idx === currentMergeStep.rightIndex
            ? "#007acc"
            : idx < currentMergeStep.rightIndex
            ? "#ccc"
            : "#28a745",
        color: idx === currentMergeStep.rightIndex ? "white" : "black",
        opacity: idx < currentMergeStep.rightIndex ? 0.3 : 1,
        fontWeight: "bold",
        userSelect: "none",
      },
    })) || [];

  // 合并数组结果节点，始终追加显示
  const mergedNodes =
    currentMergeStep?.merged.map((val, idx) => ({
      id: `merged-${idx}`,
      position: { x: 100 + idx * (nodeWidth + 10), y: 520 },
      data: { label: String(val) },
      style: {
        width: nodeWidth,
        height: nodeHeight,
        textAlign: "center",
        lineHeight: `${nodeHeight}px`,
        borderRadius: 6,
        border: "1px solid #333",
        backgroundColor: mergeColor,
        color: "white",
        fontWeight: "bold",
        userSelect: "none",
      },
    })) || [];

  // 最终展示节点 = 拆分阶段节点 + 合并阶段动态节点
  const nodesToRender =
    currentStep < splitNodes.length - 1
      ? visibleSplitNodes
      : [...visibleSplitNodes, ...leftNodes, ...rightNodes, ...mergedNodes];

  // 边只显示拆分边
  const edgesToRender = visibleSplitEdges;

  return (
    <div className="w-full h-[700px] bg-white border rounded relative">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodesToRender}
          edges={edgesToRender}
          fitView
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          zoomOnScroll={false}
          panOnDrag={true}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
        >
          <Background variant="dots" gap={16} size={1} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </ReactFlowProvider>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          onClick={onNextStep}
          disabled={
            currentStep >= splitNodes.length - 1 &&
            mergeIndex >= allMergeSteps.length - 1 &&
            subStepIndex >=
              (allMergeSteps[allMergeSteps.length - 1]?.length - 1 || 0)
          }
        >
          下一步
        </button>
        <button
          className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
          onClick={onReset}
        >
          还原
        </button>
      </div>

      <div className="absolute top-[380px] left-4 text-sm text-gray-600 font-mono">
        {currentStep < splitNodes.length - 1 ? (
          <div>阶段：拆分中，展示第 {currentStep + 1} 个拆分节点</div>
        ) : (
          <div>
            阶段：合并中，合并第 {mergeIndex + 1} 个子数组，第 {subStepIndex + 1} 步
          </div>
        )}
      </div>
    </div>
  );
}
