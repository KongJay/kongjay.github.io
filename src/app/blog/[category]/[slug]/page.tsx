import fs from "fs";
import path from "path";
import { allPosts } from "@/app/blog/contentRegistry";
import MarkdownRenderer from "@/app/blog/components/markdown-renderer";

interface Props {
  params: {
    category: string;
    slug: string;
  };
}

// 这是一个 Server Component
export default function PostPage({ params }: Props) {
  const { category, slug } = params;

  // 查找对应文章
  const post = allPosts.find(
      (p) => p.category === category && p.slug === slug
  );

  if (!post) {
    return <div>文章未找到</div>;
  }

  // 读取 md 内容
  const filePath = path.join(process.cwd(), post.filePath);
  const markdownContent = fs.readFileSync(filePath, "utf-8");

  return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <MarkdownRenderer content={markdownContent} />
      </div>
  );
}
