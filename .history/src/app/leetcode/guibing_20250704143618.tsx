import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const duration = 800; // 动画时长ms

function MergeSortAnimation({ array }) {
  const [leftArr, setLeftArr] = useState([]);
  const [rightArr, setRightArr] = useState([]);
  const [mergedArr, setMergedArr] = useState([]);
  const [displayArr, setDisplayArr] = useState(array);

  useEffect(() => {
    // 假设只演示合并两个已排序数组的过程
    setLeftArr([1, 4, 6]);
    setRightArr([2, 3, 5]);
    setMergedArr([]);
    setDisplayArr([]);
    mergeTwoSortedArrays([1,4,6], [2,3,5]);
  }, []);

  const mergeTwoSortedArrays = async (left, right) => {
    let l = [...left];
    let r = [...right];
    let merged = [];

    while (l.length > 0 && r.length > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));

      if (l[0] <= r[0]) {
        // 取左边第一个元素放入合并区
        setLeftArr(prev => prev.slice(1)); // 左边数组去掉第一个
        merged.push(l[0]);
        setMergedArr([...merged]);
        l.shift();
      } else {
        // 取右边第一个元素放入合并区
        setRightArr(prev => prev.slice(1)); // 右边数组去掉第一个
        merged.push(r[0]);
        setMergedArr([...merged]);
        r.shift();
      }
    }

    // 处理剩余
    await new Promise(resolve => setTimeout(resolve, duration));
    setLeftArr([]);
    setRightArr([]);
    setMergedArr([...merged, ...l, ...r]);
  };

  return (
    <div style={{display:"flex", gap:"40px", padding:"20px"}}>
      <div>
        <h3>Left</h3>
        <div style={{display:"flex", gap:"10px"}}>
          <AnimatePresence>
            {leftArr.map((num) => (
              <motion.div
                key={`left-${num}`}
                layout
                initial={{opacity:0, y: -20}}
                animate={{opacity:1, y:0}}
                exit={{opacity:0, y: 20}}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "lightblue",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                {num}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <h3>Right</h3>
        <div style={{display:"flex", gap:"10px"}}>
          <AnimatePresence>
            {rightArr.map((num) => (
              <motion.div
                key={`right-${num}`}
                layout
                initial={{opacity:0, y: -20}}
                animate={{opacity:1, y:0}}
                exit={{opacity:0, y: 20}}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "lightcoral",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                {num}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <h3>Merged</h3>
        <div style={{display:"flex", gap:"10px"}}>
          {mergedArr.map((num, i) => (
            <motion.div
              key={`merged-${num}-${i}`}
              layout
              initial={{opacity:0, scale:0.8}}
              animate={{opacity:1, scale:1}}
              style={{
                width: 40,
                height: 40,
                backgroundColor: "lightgreen",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              {num}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MergeSortAnimation;
