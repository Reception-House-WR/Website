"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string | null | undefined;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  if (!content) return null;

  const Markdown = ReactMarkdown as unknown as React.FC<{ children: string }>;

  return (
    <div
      className={cn(
        "prose prose-lg prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-center mx-auto prose-p:text-xl prose-p:leading-relaxed prose-p:my-4 ",
        className
      )}
    >
      <Markdown>{content}</Markdown>
    </div>
  );
}
