export interface Post {
    title: string;
    slug: string;
    category: string;
    description: string;
    filePath: string;  // 文章对应的 .md 文件路径
}

export const allPosts: Post[] = [
    {
        title: "二叉树",
        slug: "binaryTree",
        category: "algorithm",
        description: "二叉树数据结构基础",
        filePath: "src/app/blog/algorithm/binaryTree/binaryTree.md",
    },
    {
        title: "归并排序",
        slug: "mergeSort",
        category: "algorithm",
        description: "归并排序算法详解",
        filePath: "src/content/algorithm/mergeSort.md",
    },
    {
        title: "React Hooks",
        slug: "reactHooks",
        category: "frontend",
        description: "React Hooks 使用指南",
        filePath: "src/content/frontend/reactHooks.md",
    },
];
