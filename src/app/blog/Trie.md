前缀树
先详细介绍什么是前缀树。
介绍完之后我们可以给前缀树加新功能，在每个节点上都加两个值，分别是pass和end， pass主要记录所有字符串经过该节点的次数，end主要记录以end为结尾的字符串个数，通过end就可以知道某个字符串存不存在于这个前缀树中，存在几个。 
然后解释一下前缀树相较于哈希表的优势。
虽然哈希表在理想情况下插入和查找的时间复杂度是 O(1)，但当 key 是字符串时，计算哈希值需要遍历每个字符，因此哈希函数的执行时间是 O(L)，其中 L 是字符串长度。此外，如果发生哈希冲突，还可能涉及完整字符串的逐字符比较。因此，哈希表在处理字符串时的整体时间复杂度并不是 O(1)，而是 O(L)，这一点在字符串作为 key 的应用中尤为重要。
哈希表也无法查询某一个前缀出现了几次。
前缀树查前缀和某一个字符串的出现次数的时间复杂度，并要有代码示例。
然后有这样一个题目，给你一个整型数组，数组里边的每一个数代表这一个员工的年龄，想办法把数组从小到大排好序。
我们可以借用桶排序的思想，就是新建一个help数组，下标从0-200，表示0-200岁，然后遍历原数组，根据原数组中年龄出现的次数，记录到help数组中，然后help数组按照顺序进行排序。
在此之前都是说的基于比较的排序，之外就是不基于比较的排序。但是不基于比较的排序使用场景很窄，因为它通常只适用于数据有局限性的题目。
基数排序：(范围限制是非负的，能用十进制表示的数)
public class Trie {
    // 节点类：表示前缀树中的每个节点
    public static class Node {
        // 当前节点经过的字符串数量
        public int pass;
        
        // 当前节点作为单词结尾的次数
        public int end;
        
        // 当前节点的子节点，26个字母对应26个节点
        public Node[] nexts;

        // 构造函数：初始化节点
        public Node() {
            pass = 0;  // 初始时该节点经过的字符串数为0
            end = 0;   // 初始时该节点作为单词结尾的次数为0
            nexts = new Node[26];  // 26个字母对应26个子节点
        }

        // 插入单词到前缀树中
        public void insert(String word) {
            // 如果插入的单词为空，直接返回
            if (word == null) {
                return;
            }
            // 将单词转换为字符数组
            char[] chs = word.toCharArray();
            Node node = this;
            // 根节点经过的字符串数增加
            node.pass++;

            // 遍历每个字符，按照字母表索引计算路径
            for (int i = 0; i < chs.length; i++) {
                int path = chs[i] - 'a';  // 计算字符对应的数组下标
                // 如果当前字符的路径节点为空，创建一个新的节点
                if (node.nexts[path] == null) {
                    node.nexts[path] = new Node();
                }
                // 当前节点的pass值递增
                node = node.nexts[path];
                node.pass++;  // 每次经过这个节点，pass数增加
            }
            // 单词结尾节点的end值增加
            node.end++;
        }

        // 查询前缀树中某个单词出现的次数
        public int search(String word) {
            // 如果单词为空，返回0
            if (word == null) {
                return 0;
            }
            // 将单词转换为字符数组
            char[] charArray = word.toCharArray();
            Node node = this;
            
            // 遍历每个字符，沿着前缀树的路径查找
            for (int i = 0; i < charArray.length; i++) {
                int path = charArray[i] - 'a';  // 计算字符对应的数组下标
                // 如果某个路径不存在，返回0
                if (node.nexts[path] == null) {
                    return 0;
                }
                node = node.nexts[path];
            }
            // 返回单词结尾节点的end值，即该单词出现的次数
            return node.end;
        }

        // 查询前缀树中某个前缀出现的次数
        public int prefixNumber(String pre) {
            // 如果前缀为空，返回0
            if (pre == null) {
                return 0;
            }
            // 将前缀转换为字符数组
            char[] charArray = pre.toCharArray();
            Node node = this;
            
            // 遍历每个字符，沿着前缀树的路径查找
            for (int i = 0; i < charArray.length; i++) {
                int path = charArray[i] - 'a';  // 计算字符对应的数组下标
                // 如果某个路径不存在，返回0
                if (node.nexts[path] == null) {
                    return 0;
                }
                node = node.nexts[path];
            }
            // 返回以该前缀为前缀的单词数量，即该前缀出现的次数
            return node.pass;
        }

        // 删除前缀树中的单词
        public void delete(String word) {
            // 如果单词为空，直接返回
            if (word == null) {
                return;
            }
            // 将单词转换为字符数组
            char[] charArray = word.toCharArray();
            Node node = this;
            
            // 遍历单词的每个字符，沿路径减少pass值
            for (int i = 0; i < charArray.length; i++) {
                int path = charArray[i] - 'a';  // 计算字符对应的数组下标
                // 如果某个路径不存在，返回（单词不存在）
                if (node.nexts[path] == null) {
                    return;
                }
                node = node.nexts[path];
                node.pass--;  // 每经过一个节点，递减它的pass值
            }
            node.end--;  // 删除单词结尾的end值

            // 如果当前节点的pass值为0，且没有下一个子节点，可以删除该节点
            if (node.pass == 0) {
                node = null; // 删除当前节点
            }
        }

        // 获取一个数组的最大数字位数
        public static int maxbits(int[] nums) {
            int max = Integer.MIN_VALUE;
            for (int i = 0; i < nums.length; i++) {
                max = Math.max(max, nums[i]);  // 找到数组中的最大数
            }
            int res = 0;
            // 计算最大数的位数
            while (max != 0) {
                res++;
                max /= 10;
            }
            return res;
        }

        // 获取数字某一位的值（从右往左）
        public static int getDigit(int num, int d) {
            return (num / (int) Math.pow(10, d - 1)) % 10;
        }

        // 对数字数组进行基数排序
        public static void radixSort(int[] nums, int L, int R, int digit) {
            final int radix = 10;  // 基数排序的基数为10（处理0-9）
            int i = 0;
            int j = 0;
            int[] help = new int[R - L + 1];  // 辅助数组，用于存储排序结果
            for (int d = 1; d <= digit; d++) {  // 遍历每一位数字进行排序
                int[] count = new int[radix];  // 计数数组，用于记录每个数字出现的次数
                for (i = L; i <= R; i++) {
                    j = getDigit(nums[i], d);  // 获取当前位的数字
                    count[j]++;
                }
                // 更新计数数组，count[a] 表示当前位数字为a的数量
                for (int a = 1; a < radix; a++) {
                    count[a] = count[a] + count[a - 1];
                }
                // 将数字放入辅助数组中
                for (i = R; i >= L; i--) {
                    j = getDigit(nums[i], d);  // 获取当前位的数字
                    help[count[j] - 1] = nums[i];
                    count[j]--;  // 更新计数
                }
                // 将辅助数组的排序结果拷贝回原数组
                for (i = L, j = 0; i <= R; i++, j++) {
                    nums[i] = help[j];
                }
            }
        }
    }
}

先讲流程再说为什么。
