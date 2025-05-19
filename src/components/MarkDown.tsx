import React, { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
export default function MarkDown({ content }: { content: string }) {
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

    return (
        <div className=" w-full h-full ">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    p: ({ children }) => <div>{children}</div>,
                    code: ({ children, ...props }: { children?: ReactNode }) => {

                        return (
                            <div className="w-full">
                                <pre className=" bg-[#1e1e1e] w-full text-white p-4 rounded-lg border border-gray-700 relative shadow-lg text-wrap">
                                    <code className="block w-full" {...props}>{children}</code>
                                </pre>
                            </div>
                        );
                    }
                }}
            >
                {processedContent}
            </ReactMarkdown>
        </div>
    );
}
