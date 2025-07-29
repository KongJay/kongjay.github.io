"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const boxSize = 60;

// 辅助函数，生成合并步骤
function generateMergeSteps(leftArr: number[], rightArr: number[]) {
  let i = 0,
    j = 0;
  const merged: number[] = [];
  const steps: {
    leftArr: number[];
    rightArr: number[];
    merged: number[];
    leftIndex: number;
    rightIndex: number;
    takenSide: "left" | "right";
  }[] = [];

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

export default function MergeAnimation() {
  // 测试用的两个有序子数组
  const leftArr = [1, 5, 9];
  const rightArr = [2, 4, 6, 10];

  // 生成完整的合并步骤序列
  const mergeSteps = generateMergeSteps(leftArr, rightArr);

  // 当前步骤索引，初始为0
  const [stepIndex, setStepIndex] = useState(0);

  // 当前步骤数据
  const currentStep = mergeSteps[stepIndex];

  // 下一步事件
  const onNext = () => {
    if (stepIndex < mergeSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  // 重置
  const onReset = () => {
    setStepIndex(0);
  };

  return (
    <div
      style={{
        padding: 24,
        backgroundColor: "#f7f7f7",
        minHeight: 300,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 16 }}>归并排序 - 合并过程动态演示</h2>

      {/* 左侧数组区域 */}
      <div style={{ marginBottom: 40 }}>
        <div>左子数组</div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          {currentStep.leftArr.map((val, idx) => {
            // 判断当前元素状态：
            // - 如果已被取走，则透明
            // - 当前比较元素高亮蓝色
            const isTaken = idx < currentStep.leftIndex;
            const isCurrent = idx === currentStep.leftIndex;

            return (
              <motion.div
                key={"left-" + idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: isTaken ? 0.3 : 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: boxSize,
                  height: boxSize,
                  backgroundColor: isCurrent ? "#3b82f6" : "#10b981",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  fontWeight: "bold",
                  userSelect: "none",
                }}
              >
                {val}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 右侧数组区域 */}
      <div style={{ marginBottom: 40 }}>
        <div>右子数组</div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          {currentStep.rightArr.map((val, idx) => {
            const isTaken = idx < currentStep.rightIndex;
            const isCurrent = idx === currentStep.rightIndex;

            return (
              <motion.div
                key={"right-" + idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: isTaken ? 0.3 : 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: boxSize,
                  height: boxSize,
                  backgroundColor: isCurrent ? "#3b82f6" : "#10b981",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  fontWeight: "bold",
                  userSelect: "none",
                }}
              >
                {val}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 合并数组区域 */}
      <div>
        <div>合并结果</div>
        <div style={{ display: "flex", gap: 12, marginTop: 8, minHeight: boxSize }}>
          <AnimatePresence>
            {currentStep.merged.map((val, idx) => (
              <motion.div
                key={"merged-" + idx}
                initial={{ scale: 0, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  width: boxSize,
                  height: boxSize,
                  backgroundColor: "#ef4444",
                  color: "white",
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  userSelect: "none",
                }}
              >
                {val}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 操作按钮 */}
      <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
        <button
          onClick={onNext}
          disabled={stepIndex >= mergeSteps.length - 1}
          style={{
            padding: "10px 20px",
            fontSize: 16,
            borderRadius: 6,
            border: "none",
            cursor: stepIndex >= mergeSteps.length - 1 ? "not-allowed" : "pointer",
            backgroundColor: stepIndex >= mergeSteps.length - 1 ? "#9ca3af" : "#3b82f6",
            color: "white",
            fontWeight: "bold",
          }}
        >
          下一步
        </button>
        <button
          onClick={onReset}
          style={{
            padding: "10px 20px",
            fontSize: 16,
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            backgroundColor: "#6b7280",
            color: "white",
            fontWeight: "bold",
          }}
        >
          重置
        </button>
      </div>
    </div>
  );
}
