import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 配色：深色调适合白色背景
const COLORS = {
  left: "#1f4e79",   // 深蓝
  right: "#9c2a2a",  // 深红
  merged: "#2f7a2f", // 深绿
};

// 等待时间（毫秒）
const STEP_DELAY = 1000;

function MergeSortVisualizer({ initialArray }) {
  // 结构: 递归拆分用树形结构存储
  // 每个节点: { id, array, left, right, mergedArray, status }
  // status: "splitting" | "merging" | "done"
  const [tree, setTree] = useState(null);

  // 每次动画步骤推进时调用，用于触发更新
  const [stepTrigger, setStepTrigger] = useState(0);

  useEffect(() => {
    // 初始化树结构
    const root = buildTree(initialArray);
    setTree(root);

    // 启动递归动画
    animateTree(root);
  }, [initialArray]);

  // 生成唯一 id
  let idCounter = 0;
  function nextId() {
    return `node-${idCounter++}`;
  }

  // 递归构造拆分树
  function buildTree(arr) {
    const node = {
      id: nextId(),
      array: arr,
      left: null,
      right: null,
      mergedArray: [],
      status: "splitting",
    };
    if (arr.length <= 1) {
      node.status = "done"; // 叶子节点，无需拆分
      node.mergedArray = arr;
    } else {
      const mid = Math.floor(arr.length / 2);
      node.left = buildTree(arr.slice(0, mid));
      node.right = buildTree(arr.slice(mid));
    }
    return node;
  }

  // 动画递归，拆分+合并
  async function animateTree(node) {
    if (!node || node.status === "done") return;

    // 递归先拆分左右
    if (node.left) await animateTree(node.left);
    if (node.right) await animateTree(node.right);

    // 合并动画
    await animateMerge(node);
  }

  // 合并左右两个已排序子数组，动态更新节点状态和数据
  async function animateMerge(node) {
    node.status = "merging";
    setTree({ ...tree }); // 触发更新

    let leftArr = [...(node.left?.mergedArray || [])];
    let rightArr = [...(node.right?.mergedArray || [])];
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
      // 展示当前左、右剩余数组和合并中数组
      node.left.mergedArray = [...leftArr];
      node.right.mergedArray = [...rightArr];
      setTree({ ...tree }); // 更新
    }

    // 加入剩余部分
    await delay(STEP_DELAY);
    merged.push(...leftArr, ...rightArr);
    node.mergedArray = merged;
    node.left.mergedArray = [];
    node.right.mergedArray = [];
    node.status = "done";
    setTree({ ...tree });
  }

  // 简单延时函数
  function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  // 渲染树状结构节点（递归）
  function renderNode(node, depth = 0) {
    if (!node) return null;

    const isLeaf = node.array.length <= 1;
    const boxStyle = {
      borderRadius: 6,
      minWidth: 50,
      minHeight: 40,
      margin: 4,
      padding: 8,
      color: "white",
      fontWeight: "bold",
      fontSize: 14,
      textAlign: "center",
      userSelect: "none",
      cursor: "default",
    };

    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 20,
    };

    const rowStyle = {
      display: "flex",
      gap: 8,
      justifyContent: "center",
      marginTop: 6,
    };

    // 根据状态决定颜色
    const getColor = () => {
      if (node.status === "splitting") return "#444"; // 拆分时暗灰
      if (node.status === "merging") return COLORS.merged;
      if (node.status === "done") return "#222"; // 结束变更暗色
      return "#666";
    };

    // 渲染数组中数字块
    const renderArray = (arr, color) => (
      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
        <AnimatePresence>
          {arr.map((num, i) => (
            <motion.div
              key={`${node.id}-${num}-${i}`}
              layout
              initial={{ opacity: 0, scale: 0.6, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              transition={{ duration: 0.4 }}
              style={{
                ...boxStyle,
                backgroundColor: color,
                width: 32,
                height: 32,
                lineHeight: "32px",
              }}
            >
              {num}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );

    return (
      <div key={node.id} style={{ ...containerStyle, marginLeft: depth * 40 }}>
        <div
          style={{
            ...boxStyle,
            backgroundColor: getColor(),
            width: Math.max(node.array.length * 38, 50),
          }}
          title={`原数组: [${node.array.join(", ")}]`}
        >
          [{node.array.join(", ")}]
        </div>

        {/* 如果是叶子节点，展示最终数组 */}
        {isLeaf && renderArray(node.mergedArray, COLORS.merged)}

        {/* 非叶子显示拆分的左右 */}
        {!isLeaf && (
          <div style={rowStyle}>
            <div>
              <div style={{ color: COLORS.left, fontWeight: "bold" }}>Left</div>
              {renderArray(node.left?.mergedArray || node.left.array, COLORS.left)}
            </div>
            <div>
              <div style={{ color: COLORS.right, fontWeight: "bold" }}>Right</div>
              {renderArray(node.right?.mergedArray || node.right.array, COLORS.right)}
            </div>
            <div>
              <div style={{ color: COLORS.merged, fontWeight: "bold" }}>
                Merged
              </div>
              {renderArray(node.mergedArray, COLORS.merged)}
            </div>
          </div>
        )}

        {/* 递归渲染左右子树 */}
        {!isLeaf && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 12, gap: 20 }}>
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
