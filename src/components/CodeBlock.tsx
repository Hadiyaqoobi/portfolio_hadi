import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
    code: string;
    language: string;
    filePath: string;
    startLine?: number;
}

/**
 * Tokenize TypeScript/JSX code into syntax-highlighted spans.
 * Lightweight — no external dependencies.
 */
function highlightLine(line: string): JSX.Element[] {
    const tokens: JSX.Element[] = [];
    let remaining = line;
    let key = 0;

    const patterns: [RegExp, string][] = [
        // Single-line comments
        [/^(\/\/.*)/, "code-comment"],
        // Multi-line comment content lines
        [/^(\s*\*.*)/, "code-comment"],
        // Strings (double-quoted)
        [/^("(?:[^"\\]|\\.)*")/, "code-string"],
        // Strings (single-quoted)
        [/^('(?:[^'\\]|\\.)*')/, "code-string"],
        // Template literals
        [/^(`(?:[^`\\]|\\.)*`)/, "code-string"],
        // Keywords
        [/^(import|export|from|class|interface|type|const|let|var|function|return|async|await|new|if|else|try|catch|finally|for|of|in|this|private|public|protected|readonly|extends|implements|typeof|instanceof|throw|switch|case|default|break|continue|void|null|undefined|true|false)\b/, "code-keyword"],
        // Types / Capitalized words (likely types)
        [/^(Promise|string|number|boolean|void|any|unknown|never|Map|Set|Record|Partial|Required|Readonly|Array)\b/, "code-type"],
        // Decorators and special
        [/^(@\w+)/, "code-decorator"],
        // Numbers
        [/^(\d+\.?\d*)/, "code-number"],
        // Method calls (word followed by parenthesis)
        [/^(\w+)(?=\()/, "code-function"],
        // Properties after dot
        [/^\.(\w+)/, "code-property"],
        // Punctuation
        [/^([{}()\[\];:,.<>+=\-*\/&|!?])/, "code-punctuation"],
    ];

    while (remaining.length > 0) {
        let matched = false;

        // Leading whitespace
        const wsMatch = remaining.match(/^(\s+)/);
        if (wsMatch) {
            tokens.push(<span key={key++}>{wsMatch[1]}</span>);
            remaining = remaining.slice(wsMatch[1].length);
            if (remaining.length === 0) break;
        }

        for (const [pattern, className] of patterns) {
            const m = remaining.match(pattern);
            if (m) {
                const matchText = m[0];
                // For property after dot, include the dot
                if (className === "code-property") {
                    tokens.push(<span key={key++} className="code-punctuation">.</span>);
                    tokens.push(<span key={key++} className={className}>{m[1]}</span>);
                    remaining = remaining.slice(matchText.length);
                } else {
                    tokens.push(<span key={key++} className={className}>{matchText}</span>);
                    remaining = remaining.slice(matchText.length);
                }
                matched = true;
                break;
            }
        }

        if (!matched) {
            // Consume one character
            tokens.push(<span key={key++}>{remaining[0]}</span>);
            remaining = remaining.slice(1);
        }
    }

    return tokens;
}

export const CodeBlock = ({ code, language, filePath, startLine = 1 }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);
    const lines = code.split("\n");

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800/50"
        >
            {/* Window chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/50 border-b border-slate-700">
                <div className="flex items-center gap-3">
                    {/* Traffic lights */}
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    </div>
                    {/* File path */}
                    <span className="text-[11px] text-slate-500 font-mono">{filePath}</span>
                </div>

                <div className="flex items-center gap-3">
                    {/* Language badge */}
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                        {language}
                    </span>
                    {/* Copy button */}
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-400 transition-colors"
                        title="Copy code"
                    >
                        {copied ? (
                            <>
                                <Check size={12} className="text-green-600" />
                                <span className="text-green-600">Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy size={12} />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code area */}
            <div className="overflow-x-auto overflow-y-auto max-h-[520px] scrollbar-thin">
                <table className="w-full border-collapse">
                    <tbody>
                        {lines.map((line, i) => (
                            <tr
                                key={i}
                                className="hover:bg-slate-700/30 transition-colors leading-relaxed"
                            >
                                {/* Line number */}
                                <td className="px-4 py-0 text-right text-[11px] text-slate-600 select-none align-top font-mono w-12 border-r border-slate-700">
                                    {startLine + i}
                                </td>
                                {/* Code */}
                                <td className="px-4 py-0 text-[13px] font-mono whitespace-pre text-slate-300 align-top">
                                    {highlightLine(line)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};
