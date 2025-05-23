/**
 * 
 * @param content - The markdown content to be rendered.
 * @description This component takes a string of markdown content and renders it using ReactMarkdown. It also processes the content to ensure proper formatting of code blocks and handles copying code to the clipboard. The commented part is to be kept for future use in case it becomes useful.
 * @returns jsx element
 */

"use client"
// import React, { useState, ReactNode } from "react";
import React, { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
// import { Copy, Check } from "lucide-react"; //uncomment for the copy icon
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
        <div className="prose w-auto h-full break-words overflow-wrap prose-strong:font-bold">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]} // uncomment for syntax highlighting
                components={{
                    p: ({ children }) => <div>{children}</div>,
                    code: ({ className, children, ...props }: { className?: string; children?: ReactNode }) => {

                        // Uncomment the following lines to enable copy functionality
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


                        // uncomment the following line to extract text from children 
                        // const codeString = extractText(children);
                        const match = /language-(\w+)/.exec(className || "");
                        const language = match ? match[1].toUpperCase() : "TXT";
                        void language;

                        // const handleCopy = () => {
                        //     navigator.clipboard.writeText(codeString);
                        //     setCopied(true);
                        //     setTimeout(() => setCopied(false), 2000);
                        // };

                        return (
                            <div className="relative group">
                                <pre className="overflow-auto bg-muted dark:text-white p-4 rounded-lg border border-gray-700 text-wrap relative shadow-lg">
                                    {/* uncomment for prog. Language Label */}
                                    {/* <div className="flex justify-between items-center bg-gray-800 text-xs font-bold rounded">
                                        <p className="ml-3">{language}</p>
                                        <button
                                            onClick={handleCopy}
                                            className="bg-gray-800 text-gray-300 p-1.5 rounded hover:bg-gray-700 hover:text-white transition-all duration-200"
                                        >
                                            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                    </div> */}
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
