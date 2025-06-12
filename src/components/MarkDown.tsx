"use client"
import React, { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/a11y-dark.css";

export default function MarkDown({
    content,
    className = "",
}: {
    content: string,
    className?: string
}) {
    const preprocessContent = (content: string) => {
        if (!content) return "";
        content = content.replace(/```(\s*\n*\s*)/g, "```");
        content = content.replace(/(\s*\n*\s*)```/g, "\n```");
        content = content.replace(/``````/g, "");
        content = content.replace(/(?<!\n)```([\s\S]*?)```(?<!\n)/g, "\n```$1```\n");
        content = content.replace(/```([\s\S]*?)```/g, (match, p1) => {
            if (p1.includes("\n")) {
                return `\`\`\`${p1}\`\`\`\n`;
            }
            return match;
        });
        return content;
    };

    const processedContent = preprocessContent(content || "");

    // Pass className to the root element rendered by ReactMarkdown via components
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                // Apply the className to the outermost element
                div: ({ children, ...props }) => (
                    <div className="w-full" {...props} >{children}</div>
                ),
                // If you want to style <p> tags, use this:
                p: ({ children }) => <div className={`${className} w-full text-wrap`}>{children}</div>,
                code: ({ className: codeClassName, children, ...props }: { className?: string; children?: ReactNode }) => {
                    const match = /language-(\w+)/.exec(codeClassName || "");
                    const language = match ? match[1].toUpperCase() : "TXT";
                    void language;
                    return (
                        <pre className={`${className ? className : "dark:bg-muted bg-gray-800"} w-full text-white p-4 rounded-lg border border-gray-700 text-wrap overflow-hidden relative shadow-lg`} {...props}>
                            {children}
                        </pre>
                    );
                }
            }}
        >
            {processedContent}
        </ReactMarkdown>
    );
}