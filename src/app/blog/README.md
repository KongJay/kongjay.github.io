# 博客文件夹结构说明

## 文件夹结构

```
src/app/blog/
├── page.tsx              # 博客列表页面 (/blog)
├── [slug]/
│   └── page.tsx          # 博客文章详情页面 (/blog/[slug])
└── README.md             # 本说明文档
```

## 如何使用

### 1. 添加新的博客文章

要添加新的博客文章，你需要：

1. **在 `src/app/blog/page.tsx` 中的 `blogPosts` 数组中添加文章信息**
2. **在 `src/app/blog/[slug]/page.tsx` 中的 `blogPosts` 数组中添加完整的文章内容**

### 2. 文章数据结构

每篇文章应该包含以下字段：

```typescript
{
  id: number,              // 文章唯一ID
  title: string,           // 文章标题
  excerpt: string,         // 文章摘要（用于列表页显示）
  content: string,         // 文章完整内容（HTML格式）
  author: string,          // 作者
  date: string,           // 发布日期 (YYYY-MM-DD)
  category: string,       // 文章分类
  readTime: string,       // 预计阅读时间
  slug: string,           // URL友好的标识符
  tags: string[]          // 文章标签
}
```

### 3. 文章内容格式

文章内容支持 HTML 格式，你可以使用以下标签：

- `<h2>`, `<h3>`, `<h4>` - 标题
- `<p>` - 段落
- `<ul>`, `<ol>`, `<li>` - 列表
- `<strong>`, `<em>` - 强调
- `<code>` - 代码
- `<a>` - 链接

### 4. 示例

```typescript
{
  id: 3,
  title: "我的第三篇博客文章",
  excerpt: "这是一篇关于技术分享的文章...",
  content: `
    <h2>引言</h2>
    <p>这是文章的开头...</p>
    
    <h2>主要内容</h2>
    <p>这是文章的主要内容...</p>
    
    <h2>总结</h2>
    <p>这是文章的总结...</p>
  `,
  author: "红模仿",
  date: "2024-01-25",
  category: "技术分享",
  readTime: "10分钟",
  slug: "my-third-blog-post",
  tags: ["技术", "分享", "经验"]
}
```

## 路由说明

- `/blog` - 显示所有博客文章的列表
- `/blog/[slug]` - 显示特定文章的详情页面

## 样式说明

博客页面使用了以下样式特性：

- 响应式设计，支持移动端和桌面端
- 深色模式支持
- 3D 卡片效果
- 渐变背景
- 现代化的 UI 设计

## 未来改进建议

1. **数据管理**：将文章数据移到单独的 JSON 文件或数据库中
2. **Markdown 支持**：支持 Markdown 格式的文章编写
3. **分类和标签页面**：添加按分类和标签筛选的功能
4. **搜索功能**：添加文章搜索功能
5. **评论系统**：添加文章评论功能
6. **SEO 优化**：添加 meta 标签和结构化数据 