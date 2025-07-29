import React, { useState, useEffect } from "react";

const COLORS = {
  base: "#1f4e79",
  merging: "#2f7a2f",
};

function MergeSortSimple({ arr }) {
  const [steps, setSteps] = useState([]); // 拆分+合并所有步骤序列
  const [currentStep, setCurrentStep] = useState(0); // 当前步骤索引
  const [mergeArray, setMergeArray] = useState([]); // 当前合并数组

  // 构建拆分树（简单文本展示）
  function buildSplitTree(array, depth = 0) {
    if (array.length <= 1) return [`${"  ".repeat(depth)}[${array.join(",")}]`];
    const mid = Math.floor(array.length / 2);
    return [
      `${"  ".repeat(depth)}[${array.join(",")}]`,
      ...buildSplitTree(array.slice(0, mid), depth + 1),
      ...buildSplitTree(array.slice(mid), depth + 1),
    ];
  }

  // 归并排序流程（收集合并步骤）
  function mergeSortSteps(array) {
    const result = [];
    function mergeSort(arr) {
      if (arr.length <= 1) return arr;
      const mid = Math.floor(arr.length / 2);
      const left = mergeSort(arr.slice(0, mid));
      const right = mergeSort(arr.slice(mid));
      // 记录合并过程
      let i = 0,
        j = 0,
        merged = [];
      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) merged.push(left[i++]);
        else merged.push(right[j++]);
        result.push([...merged, ...left.slice(i), ...right.slice(j)]); // 当前合并状态
      }
      // 追加剩余
      merged = [...merged, ...left.slice(i), ...right.slice(j)];
      result.push(merged);
      return merged;
    }
    mergeSort(array);
    return result;
  }

  useEffect(() => {
    setSteps(mergeSortSteps(arr));
  }, [arr]);

  // 动态步进
  useEffect(() => {
    if (steps.length === 0) return;
    if (currentStep >= steps.length) return;
    setMergeArray(steps[currentStep]);
    const timer = setTimeout(() => setCurrentStep(currentStep + 1), 800);
    return () => clearTimeout(timer);
  }, [currentStep, steps]);

  return (
    <div style={{ display: "flex", padding: 20, backgroundColor: "#fff" }}>
      <div style={{ flex: 1, fontFamily: "monospace", whiteSpace: "pre" }}>
        <h3>拆分树（文本展示）</h3>
        {buildSplitTree(arr).map((line, idx) => (
          <div key={idx} style={{ color: COLORS.base }}>
            {line}
          </div>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          marginLeft: 40,
          padding: 20,
          border: "2px solid #2f7a2f",
          borderRadius: 8,
          fontFamily: "monospace",
          fontSize: 24,
          color: "#2f7a2f",
          minHeight: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {mergeArray.map((num, i) => (
          <div
            key={i}
            style={{
              width: 40,
              height: 40,
              backgroundColor: COLORS.merging,
              color: "white",
              borderRadius: 6,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "none",
            }}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}

// 使用示例：
export default function App() {
  return <MergeSortSimple arr={[38, 27, 43, 3, 9, 82, 10]} />;
}
