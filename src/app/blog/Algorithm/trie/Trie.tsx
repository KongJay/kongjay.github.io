"use client";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { CodeBlock } from "@/components/ui/code-block";
type Props = {
  renderTitle?: (title: string) => React.ReactNode;
};
export default function Trie({ renderTitle }: Props) {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {trieContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            {item.title && renderTitle ? (
  renderTitle(item.title)
) : item.title ? (
  <p className="text-xl mb-4 font-bold">{item.title}</p>
) : null}


            <div className="text-sm  prose prose-sm dark:prose-invert">
          
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

export const trieContent = [
    {
      category: 'algorithm',
      slug: 'trie',
      title: "前缀树（Trie）",
    },
  
    // 前言部分：引入Trie的重要性和应用场景
    {
      badge: '前言',
      description: (
        <>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;在现代字符串处理与目标搜索的场景中，前缀树（Trie）是一种极为核心且高效的数据结构，它能大幅提升字符串的存储与查询性能。Trie 以其结构化和共享前缀的特性，广泛应用于搜索引擎自动补全、词频统计、敏感词检测、拼音转换、自然语言处理等诸多领域。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;与传统的哈希表相比，Trie 不依赖于哈希函数，且在处理以某个前缀开头的多重字符串批量检索时，显示出天然优势。通过将多个字符串“共享前缀”节点的方式，Trie 通常在处理海量词库、实时匹配、动态更新场景中表现卓越。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;在本篇文章中，我们将从 Trie 的基础结构出发，逐步剖析它的存储原理、构建流程、核心操作（包括插入、查询、删除），并配合示意图和 Java 实现代码，帮助你深入理解这一强大而优雅的字符串检索工具。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;无论你是算法爱好者还是实战开发者，希望本指南能够帮你打破对字符串匹配的低效瓶颈，真正掌握前缀树的核心思想与实用技巧。
          </p>
        </>
      ),
    },
  
    // 结构扩展：pass 和 end 作用引入
    {
      badge: '结构扩展：pass 与 end 的引入',
      description: (
        <>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;标准的 Trie 结构通常只存储每个字符的子节点引用，用于构建基本路径。但如果希望实现更丰富的功能，例如：统计某个字符串出现次数、判断是否存在以某前缀开头的字符串、支持字符串删除等，就需要在每个节点增加额外的信息。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;因此，我们在每个节点上引入两个重要的整型字段：<code>pass</code> 和 <code>end</code>。
          </p>
          <ul className="list-disc list-inside ml-6 mt-2 mb-4">
            <li>
              <strong>pass：</strong>表示经过此节点的字符串个数，帮助快速统计以某节点为前缀的所有字符串数量。
            </li>
            <li>
              <strong>end：</strong>表示以此节点作为终点的字符串数量，即完整字符串的出现次数。
            </li>
          </ul>
          <h3 className="font-semibold text-lg mt-4 mb-2">🔍 可视化示例：</h3>
          <p>
            假设插入“apple”、“app” 和 “april”三个单词，路径在 Trie 中部分重合。每当插入一个新单词，在路径上的每个节点的 <code>pass</code> 增加 1，路径末端的 <code>end</code> 增加 1。这种设计可以非常方便地实现：
          </p>
          <div className="p-4 rounded-lg bg-gray-50 shadow-sm border border-gray-200 mb-4">
            <strong>示例：</strong><br />
            插入 "apple"：节点 'a'→'p'→'p'→'l'→'e' 的 <code>pass</code> 值都加 1，'e' 的 <code>end</code> 加 1<br />
            插入 "app"：节点 'a'→'p'→'p' 的 <code>pass</code> 递增，'p' 的 <code>end</code> 增加 1<br />
            插入 "april"：节点 'a'→'p'→'r'→'i'→'l' 的 <code>pass</code> 递增，'l' 的 <code>end</code> 增加 1
          </div>
          <h3 className="font-semibold text-lg mt-4 mb-2">💡 实用场景与优势：</h3>
          <ul className="list-disc list-inside ml-6">
            <li>📌 快速判断某个字符串是否存在：只需判断路径终点 <code>end &gt; 0</code></li>
            <li>📌 统计某个字符串出现次数：直接返回节点的 <code>end</code></li>
            <li>📌 统计以某前缀开头的所有字符串个数：查询路径终点 <code>pass</code></li>
            <li>📌 删除字符串：沿路径倒序回退，<code>pass--</code> ，必要时删除节点</li>
          </ul>
          <p className="mt-4">
            &nbsp;&nbsp;&nbsp;&nbsp;引入 <code>pass</code> 和 <code>end</code> 后，Trie 不再仅仅是一棵存储路径的树，更变身为支持统计、删除和动态更新的“字符串数据库”，大大提升实际应用中的灵活性与效率。
          </p>
        </>
      )
    },
  
    // 与哈希表的对比
    {
      badge: '与哈希表的对比',
      description: (
        <>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;许多人第一想到用哈希表（HashMap）存储字符串，声称可以在常数时间内完成插入与查找。然而，基于字符串的哈希操作在实际中存在一些不可忽视的缺陷。
          </p>
          <h3 className="font-semibold text-lg mt-4 mb-2">📌 哈希表的局限性：</h3>
          <ul className="list-disc list-inside ml-6">
            <li>哈希函数需要遍历字符串每个字符，时间复杂度为 <code>O(L)</code></li>
            <li>哈希冲突需要链表或树结构解决，可能降低性能</li>
            <li>不支持前缀相关查询（比如统计以“pre”开头的字符串数）</li>
          </ul>
          <p className="mt-3">
            &nbsp;&nbsp;&nbsp;&nbsp;因此，在需求中需要“多级前缀匹配、频次统计”等高效操作时，哈希表表现得较为局促。
          </p>
          <h3 className="font-semibold text-lg mt-4 mb-2">🌲 前缀树的优势：</h3>
          <ul className="list-disc list-inside ml-6">
            <li>天生支持前缀匹配，路径遍历只需 O(L)</li>
            <li>能够统计字符串出现次数和前缀出现次数</li>
            <li>无需考虑哈希冲突，结构化存储，查找稳定可靠</li>
          </ul>
          <h3 className="font-semibold text-lg mt-4 mb-2">✅ Java 示例：前缀统计实现</h3>
          <pre className="bg-black text-white rounded-md p-4 text-sm overflow-x-auto">
  {`// Trie节点定义
  class TrieNode {
      public int pass;
      public int end;
      public TrieNode[] next;
      public TrieNode() {
          pass = 0;
          end = 0;
          next = new TrieNode[26]; // 小写字母
      }
  }
  
  // Trie 类
  class Trie {
      private TrieNode root = new TrieNode();
      // 插入
      public void insert(String word) {
          TrieNode node = root;
          for (char ch : word.toCharArray()) {
              int path = ch - 'a';
              if (node.next[path] == null) {
                  node.next[path] = new TrieNode();
              }
              node = node.next[path];
              node.pass++;
          }
          node.end++;
      }
      // 查询是否存在
      public int search(String word) {
          TrieNode node = root;
          for (char ch : word.toCharArray()) {
              int path = ch - 'a';
              if (node.next[path] == null) return 0;
              node = node.next[path];
          }
          return node.end;
      }
      // 统计以 prefix 开头的字符串数
      public int prefixCount(String prefix) {
          TrieNode node = root;
          for (char ch : prefix.toCharArray()) {
              int path = ch - 'a';
              if (node.next[path] == null) return 0;
              node = node.next[path];
          }
          return node.pass;
      }
  }`}
          </pre>
          <h3 className="font-semibold text-lg mt-4 mb-2">🧪 实战示例：</h3>
          <pre className="bg-gray-100 rounded-md p-4 text-sm overflow-x-auto">
  {`Trie trie = new Trie();
  trie.insert("apple");
  trie.insert("app");
  trie.insert("apple");
  System.out.println(trie.search("apple"));   // 2
  System.out.println(trie.search("app"));     // 1
  System.out.println(trie.prefixCount("app")); // 3`}
          </pre>
          <p className="mt-4">
            &nbsp;&nbsp;&nbsp;&nbsp;可以看到，Trie 不仅能快速判断一个字符串是否存在，还能统计出现次数，以及频繁查询以某个前缀开头的字符串数量。这些功能在哈希表中是难以直接实现的，大大扩展了字符串数据结构的应用场景。
          </p>
          <p className="mt-2">
            &nbsp;&nbsp;&nbsp;&nbsp;因此，在需要高效前缀查询、大规模字符串统计的实际场景中，Trie 是比哈希表更具优势的选择。
          </p>
        </>
      )
    },
  
    // 不基于比较的排序方法：桶排序与基数排序
    {
      badge: '不基于比较的排序：桶排序 & 基数排序',
      description: (
        <>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;除传统的比较排序（快速、归并等）外，针对特定数据范围或特定位数的场景，还存在“不基于比较”的线性时间排序算法，例如：<strong>桶排序（Bucket Sort）</strong> 和 <strong>基数排序（Radix Sort）</strong>。
          </p>
          <h3 className="font-semibold text-lg mt-4 mb-2">🎯 桶排序（Bucket Sort）应用场景示例：</h3>
          <p>
            假设你有一组员工年龄，范围都在 0~200 岁之间，如何高效排序？只需构建一个大小为 201 的数组（每个元素代表对应年龄的出现次数），扫描后即完成排序。这种算法的核心思想是“计数”，时间复杂度 O(N + K)，空间复杂度也更优。
          </p>
          <pre className="bg-gray-100 rounded-md p-4 text-sm overflow-x-auto">
  {`int[] help = new int[201]; // 索引代表年龄
  for (int age : ages) {
      help[age]++;
  }
  int index = 0;
  for (int i = 0; i < help.length; i++) {
      while (help[i]-- > 0) {
          ages[index++] = i;
      }
  }`}
          </pre>
          <h3 className="font-semibold text-lg mt-4 mb-2">🌟 基数排序（Radix Sort）优势：</h3>
          <p>
            当数据是多位数（如身份证、工资、手机号）时，可以从最低数位开始，依次使用稳定的计数排序进行排序。多轮排序后，即实现了线性时间排序。尤其是在范围较大、有限位数的整数排序中性能极佳。
          </p>
          <pre className="bg-black text-white rounded-md p-4 text-sm overflow-x-auto">
  {`// 获取最大位数
  public static int maxDigits(int[] nums) {
      int max = Integer.MIN_VALUE;
      for (int num : nums) max = Math.max(max, num);
      int res = 0;
      while (max != 0) {
          res++;
          max /= 10;
      }
      return res;
  }
  
  // 获取第 d 位数字（从右往左）
  public static int getDigit(int num, int d) {
      return (num / (int)Math.pow(10, d - 1)) % 10;
  }
  
  // 基数排序（主方法）
  public static void radixSort(int[] nums, int L, int R, int digit) {
      final int radix = 10;
      int[] help = new int[R - L + 1];
      for (int d = 1; d <= digit; d++) {
          int[] count = new int[radix];
          for (int i = L; i <= R; i++) {
              int j = getDigit(nums[i], d);
              count[j]++;
          }
          for (int i = 1; i < radix; i++) count[i] += count[i - 1];
          for (int i = R; i >= L; i--) {
              int j = getDigit(nums[i], d);
              help[--count[j]] = nums[i];
          }
          for (int i = L, j = 0; i <= R; i++, j++) {
              nums[i] = help[j];
          }
      }
  }`}
          </pre>
          <h3 className="font-semibold text-lg mt-4 mb-2">🧮 为什么选择基数排序？</h3>
          <p>
            它通过“分位”逐步排序，避免比较，提高了排序效率，尤其适合大批量数字，且数字位数有限的场景。缺点在于需要额外的空间（O(N)）存储临时数组，不适合处理负数或浮点数。
          </p>
        </>
      )
    },
  
    // 排序算法的稳定性总结
    {
      badge: '排序算法的稳定性总结',
      description: (
        <>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;在深入了解各种排序算法后，稳定性这一属性尤为值得关注。所谓“排序的稳定性”，是指在排序的过程中，若两个元素的值相等，它们在排序前后的相对顺序是否保持不变。稳定排序能够确保多关键字排序的正确性与一致性。
          </p>
          <h3 className="font-semibold text-lg mt-4 mb-2">📌 为什么稳定性重要？</h3>
          <ul className="list-disc list-inside ml-6">
            <li>多关键字排序场景中：先按次要关键字排序，再按主要关键字排序，依赖稳定性保证顺序正确</li>
            <li>保持原始元素的相对位置，有助于多阶段数据处理和后续分析</li>
          </ul>
          <h3 className="font-semibold text-lg mt-4 mb-2">📊 各排序算法稳定性对比：</h3>
          <table className="table-auto border border-gray-300 text-sm mt-2 mb-4 w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">算法</th>
                <th className="border px-2 py-1">时间复杂度</th>
                <th className="border px-2 py-1">空间复杂度</th>
                <th className="border px-2 py-1">稳定性</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">冒泡排序</td>
                <td className="border px-2 py-1">O(N²)</td>
                <td className="border px-2 py-1">O(1)</td>
                <td className="border px-2 py-1 text-green-600">稳定</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">插入排序</td>
                <td className="border px-2 py-1">O(N²)</td>
                <td className="border px-2 py-1">O(1)</td>
                <td className="border px-2 py-1 text-green-600">稳定</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">选择排序</td>
                <td className="border px-2 py-1">O(N²)</td>
                <td className="border px-2 py-1">O(1)</td>
                <td className="border px-2 py-1 text-red-600">不稳定</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">归并排序</td>
                <td className="border px-2 py-1">O(N log N)</td>
                <td className="border px-2 py-1">O(N)</td>
                <td className="border px-2 py-1 text-green-600">稳定</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">快速排序</td>
                <td className="border px-2 py-1">O(N log N)</td>
                <td className="border px-2 py-1">O(log N)</td>
                <td className="border px-2 py-1 text-red-600">不稳定</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">堆排序</td>
                <td className="border px-2 py-1">O(N log N)</td>
                <td className="border px-2 py-1">O(1)</td>
                <td className="border px-2 py-1 text-red-600">不稳定</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">计数排序</td>
                <td className="border px-2 py-1">O(N + K)</td>
                <td className="border px-2 py-1">O(K)</td>
                <td className="border px-2 py-1 text-green-600">稳定</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">桶排序</td>
                <td className="border px-2 py-1">O(N + K)</td>
                <td className="border px-2 py-1">O(N + K)</td>
                <td className="border px-2 py-1 text-green-600">取决于子排序</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">基数排序</td>
                <td className="border px-2 py-1">O(N × D)</td>
                <td className="border px-2 py-1">O(N)</td>
                <td className="border px-2 py-1 text-green-600">稳定</td>
              </tr>
            </tbody>
          </table>
          <h3 className="font-semibold text-lg mt-4 mb-2">🧠 结语：</h3>
          <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600">
            如果你的数据存在多个排序维度，<strong>稳定性</strong> 就变得至关重要。优先选择支持稳定排序的算法（如归并排序、基数排序），能确保多关键字排序的正确性与一致性。
          </blockquote>
        </>
      ),
    },
  ];
  
