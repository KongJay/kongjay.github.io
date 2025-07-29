// contentRegistry.ts
import MergeSortExtension, { mergeSortExtensionContent } from './Algorithm/mergesort/MergeSortExtension';
import Heap, { heapContent } from './Algorithm/heap/Heap';
import Trie, { trieContent } from './Algorithm/trie/Trie';
import BinaryTree, { binaryTreeContent } from './Algorithm/binaryTree/binaryTree';

export const allPosts = [
    ...mergeSortExtensionContent.map(content => ({ ...content, component: MergeSortExtension })),
    ...heapContent.map(content => ({ ...content, component: Heap })),
    ...trieContent.map(content => ({ ...content, component: Trie })),
    ...binaryTreeContent.map(content => ({ ...content, component: BinaryTree })),
  ];
  
