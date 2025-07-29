加强堆
最大线段重合问题(堆的实现)
给定很多线段，每个线段都有两个数[start,end],表示线段开始位置和结束位置，左右都是闭区间。
规定：
线段的开始和结束位置一定都是整数值。
线段重合区域的长度必须>=1，返回线段最多重合区域汇总，包含了几条线段。

先说一个比较Low的办法，就是我们先确定所有线段的最小值和最大值，获得一个区间，然后由于线段重合区域的长度必须>=1，所以我们判断重合的方式不能根据线段上的整数，因为可能一个线段的最大值是2，而另一个线段的最小值是2，这样并不算重合，所以要根据线段上的除了整数的其他数，比如1.5、1.3这样，因为如果两个线段都包括同一个非整数，那么这两个线段一定是重合的，所以我们要遍历[最小值，最大值]这个区间里的非整数比如1.5、2.5、3.5，来判断重合的个数，这是比较笨的方法。(时间复杂度为(max-min)*N)。
再说一个比较高效的办法，这里就要用到小根堆，小根堆里存储的都是每条线段的end数值，在利用小根堆之前需要根据线段的start数值进行从小到大排序，因为如果不排序，线段可能无序进入处理流程，会导致重叠判断混乱、不符合实际的时间关系。通过将线段按起点排序，我们确保每次处理的是“当前最早开始”的线段，便于正确维护正在重叠的线段集合，从而准确统计出最大重叠数。(这里需要举例)。排序好之后我们就可以遍历每条线段，先判断线段的start值是否大于小根堆里的最小值，也就是头节点，如果大于就说明一条线段的start要大于另一条线段的end，肯定就不重合了，所以要将这条线段重合，然后将新线段的end加入到小根堆里，依次遍历，最后保留在小根堆里的所有end节点就代表这有多少条线段重合。（此处应该有示例代码）
再然后我们就要学习一下如何定义加强堆的结构。
加强堆相比正常的堆结构，就是多了一个反向索引表，它可以根据元素的值快速定位到该元素在哪个位置，还有一个变量用于记录heapSize，还有一个变量用于控制使用哪个比较器。它的构造函数是这样：`public HeapGreater(Comparator<T> c){heap = new ArrayList<>(); indexMap = new HashMap<>(); heapSize = 0; comp = c;} `。然后根据加强堆的特点，可以改造出它的交换方法，heapInsert方法，pop方法，resign方法，remove方法以及getAllElements方法。
然后加强堆可以有效的运用到算法中，下面介绍它的使用用例。
给定一个整型数组 `int[] arr`；和一个布尔类型数组 `boolean[] op`
两个数组一一对应，假设长度为 N，`arr[i]` 表示客户编号，`op[i]` 表示客户操作：
```java
arr = [3, 3, 1, 2, 1, 2, 5]
op  = [T, T, T, T, F, T, F]
```
依次表示：
* 3用户购买了一件商品，
* 3用户购买了一件商品，
* 1用户购买了一件商品，
* 2用户购买了一件商品，
* 1用户退货了一件商品，
* 2用户购买了一件商品，
* 5用户退货了一件商品…

一对 `arr[i]` 和 `op[i]` 就代表一个事件：
* 用户号为 `arr[i]`，`op[i] == T` 就代表这个用户购买了一件商品
* `op[i] == F` 就代表这个用户退货了一件商品
现在你作为电商平台负责人，你想在每一个事件到来的时候，都给购买次数最多的前K名用户颁奖。
所以每个事件发生后，你都需要一个得奖名单（得奖区）。

### 得奖系统的规则：

1. **退货时无购买记录视为无效事件**
   如果某个用户购买商品数为 `0`，但是又发生了退货事件，
   则认为该事件无效，得奖名单和上一个事件发生后一致。

   > （例如题目中的 5 用户）

2. **购买和退货影响购买数**

   * 用户发生购买事件时，购买商品数 +1
   * 用户发生退货事件时，购买商品数 -1

3. **每次取购买数最多的前 K 个用户得奖**

   * K 为传入的参数
   * 如果根据规则，得奖人数不足 K 个，那就以当前能满足的人数输出结果
4.得奖系统分为得奖区和候选区，任何用户只要购买数>0，一定在这两个区域中的一个
5.购买数最大的前K名用户进入得奖区，在最初时如果得奖区没有到达K个用户，那么新来的用户直接进入得奖区
6.如果购买数不足以进入得奖区的用户，进入候选区
7.如果候选区购买数最多的用户，已经足以进入得奖区,该用户就会替换得奖区中购买数最少的用户(大于才能替换),如果得奖区中购买数最少的用户有多个，就替换最早进入得奖区的用户,如果候选区中购买数最多的用户有多个，机会会给最早进入候选区的用户
8.候选区和得奖区是两套时间
因用户只会在其中一个区域，所以只会有一个区域的时间，另一个没有从得奖区出来进入候选区的用户，得奖区时间删除进入候选区的时间就是当前事件的时间(可以理解为arr[i和op]中的i)从候选区出来进入得奖区的用户，候选区时间删除，进入得奖区的时间就是当前事件的时间(可以理解为arr[i]和op中的i)
9.如果某用户购买数==0，不管在哪个区域都离开，区域时间删除,离开是指彻底离开，哪个区域也不会找到该用户如果下次该用户又发生购买行为，产生>0的购买数，会再次根据之前规则回到某个区域中，进入区域的时间重记

`import java.util.*;

/**
 * 支持元素更新位置、删除、查找的加强堆结构。
 * 使用泛型和比较器构建最大堆或最小堆。
 */
public class EnhancedHeap<T> {

    // 实际的堆结构
    private final ArrayList<T> heap;

    // 比较器，决定堆的优先级（小根堆 or 大根堆）
    private final Comparator<? super T> comparator;

    // 存储元素在堆中位置的映射
    private final HashMap<T, Integer> indexMap;

    // 当前堆的元素个数
    private int heapSize;

    /**
     * 构造函数：初始化堆
     * @param comparator 决定堆的大小关系（优先级）
     */
    public EnhancedHeap(Comparator<? super T> comparator) {
        this.heap = new ArrayList<>();
        this.comparator = comparator;
        this.indexMap = new HashMap<>();
        this.heapSize = 0;
    }

    /**
     * 插入一个新元素到堆中
     * @param value 待插入元素
     */
    public void push(T value) {
        if (indexMap.containsKey(value)) return;
        heap.add(value);
        indexMap.put(value, heapSize);
        heapInsert(heapSize++);
    }

    /**
     * 弹出堆顶元素
     * @return 堆顶元素或 null（如果为空）
     */
    public T pop() {
        if (isEmpty()) return null;
        T ans = heap.get(0);
        swap(0, heapSize - 1);
        indexMap.remove(ans);
        heap.remove(--heapSize);
        heapify(0);
        return ans;
    }

    /**
     * 删除堆中的任意元素
     * @param value 要删除的元素
     */
    public void remove(T value) {
        if (!indexMap.containsKey(value)) return;
        int index = indexMap.get(value);
        T last = heap.get(heapSize - 1);
        indexMap.remove(value);
        heap.remove(--heapSize);
        if (!value.equals(last)) {
            heap.set(index, last);
            indexMap.put(last, index);
            resign(last);
        }
    }

    /**
     * 某元素的值已变动后，重新调整其在堆中的位置
     * @param value 已存在于堆中的元素
     */
    public void resign(T value) {
        if (!indexMap.containsKey(value)) return;
        int index = indexMap.get(value);
        heapInsert(index);
        heapify(index);
    }

    /**
     * 判断堆中是否包含某元素
     * @param value 待查找元素
     * @return true 表示存在
     */
    public boolean contains(T value) {
        return indexMap.containsKey(value);
    }

    /**
     * 判断堆是否为空
     * @return true 表示堆中没有元素
     */
    public boolean isEmpty() {
        return heapSize == 0;
    }

    /**
     * 获取堆中所有元素的副本列表（不会影响原堆）
     * @return 所有元素列表
     */
    public List<T> getAllElements() {
        return new ArrayList<>(heap.subList(0, heapSize));
    }

    // ===================== 私有辅助方法 ======================

    /**
     * 上浮调整堆结构（从 index 向上）
     */
    private void heapInsert(int index) {
        while (index > 0) {
            int parent = (index - 1) / 2;
            if (comparator.compare(heap.get(index), heap.get(parent)) < 0) {
                swap(index, parent);
                index = parent;
            } else {
                break;
            }
        }
    }

    /**
     * 下沉调整堆结构（从 index 向下）
     */
    private void heapify(int index) {
        int left = index * 2 + 1;
        while (left < heapSize) {
            int smallest = left;
            int right = left + 1;
            if (right < heapSize &&
                comparator.compare(heap.get(right), heap.get(left)) < 0) {
                smallest = right;
            }
            if (comparator.compare(heap.get(smallest), heap.get(index)) >= 0) {
                break;
            }
            swap(index, smallest);
            index = smallest;
            left = index * 2 + 1;
        }
    }

    /**
     * 交换堆中两个位置的元素，并更新索引映射
     */
    private void swap(int i, int j) {
        T a = heap.get(i);
        T b = heap.get(j);
        heap.set(i, b);
        heap.set(j, a);
        indexMap.put(a, j);
        indexMap.put(b, i);
    }
}`

