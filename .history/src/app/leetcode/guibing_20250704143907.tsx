import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = {
  left: "#1f4e79",
  right: "#9c2a2a",
  merged: "#2f7a2f",
};

const STEP_DELAY = 1000;

function MergeSortVisualizer({ initialArray }) {
  const [tree, setTree] = useState(null);

  // 生成唯一id
  let idCounter = 0;
  function nextId() {
    return `node-${idCounter++}`;
  }

  // 构造树结构
  function buildTree(arr) {
    const node = {
      id: nextId(),
      array: arr,
      left: null,
      right: null,
      mergedArray: [],
      status: "splitting", // splitting | merging | done
    };
    if (arr.length <= 1) {
      node.status = "done";
      node.mergedArray = arr;
    } else {
      const mid = Math.floor(arr.length / 2);
      node.left = buildTree(arr.slice(0, mid));
      node.right = buildTree(arr.slice(mid));
    }
    return node;
  }

  // 延迟辅助
  function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  // 动画主流程：递归拆分并合并
  async function animateTree(node) {
    if (!node || node.status === "done") return;

    if (node.left) await animateTree(node.left);
    if (node.right) await animateTree(node.right);

    await animateMerge(node);
  }

  // 合并两个子数组并动态更新状态
  async function animateMerge(node) {
    // 状态改为 merging
    node.status = "merging";
    setTree((prev) => ({ ...prev }));

    // 拷贝子数组当前合并结果
    let leftArr = [...(node.left?.mergedArray ?? [])];
    let rightArr = [...(node.right?.mergedArray ?? [])];
    const merged = [];

    while (leftArr.length && rightArr.length) {
      await delay(STEP_DELAY);

      if (leftArr[0] <= rightArr[0]) {
        merged.push(leftArr[0]);
        leftArr.shift();
      } else {
        merged.push(rightArr[0]);
        rightArr.shift();
      }

      node.mergedArray = [...merged];
      node.left.mergedArray = [...leftArr];
      node.right.mergedArray = [...rightArr];

      setTree((prev) => ({ ...prev }));
    }

    // 剩余全部合并
    await delay(STEP_DELAY);
    merged.push(...leftArr, ...rightArr);
    node.mergedArray = merged;
    node.left.mergedArray = [];
    node.right.mergedArray = [];

    node.status = "done";
    setTree((prev) => ({ ...prev }));
  }

  // 初始化
  useEffect(() => {
    idCounter = 0; // 重置id计数
    const root = buildTree(initialArray);
    setTree(root);
    animateTree(root);
  }, [initialArray]);

  // 渲染数字方块
  function renderArray(arr, color, nodeId) {
    const boxStyle = {
      borderRadius: 6,
      minWidth: 32,
      minHeight: 32,
      lineHeight: "32px",
      color: "white",
      fontWeight: "bold",
      fontSize: 14,
      textAlign: "center",
      userSelect: "none",
      cursor: "default",
      backgroundColor: color,
      marginRight: 6,
    };
    return (
      <div style={{ display: "flex", marginTop: 4 }}>
        <AnimatePresence>
          {arr.map((num, i) => (
            <motion.div
              key={`${nodeId}-${num}-${i}`}
              layout
              initial={{ opacity: 0, scale: 0.6, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              transition={{ duration: 0.4 }}
              style={boxStyle}
            >
              {num}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  // 递归渲染树节点
  function renderNode(node, depth = 0) {
    if (!node) return null;

    const isLeaf = node.array.length <= 1;

    const boxStyle = {
      borderRadius: 6,
      minWidth: 50,
      minHeight: 40,
      margin: "8px 0",
      padding: 8,
      color: "white",
      fontWeight: "bold",
      fontSize: 14,
      textAlign: "center",
      userSelect: "none",
      cursor: "default",
      backgroundColor:
        node.status === "done"
          ? "#222"
          : node.status === "merging"
          ? COLORS.merged
          : "#444",
      width: Math.max(node.array.length * 38, 50),
      marginLeft: depth * 40,
    };

    const rowStyle = {
      display: "flex",
      gap: 12,
      justifyContent: "center",
      marginTop: 10,
      alignItems: "flex-start",
    };

    return (
      <div key={node.id} style={{ marginBottom: 30 }}>
        <div style={boxStyle} title={`原数组: [${node.array.join(", ")}]`}>
          [{node.array.join(", ")}]
        </div>

        {isLeaf && renderArray(node.mergedArray, COLORS.merged, node.id)}

        {!isLeaf && (
          <div style={rowStyle}>
            <div>
              <div style={{ color: COLORS.left, fontWeight: "bold" }}>Left</div>
              {renderArray(
                node.left?.mergedArray.length
                  ? node.left.mergedArray
                  : node.left.array,
                COLORS.left,
                node.left?.id
              )}
            </div>
            <div>
              <div style={{ color: COLORS.right, fontWeight: "bold" }}>
                Right
              </div>
              {renderArray(
                node.right?.mergedArray.length
                  ? node.right.mergedArray
                  : node.right.array,
                COLORS.right,
                node.right?.id
              )}
            </div>
            <div>
              <div style={{ color: COLORS.merged, fontWeight: "bold" }}>
                Merged
              </div>
              {renderArray(node.mergedArray, COLORS.merged, node.id)}
            </div>
          </div>
        )}

        {!isLeaf && (
          <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
            {renderNode(node.left, depth + 1)}
            {renderNode(node.right, depth + 1)}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>
        归并排序可视化动画演示
      </h2>
      {tree ? renderNode(tree) : <p>Loading...</p>}
    </div>
  );
}

export default function App() {
  return <MergeSortVisualizer initialArray={[38, 27, 43, 3, 9, 82, 10]} />;
}
