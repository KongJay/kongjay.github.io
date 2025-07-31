// 支持 .md?raw 文件类型
declare module '*.md?raw' {
  const content: string;
  export default content;
}
