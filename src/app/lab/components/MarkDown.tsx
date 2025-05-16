import React, { useState, ReactNode } from "react";
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
        <div className="prose w-full h-full break-words overflow-wrap prose-strong:font-bold">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    p: ({ children }) => <div>{children}</div>,
                    code: ({ children, ...props }: { children?: ReactNode }) => {
                        // const [copied, setCopied] = useState(false);

                        // Extract plain text from children
                        // const extractText = (node: ReactNode): string => {
                        //     if (typeof node === "string") return node;
                        //     if (Array.isArray(node)) return node.map(extractText).join("");
                        //     if (React.isValidElement(node) && node.props && typeof node.props === "object" && "children" in node.props) {
                        //         return extractText(node.props.children as ReactNode);
                        //     }
                        //     return "";
                        // };

                        // const codeString = extractText(children);
                        // const isInline = !className && !codeString.includes("\n");

                        // // if (isInline) {
                        // //     return <code className="bg-gray-800 text-white px-1  rounded">{children}</code>;
                        // // }

                        // const match = /language-(\w+)/.exec(className || "");
                        // const language = match ? match[1].toUpperCase() : "TXT";

                        // const handleCopy = () => {
                        //     navigator.clipboard.writeText(codeString);
                        //     setCopied(true);
                        //     setTimeout(() => setCopied(false), 2000);
                        // };

                        return (
                            <div className="relative group w-full">
                                <pre className="overflow-auto bg-[#1e1e1e] w-full text-white p-4 rounded-lg border border-gray-700 relative shadow-lg">
                                    <code className="block overflow-auto" {...props}>{children}</code>
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
