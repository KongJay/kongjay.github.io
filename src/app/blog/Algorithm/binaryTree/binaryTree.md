# 二叉树

## 前言

  二叉树，是计算机科学中极为经典且基础的数据结构之一。它以其简洁的节点结构，每个节点最多拥有左右两个子节点，构建出层级分明的树形体系，深刻影响着数据的组织与处理方式。

  凭借灵活且高效的特性，二叉树广泛应用于排序、搜索、表达式计算以及各种层次化数据的管理中。其中，二叉搜索树通过节点有序排列，显著提升了查找和更新的效率；平衡二叉树和红黑树等变种，则在保持高度平衡的同时，保障操作的最优时间复杂度。

  本篇文章将从二叉树的基本概念出发，详尽讲解它的结构特性与多样形态，深入剖析常见的核心操作——包括插入、删除及多种遍历方式（前序、中序、后序、层序）——并结合图示与 Java 代码演示，助你彻底掌握这棵“数据之树”的奥秘与魅力。

  无论你是算法爱好者，还是软件开发实践者，希望通过本指南，提升你对二叉树这一基础而强大工具的理解和运用，助力构建更加高效、优雅的程序解决方案。

------

## 前序遍历、中序遍历、后序遍历

  遍历是二叉树操作中最基础且关键的过程，常见的遍历方式包括前序遍历、中序遍历和后序遍历。它们分别遵循访问“当前节点”和“左右子节点”的不同顺序，从而满足多样化的应用需求。

  下面我们分别介绍这三种遍历的思想，并通过递归和迭代两种方式展示标准代码示例，帮助你全面理解和掌握二叉树的遍历技巧。

### 前序遍历（Preorder Traversal）

访问顺序为：当前节点 → 左子树 → 右子树。常用于复制树结构或表达式的前缀表达。

```java
// 递归版：前序遍历
void preorderTraversal(TreeNode node) {
    if (node == null) return;
    // 1. 访问当前节点
    System.out.print(node.val + " ");
    // 2. 遍历左子树
    preorderTraversal(node.left);
    // 3. 遍历右子树
    preorderTraversal(node.right);
}

// 迭代版：前序遍历
void preorderTraversalIterative(TreeNode root) {
    if (root == null) return;
    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);
    while (!stack.isEmpty()) {
        TreeNode node = stack.pop();
        // 访问当前节点
        System.out.print(node.val + " ");
        // 注意：先右再左，确保左子树先出栈
        if (node.right != null) stack.push(node.right);
        if (node.left != null) stack.push(node.left);
    }
}
```

### 中序遍历（Inorder Traversal）

访问顺序为：左子树 → 当前节点 → 右子树。中序遍历通常用于二叉搜索树的有序遍历，保证输出节点值的升序排列。

```java
// 递归版：中序遍历
void inorderTraversal(TreeNode node) {
    if (node == null) return;
    // 1. 遍历左子树
    inorderTraversal(node.left);
    // 2. 访问当前节点
    System.out.print(node.val + " ");
    // 3. 遍历右子树
    inorderTraversal(node.right);
}

// 迭代版：中序遍历
void inorderTraversalIterative(TreeNode root) {
    Stack<TreeNode> stack = new Stack<>();
    TreeNode curr = root;
    while (curr != null || !stack.isEmpty()) {
        // 一路向左入栈
        while (curr != null) {
            stack.push(curr);
            curr = curr.left;
        }
        // 弹出栈顶节点并访问
        curr = stack.pop();
        System.out.print(curr.val + " ");
        // 转向右子树
        curr = curr.right;
    }
}
```

### 后序遍历（Postorder Traversal）

访问顺序为：左子树 → 右子树 → 当前节点。后序遍历常用于释放资源或表达式树的后缀运算。

```java
// 递归版：后序遍历
void postorderTraversal(TreeNode node) {
    if (node == null) return;
    // 1. 遍历左子树
    postorderTraversal(node.left);
    // 2. 遍历右子树
    postorderTraversal(node.right);
    // 3. 访问当前节点
    System.out.print(node.val + " ");
}

// 迭代版：后序遍历（使用双栈法）
void postorderTraversalIterative(TreeNode root) {
    if (root == null) return;
    Stack<TreeNode> stack = new Stack<>();
    Stack<TreeNode> output = new Stack<>();
    stack.push(root);
    while (!stack.isEmpty()) {
        TreeNode node = stack.pop();
        output.push(node);
        // 左右子树依次入栈
        if (node.left != null) stack.push(node.left);
        if (node.right != null) stack.push(node.right);
    }
    // 逆序输出
    while (!output.isEmpty()) {
        System.out.print(output.pop().val + " ");
    }
}
```

------

## 递归序

  递归序是理解前序、中序、后序遍历本质的关键。递归过程中，每个节点会被访问三次：第一次进入节点（对应前序遍历），第二次从左子树返回准备访问右子树（对应中序遍历），第三次从右子树返回（对应后序遍历）。

  通过下面的代码，可以清楚看到节点三次访问的过程，理解递归的调用顺序和遍历本质。

```java
// 演示递归序：节点三次访问的打印示例
void recursiveOrder(TreeNode node) {
    if (node == null) return;

    System.out.println("第一次访问（前序）: " + node.val);
    recursiveOrder(node.left);
    System.out.println("第二次访问（中序）: " + node.val);
    recursiveOrder(node.right);
    System.out.println("第三次访问（后序）: " + node.val);
}
```

  理解递归序，有助于你更好地把握递归调用栈和三种遍历的区别与联系。

------

## 二叉树节点分类与祖先节点证明

  在二叉树中，节点可以按照不同的角色和关系，分为五类：

1. **所有的父节点**：即拥有至少一个子节点的节点。
2. **所有的左右子节点**：节点作为左孩子或右孩子的角色。
3. **以左子节点身份存在的所有右节点**：从左孩子的角度看，树中那些位于其右侧的节点。
4. **以右子节点身份存在的所有左节点**：从右孩子的角度看，树中那些位于其左侧的节点。
5. **节点本身**。

  接下来，我们要理解并证明这样一个性质：

> 假设树中有一个特定节点 **X**，先根据前序遍历对所有节点排序，再根据后序遍历对所有节点排序。我们以节点 **X** 为分界点，分别取前序遍历中 **X** 左边的所有节点和后序遍历中 **X** 右边的所有节点。将这两个集合求交集，得到的节点集合一定是节点 **X** 的祖先节点集合。

### 什么是前序遍历和后序遍历排序？

  **前序遍历**的访问顺序是：*根节点 → 左子树 → 右子树*。遍历时，根节点总是最先被访问。

  **后序遍历**的访问顺序是：*左子树 → 右子树 → 根节点*。遍历时，根节点总是最后被访问。

### 为什么要分别取前序遍历中 X 左边和后序遍历中 X 右边？

  我们以节点 **X** 为界限，将前序遍历的节点序列按顺序分为两部分：**X** 左边的节点和右边的节点。同理，将后序遍历序列也以 **X** 分开，得到左边和右边的节点。

  这里我们关注的是：

- 前序遍历中，位于 **X** 左侧的节点集合，记为 `P`；
- 后序遍历中，位于 **X** 右侧的节点集合，记为 `Q`。

### 结论说明

  我们将证明，集合 `P` 和集合 `Q` 的交集中的节点，一定是节点 **X** 的祖先。

### 证明过程

1. **前序遍历中，节点 X 左边的节点意味着什么？**
	 前序遍历的顺序是“根 → 左 → 右”，所以在访问 **X** 之前被访问的节点，要么是 **X** 的祖先节点，要么是处于 **X** 左子树的节点。
2. **后序遍历中，节点 X 右边的节点意味着什么？**
	 后序遍历的顺序是“左 → 右 → 根”，所以在访问 **X** 之后被访问的节点，要么是 **X** 的祖先节点，要么是处于 **X** 右子树的节点。
3. **将前序遍历中 X 左边的节点与后序遍历中 X 右边的节点做交集，交集中的节点会是哪些？**
	- *子孙节点* 不可能同时出现在前序遍历 X 左边和后序遍历 X 右边。因为子孙在前序遍历中一定在 X 之后，后序遍历中也一定在 X 之前。
	- *同级节点*（兄弟节点或非祖先节点）也不满足同时位于这两个集合中。
	- 唯一能同时满足条件的，就是 **X** 的祖先节点，因为祖先节点在前序遍历中必然在 **X** 之前，在后序遍历中必然在 **X** 之后。

### 结论

  因此，我们可以得出结论：

> **以节点 X 为分界，前序遍历排序中 X 左边节点与后序遍历排序中 X 右边节点的交集，恰好是 X 的祖先节点集合。**

### 为什么这个结论重要？

  这个结论帮助我们通过前序和后序遍历的结果，快速定位节点的祖先关系，对于树结构的算法设计，比如树的最近公共祖先（LCA）问题、构建树结构、路径查询等，都有很重要的意义。

### 举个简单例子帮助理解

假设有如下二叉树：

```
1
├── 2
│   ├── 4
│   └── 5
└── 3
    ├── 6
    └── 7
```

- 前序遍历序列是：`[1, 2, 4, 5, 3, 6, 7]`
- 后序遍历序列是：`[4, 5, 2, 6, 7, 3, 1]`

取节点 **X = 3**，

- 前序遍历中，`3` 的左边节点是 `[1, 2, 4, 5]`
- 后序遍历中，`3` 的右边节点是 `[3, 1]`（注意包含 X 本身，因为后序 X 可能位于中间）
	 交集是 `[1]`，即节点 1，它正是节点 3 的祖先节点（根节点）。

  希望通过详细讲解和举例，能帮你更好理解这个性质！

------

## 二叉树以左节点分解

  一个重要且有趣的性质是：**任意二叉树都可以通过“以左节点为主”进行分解**。

  这是什么意思呢？我们知道，二叉树的每个节点最多有两个子节点——左子节点和右子节点。以左节点分解，指的是将整棵树拆解成：

- 一条由连续左子节点组成的链（称为左边界链），
- 以及分布在这些左子节点上的右子树。

  这样分解的好处是，将复杂的树结构转化为主干链加上多个较小的右子树，方便我们使用递归或迭代方法逐步处理和分析。

  举例来说，考虑一棵二叉树：

```
A
├── B (左子节点)
│   ├── D (左子节点)
│   └── E (右子节点)
└── C (右子节点)
```

  这棵树以左节点分解后，左边界链为 A → B → D，沿链上的每个节点（A、B、D）都可能有右子树：

- A 的右子树是 C，
- B 的右子树是 E，
- D 没有右子树。

  因此，我们可以把二叉树的遍历或者其他操作转化为：

1. 处理左边界链上的节点，依次遍历 A、B、D；
2. 对每个节点的右子树递归或迭代处理（这里的右子树可能是空或者子树）。

  这种分解思想非常有用，尤其在设计遍历算法、树的重构或者动态规划等问题时，可以简化思路，提高代码可读性和效率。

  总结：**任意二叉树都可以“拆成”一条左子节点主链，再加若干右子树的形式**，这是一种很经典的结构化思路。

------

## 层序遍历（Breadth-First Traversal）

  层序遍历，又称广度优先遍历（BFS），是二叉树遍历的一种重要方式。它按照树的层级，从上到下、从左到右逐层访问节点。

  与前序、中序、后序等深度优先遍历不同，层序遍历可以帮助我们直观地了解树的层级结构，常用于求树的层数、宽度，以及构造层级关系等场景。

### 层序遍历的思想

  层序遍历通常使用队列（Queue）辅助实现。具体步骤如下：

1. 将根节点入队；
2. 当队列不为空时，执行循环：
	- 从队列头部出队一个节点，访问它；
	- 将该节点的左子节点（如果存在）入队；
	- 将该节点的右子节点（如果存在）入队；
3. 直到队列为空，遍历结束。

### Java代码示例

```java
import java.util.Queue;
import java.util.LinkedList;

// 层序遍历二叉树
void levelOrderTraversal(TreeNode root) {
    if (root == null) return;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root); // 根节点入队

    while (!queue.isEmpty()) {
        TreeNode node = queue.poll(); // 出队访问节点
        System.out.print(node.val + " ");

        // 左子节点入队
        if (node.left != null) {
            queue.offer(node.left);
        }

        // 右子节点入队
        if (node.right != null) {
            queue.offer(node.right);
        }
    }
}
```

### 层序遍历的应用

  层序遍历不仅能按层访问节点，还常用于：

- 计算树的高度（层数）；
- 判断树是否是完全二叉树；
- 序列化和反序列化二叉树；
- 广度优先搜索问题，如最短路径、最小深度等。

  理解层序遍历，是掌握树结构全局视角的基础，也是算法和数据结构中非常实用的技巧。

------

## 二叉树序列化与反序列化

  **序列化**是将二叉树转换成字符串或其他格式以便存储和传输的过程，**反序列化**则是将序列化后的数据还原成原始的二叉树结构。

  序列化和反序列化是数据持久化和网络传输中常见的问题，掌握这两者的实现，对理解树的结构存储和算法设计非常重要。

### 常见的序列化方法：层序遍历（BFS）序列化

  我们通常使用层序遍历配合占位符（如 `null`）来序列化二叉树，记录每个节点的值及其左右子节点是否存在，确保结构完整保存。

### Java代码示例

```java
import java.util.*;

public class Codec {
    private static final String SEP = ",";
    private static final String NULL = "#";

    // 序列化：将二叉树转换成字符串
    public String serialize(TreeNode root) {
        if (root == null) return "";

        StringBuilder sb = new StringBuilder();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node == null) {
                sb.append(NULL).append(SEP);
                continue;
            }
            sb.append(node.val).append(SEP);
            queue.offer(node.left);
            queue.offer(node.right);
        }

        return sb.toString();
    }

    // 反序列化：将字符串还原成二叉树
    public TreeNode deserialize(String data) {
        if (data == null || data.isEmpty()) return null;

        String[] nodes = data.split(SEP);
        Queue<TreeNode> queue = new LinkedList<>();

        TreeNode root = new TreeNode(Integer.parseInt(nodes[0]));
        queue.offer(root);
        int index = 1;

        while (!queue.isEmpty()) {
            TreeNode parent = queue.poll();

            if (!nodes[index].equals(NULL)) {
                TreeNode left = new TreeNode(Integer.parseInt(nodes[index]));
                parent.left = left;
                queue.offer(left);
            }
            index++;

            if (!nodes[index].equals(NULL)) {
                TreeNode right = new TreeNode(Integer.parseInt(nodes[index]));
                parent.right = right;
                queue.offer(right);
            }
            index++;
        }

        return root;
    }
}
```

------

## 多叉树与二叉树互相转换（LCRS）

  多叉树是一种每个节点可以拥有多个子节点的树结构，而二叉树则每个节点最多只有两个子节点。要在二叉树结构中表达多叉树，我们引入一种经典的转换方式：**左孩子-右兄弟表示法（Left-Child Right-Sibling，简称 LCRS）**。

- 左孩子（`left`）指针：指向该节点的第一个子节点；
- 右兄弟（`right`）指针：指向当前子节点的下一个兄弟节点。

  基于这种结构，我们可以实现多叉树与二叉树之间的互相转换（序列化与反序列化）。

### Java代码示例：多叉树 ↔ 二叉树 转换

```java
import java.util.ArrayList;
import java.util.List;

/**
 * 多叉树节点定义
 */
public class Node {
    public int val;
    public List<Node> children;

    public Node() {
        this.children = new ArrayList<>();
    }

    public Node(int _val) {
        val = _val;
        this.children = new ArrayList<>();
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children != null ? _children : new ArrayList<>();
    }
}

/**
 * 二叉树节点定义
 */
public class TreeNode {
    int val;
    TreeNode left;   // 表示第一个子节点
    TreeNode right;  // 表示下一个兄弟节点

    public TreeNode(int x) {
        val = x;
    }
}

/**
 * 多叉树与二叉树的互转实现
 */
public class TreeCodec {

    // 多叉树编码为二叉树
    public TreeNode encode(Node root) {
        if (root == null) return null;

        TreeNode binaryRoot = new TreeNode(root.val);
        binaryRoot.left = encodeChildren(root.children);
        return binaryRoot;
    }

    // 辅助函数：将多叉树节点列表编码成二叉树的左孩子-右兄弟结构
    private TreeNode encodeChildren(List<Node> children) {
        if (children == null || children.isEmpty()) return null;

        TreeNode head = null;
        TreeNode curr = null;
        for (Node child : children) {
            TreeNode tNode = new TreeNode(child.val);
            if (head == null) {
                head = tNode;
            } else {
                curr.right = tNode;
            }
            curr = tNode;
            curr.left = encodeChildren(child.children);
        }
        return head;
    }

    // 二叉树解码还原为多叉树
    public Node decode(TreeNode root) {
        if (root == null) return null;
        return new Node(root.val, decodeChildren(root.left));
    }

    // 辅助函数：解析左孩子-右兄弟结构还原成多叉树子节点列表
    private List<Node> decodeChildren(TreeNode node) {
        List<Node> children = new ArrayList<>();
        while (node != null) {
            Node child = new Node(node.val, decodeChildren(node.left));
            children.add(child);
            node = node.right;
        }
        return children;
    }
}
```

### 补充说明

  这种 LCRS 转换方式允许我们在只支持二叉树的系统（例如：使用二叉树序列化的网络结构）中实现多叉树结构。通过递归方式分别处理子节点与兄弟节点，可以轻松完成编码与解码过程。

------

## 二叉树最宽层节点数

  求二叉树中最宽的层，即节点数最多的那一层，是树的层序遍历的一个经典应用。

  我们可以利用队列实现层序遍历，同时在遍历过程中统计每层节点数，更新最大值即可。

### 思路解析

1. 从根节点开始，加入队列，并设置其在完全二叉树中的“编号”。
2. 每一层从左到右编号为 0, 1, 2, ...，通过编号可以计算当前层的宽度。
3. 为防止编号溢出，使用 `long` 类型，并归一化编号，使本层起点编号为 0。
4. 记录每层最左最右的编号差值 +1 即为宽度。
5. 直到队列为空，返回最大层宽度。

### Java代码示例

```java
import java.util.Queue;
import java.util.LinkedList;

// TreeNode 定义见题目给出
class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K k, V v) {
        key = k;
        value = v;
    }

    public K getKey() {
        return key;
    }

    public V getValue() {
        return value;
    }
}

public class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;

        // 使用队列进行层序遍历，同时记录每个节点的编号
        Queue<Pair<TreeNode, Long>> queue = new LinkedList<>();
        queue.add(new Pair<>(root, 1L)); // 根节点编号为 1
        int maxWidth = 0;

        while (!queue.isEmpty()) {
            int size = queue.size();
            long minIndex = queue.peek().getValue(); // 当前层最左边的编号
            long start = 0, end = 0;

            for (int i = 0; i < size; i++) {
                Pair<TreeNode, Long> current = queue.poll();
                TreeNode node = current.getKey();

                // 使用 index - minIndex 归一化编号，避免溢出
                long index = current.getValue() - minIndex;

                // 记录当前层的起始和结束编号
                if (i == 0) start = index;
                if (i == size - 1) end = index;

                // 添加子节点，并赋予其在完全二叉树中的编号
                if (node.left != null) {
                    queue.add(new Pair<>(node.left, index * 2));
                }
                if (node.right != null) {
                    queue.add(new Pair<>(node.right, index * 2 + 1));
                }
            }

            // 当前层宽度为 end - start + 1
            maxWidth = Math.max(maxWidth, (int)(end - start + 1));
        }

        return maxWidth;
    }
}
```

  该方法时间复杂度为 O(n)，空间复杂度为 O(n)，能够正确处理节点不连续的宽度计算问题，适用于 LeetCode 第 662 题。

------

## 二叉树节点的后继节点

  后继节点指的是在二叉树的中序遍历中，紧跟在给定节点之后访问的那个节点。理解后继节点对于在二叉搜索树中实现范围查询、删除操作等非常重要。

  后继节点查找通常有以下两种情况：

1. 给定节点有右子树：则后继节点是其右子树中的最左节点（即右子树的最小值）。
2. 给定节点无右子树：则需要沿着父节点向上查找，直到找到一个节点是其父节点的左子节点，那么该父节点就是后继节点；如果一直找不到，则说明该节点没有后继节点（是中序遍历的最后一个节点）。

### Java代码示例（假设节点有指向父节点的指针）

这里假设节点类定义中有 `parent` 指向父节点：

```java
/**
 * 二叉树节点定义，包含父节点引用
 */
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode parent;

    TreeNode(int x) {
        val = x;
    }
}

/**
 * 提供获取某个节点在中序遍历中的后继节点的方法
 */
public class Page {

    /**
     * 获取给定节点在中序遍历中的后继节点
     *
     * @param node 当前节点
     * @return 后继节点，如果不存在则返回 null
     */
    public TreeNode getSuccessorNode(TreeNode node) {
        if (node == null) {
            return null;
        }

        // 情况1：如果有右子树，则后继节点是右子树的最左节点
        if (node.right != null) {
            return getLeftMost(node.right);
        } else {
            // 情况2：无右子树，向上找第一个当前节点是其父节点的左子节点
            TreeNode parent = node.parent;
            while (parent != null && parent.right == node) {
                node = parent;
                parent = parent.parent;
            }
            return parent;
        }
    }

    /**
     * 获取某棵子树中最左侧的节点
     *
     * @param node 子树的根节点
     * @return 最左侧节点
     */
    private TreeNode getLeftMost(TreeNode node) {
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }
}
```

### 补充说明

  如果节点类中没有父节点指针，需要从树的根节点开始，通过比较值找到该节点，并在查找过程中记录路径来辅助查找后继节点，代码实现会更复杂。

------

## 纸条折痕打印问题

  本题是一道典型的递归题。将纸条从下往上折叠 `N` 次后再展开，可以发现每次折痕方向与递归结构类似：第一次压出 `down`，第二次会在每条 `down` 的上下增加 `down` 和 `up`，构成完整的折痕序列。

  本质上构成了一棵二叉树：每次压痕可以看作一个节点，该节点的左子树是 `down`，右子树是 `up`，中间节点为 `down`。折痕的遍历顺序即为中序遍历：`左 - 根 - 右`。

### Java 代码示例

```java
public class PaperFolding {
    /**
     * 打印折痕方向
     * @param N 折叠的次数
     */
    public static void printAllFolds(int N) {
        printProcess(1, N, true);
    }

    /**
     * 递归过程
     * @param i 当前是第几层
     * @param N 总共的层数
     * @param down 当前节点是否是down（true表示down，false表示up）
     */
    public static void printProcess(int i, int N, boolean down) {
        if (i > N) return;

        // 左子树表示“下”折痕
        printProcess(i + 1, N, true);
        
        // 当前折痕（中间节点）
        System.out.print(down ? "down " : "up ");
        
        // 右子树表示“上”折痕
        printProcess(i + 1, N, false);
    }

    public static void main(String[] args) {
        int N = 2;
        printAllFolds(N); // 输出：down down up
    }
}
```

### 示例说明

- N=1：打印 `down`
- N=2：打印 `down down up`
- N=3：打印 `down down up down down up up`

### 补充说明

  每次折叠实际上是在已有折痕的基础上，将所有 `down` 与 `up` 的组合结构套入新的一层递归中。利用中序遍历输出折痕方向是理解本题的关键。

------

## 判断二叉树是否是完全二叉树（LeetCode 958）

**什么是完全二叉树？**
 完全二叉树是指除最后一层外，每层节点都达到了最大节点数，且最后一层的节点从左到右连续排列，即节点不能出现“空洞”。

### 解题思路

- 使用**层序遍历**（广度优先遍历）的方法，从根节点开始逐层访问；
- 遍历过程中，一旦遇到第一个空节点，之后访问到的节点必定全部为空，否则二叉树不是完全二叉树；
- 如果没有违例，则该二叉树是完全二叉树。

这种思路利用了完全二叉树“节点密集且左对齐”的定义特性，直观且高效。

### 代码示例（Java）：

```java
public boolean isCompleteTree(TreeNode root) {
    if (root == null) return true;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    boolean foundNull = false;

    while (!queue.isEmpty()) {
        TreeNode current = queue.poll();

        if (current == null) {
            foundNull = true;  // 遇到空节点，标记
        } else {
            if (foundNull) {
                // 已遇到空节点后又出现非空节点，说明不是完全二叉树
                return false;
            }
            queue.offer(current.left);
            queue.offer(current.right);
        }
    }
    return true;
}
```

------

## 二叉树递归套路详解

面对各种二叉树问题，采用递归时，使用一套通用的套路可以帮助我们理清思路，从而写出健壮的代码。

### 套路步骤

1. **假设：** 对于节点 X，假设能从它的左子树和右子树获取任意需要的信息；
2. **讨论：** 在这个假设前提下，分析当前以 X 为根的子树可能的情况及答案；
3. **确定信息：** 根据讨论，明确到底需要从左树和右树要什么信息；
4. **整合信息：** 将左右子树要的信息合并成为子树必须返回的整体信息 `S`；
5. **每棵子树返回：** 递归函数对每棵子树都返回这个信息 `S`；
6. **代码中将左右树返回信息整合成当前树信息，完成递归逻辑。**

### 举个例子

假设判断二叉树是否平衡（每个节点左右子树高度差不超过1），

- 左右子树返回高度和是否平衡信息；
- 当前节点判断左右子树是否均平衡及两树高度差是否≤1，即可判断当前节点是否平衡且计算高度；
- 将该信息返回给上层节点。

------

## 判断二叉树是否是平衡二叉树（LeetCode 110）

### 平衡二叉树定义

对于树上的每一个节点，左右子树高度差不能超过 1。

### 解题思路

- 左右子树递归返回高度和是否平衡；
- 如果左右平衡且高度差满足条件，则当前节点平衡；
- 否则，全树不平衡。

为方便判断，使用 **-1** 标志子树不平衡。

### 代码示例：

```java
public boolean isBalanced(TreeNode root) {
    return checkHeight(root) != -1;
}

private int checkHeight(TreeNode node) {
    if (node == null) return 0;

    int leftHeight = checkHeight(node.left);
    if (leftHeight == -1) return -1;  // 左子树不平衡

    int rightHeight = checkHeight(node.right);
    if (rightHeight == -1) return -1; // 右子树不平衡

    if (Math.abs(leftHeight - rightHeight) > 1) return -1; // 当前节点不平衡

    return Math.max(leftHeight, rightHeight) + 1; // 返回高度
}
```

------

## 何为搜索二叉树（BST）？

- BST 是一棵满足性质：任意节点的值大于左子树所有节点值，小于右子树所有节点值的二叉树；
- 通常不允许重复值；
- BST中的中序遍历结果是有序递增序列；
- 这使得查找、插入、删除操作高效。

------

## 求二叉树上任意两个节点间最大距离（最大直径）

### 题意

求整棵树中任意两个节点之间最长路径长度。

### 解题思路

- 任意节点u的最大路径可能穿过u：等于左右子树最大深度之和；
- 递归中：
	- 计算左右子树最大深度；
	- 更新全局最大直径（maxDiameter）；
- 返回子树最大深度给父节点。

### 代码示例：

```java
int maxDiameter = 0;

public int diameterOfBinaryTree(TreeNode root) {
    maxDiameter = 0;
    depth(root);
    return maxDiameter;
}

private int depth(TreeNode node) {
    if (node == null) return 0;
    int left = depth(node.left);
    int right = depth(node.right);
    maxDiameter = Math.max(maxDiameter, left + right);  // 路径不算节点数，只算边数
    return Math.max(left, right) + 1;
}
```

------

## 判断是否是满二叉树

### 满二叉树定义

每个节点要么没有子节点（叶子节点），要么有两个子节点（没有度为1的节点）。

### 解法思路

- 遍历树的所有节点，检查节点的子节点数；
- 节点子节点数为1时判定非满二叉树。

### 代码示例

```java
public boolean isFullTree(TreeNode root) {
    if (root == null) return true;
    if (root.left == null && root.right == null) return true;
    if (root.left != null && root.right != null) {
        return isFullTree(root.left) && isFullTree(root.right);
    }
    return false; // 只有一个子节点
}
```

------

## 找出二叉树中最大的 BST 子树（LeetCode 333）

### 题意

寻找给定二叉树的最大子树，这个子树要求满足 BST 的性质。

### 解题思路

- 使用递归；
- 每个节点返回如下信息：
	- 是否 BST
	- 子树最小值
	- 子树最大值
	- 子树节点数量
- 根据左右子树信息判断当前子树是否是 BST；
- 维护全局最大 BST 大小。

### 代码示例（简要）：

```java
class Info {
    boolean isBST;
    int min;
    int max;
    int size;

    Info(boolean isBST, int min, int max, int size) {
        this.isBST = isBST;
        this.min = min;
        this.max = max;
        this.size = size;
    }
}

int maxBSTSize = 0;

public int largestBSTSubtree(TreeNode root) {
    process(root);
    return maxBSTSize;
}

private Info process(TreeNode node) {
    if (node == null) {
        return new Info(true, Integer.MAX_VALUE, Integer.MIN_VALUE, 0);
    }

    Info left = process(node.left);
    Info right = process(node.right);

    if (left.isBST && right.isBST && node.val > left.max && node.val < right.min) {
        int size = left.size + right.size + 1;
        maxBSTSize = Math.max(maxBSTSize, size);
        int minVal = Math.min(node.val, left.min);
        int maxVal = Math.max(node.val, right.max);
        return new Info(true, minVal, maxVal, size);
    }
    return new Info(false, 0, 0, 0);
}
```

------

## 树形 DP 总结

树形 DP 是指基于树结构做动态规划。

- **思考方式**：以 root 为头，针对每个节点设计状态（通过递归返回状态）；
- **状态设计**：包含能帮助求解当前节点答案的所有信息；
- **递归定义**：递归函数返回设计的状态；
- **状态转移**：通过左右子树状态推导当前节点状态。

掌握树形 DP，能高效求解平衡性、路径长度、最大子树结构等复杂问题。

------

## 求二叉树两个节点的最低公共祖先（LCA，LeetCode 236）

### LCA定义

两个节点的最低公共祖先是同时是两者祖先的节点中，距离两节点最近的那个。

### 解题思路

- 如果根节点为空，返回 null；
- 如果根是 p 或 q，返回根节点；
- 递归左右子树，根据返回结果处理：
	- 若左右均非空，根节点即为 LCA；
	- 左右只有一边非空，返回非空子树；
	- 都为空，返回 null。

### 代码示例：

```java
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;

    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);

    if (left != null && right != null) return root;
    return left != null ? left : right;
}
```

------

## 结语

通过以上多个二叉树经典问题的介绍与代码示例，可以看到：

- 对二叉树操作，深入理解其递归性质非常重要；
- 设计一个合适的返回状态类结构可提高代码逻辑清晰度；
- 层序遍历与深度优先遍历各有优劣，适用不同场景；
- 树形 DP 帮助整合复杂信息，实现高效的树问题求解。

掌握这些基本方法和套路，将为你深入算法和数据结构的学习、研究及应用打下坚实基础。祝你在二叉树领域取得突破和提升！