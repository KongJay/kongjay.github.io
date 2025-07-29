链表
链表多涉及边界问题，
快慢指针法，
1.给定一个单链表的头节点head，请判断该链表是否为回文结构。
用栈可以实现。
(1) 哈希表方法特别简单
(2) 改原链表的方法需要注意边界
链表数要分为奇数个，偶数个。
奇数个可以找到中点，然后中点后边的节点指针都反转，然后从两边往里比较。
偶数个可以找到上中点，然后上中点后边的节点指针都反转，然后从两边往里比较，当遍历到节点为null的时候就说明是回文结构。
2.将单向链表按某值划分成左边小、中间相等、右边大的形式
把链表放数组里，在数组上做partition。
分成小、中、大三部分，再把各个部分之间串起来：要申请六个变量，
一种特殊的单链表节点类描述如下
rand指针是单链表节点结构中新增的指针，rand可能指向链表中的任意一个节点，也可能指向null。
给定一个由Node节点类型组成的无环单链表的头节点head，请实现一个函数完成这个链表的复制，并返回复制的新链表的头节点。
`public class CopyList {

    public static class Node {
        int value;
        Node next;
        Node random;

        public Node(int value) {
            this.value = value;
        }
    }

    /**
     * 使用哈希表复制含随机指针的链表
     */
    public static Node copyListWithRandomHash(Node head) {
        if (head == null) {
            return null;
        }

        Map<Node, Node> map = new HashMap<>();
        Node cur = head;

        // 第一次遍历：复制节点并存储映射关系
        while (cur != null) {
            map.put(cur, new Node(cur.value));
            cur = cur.next;
        }

        cur = head;
        // 第二次遍历：设置 next 和 random 指针
        while (cur != null) {
            Node copyNode = map.get(cur);
            copyNode.next = map.get(cur.next);
            copyNode.random = map.get(cur.random);
            cur = cur.next;
        }

        return map.get(head);
    }

    /**
     * 不使用容器复制含随机指针的链表
     */
    public static Node copyListWithRandom(Node head) {
        if (head == null) {
            return null;
        }

        Node cur = head;
        // 第一步：在原链表中插入拷贝节点
        while (cur != null) {
            Node next = cur.next;
            Node copy = new Node(cur.value);
            cur.next = copy;
            copy.next = next;
            cur = next;
        }

        // 第二步：设置拷贝节点的 random 指针
        cur = head;
        while (cur != null) {
            Node copy = cur.next;
            copy.random = cur.random != null ? cur.random.next : null;
            cur = copy.next;
        }

        // 第三步：拆分链表为原链表和复制链表
        cur = head;
        Node res = head.next; // 保存拷贝链表头
        while (cur != null) {
            Node copy = cur.next;
            Node next = copy.next;

            cur.next = next;
            copy.next = next != null ? next.next : null;

            cur = next;
        }

        return res;
    }
}
`
给定两个可能有环也可能无环的单链表，头节点head1和head2.请实现一个函数，如果两个链表相交，请返回相交的 第一个节点。如果不相交，返回nul
要求
如果两个链表长度之和为N，时间复杂度请达到O(N)，额外空间复杂度 请达到O(1)。


