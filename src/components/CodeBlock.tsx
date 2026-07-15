import { useState } from "react";

interface CodeBlockProps {
    code: string;
    language: string;
    filePath: string;
    startLine?: number;
}

/**
 * Tokenize TypeScript/JSX code into lightly typeset spans.
 * Token colors only: comments muted, strings ink-soft, keywords bold ink.
 * Everything else inherits the ink code color. No external dependencies.
 */
function highlightLine(line: string): JSX.Element[] {
    const tokens: JSX.Element[] = [];
    let remaining = line;
    let key = 0;

    const patterns: [RegExp, string][] = [
        // Single-line comments
        [/^(\/\/.*)/, "text-muted"],
        // Multi-line comment content lines
        [/^(\s*\*.*)/, "text-muted"],
        // Strings (double-quoted)
        [/^("(?:[^"\\]|\\.)*")/, "text-ink-soft"],
        // Strings (single-quoted)
        [/^('(?:[^'\\]|\\.)*')/, "text-ink-soft"],
        // Template literals
        [/^(`(?:[^`\\]|\\.)*`)/, "text-ink-soft"],
        // Keywords
        [/^(import|export|from|class|interface|type|const|let|var|function|return|async|await|new|if|else|try|catch|finally|for|of|in|this|private|public|protected|readonly|extends|implements|typeof|instanceof|throw|switch|case|default|break|continue|void|null|undefined|true|false)\b/, "font-semibold text-ink"],
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
                tokens.push(<span key={key++} className={className}>{m[0]}</span>);
                remaining = remaining.slice(m[0].length);
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
        <div className="rounded-md overflow-hidden border border-line bg-paper-raised">
            {/* Header: file path, language, copy */}
            <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-line">
                <span className="font-mono text-xs text-muted break-all">{filePath}</span>

                <div className="flex items-center gap-3 shrink-0">
                    <span className="font-sans text-xs uppercase tracking-wider text-muted">
                        {language}
                    </span>
                    <button
                        onClick={handleCopy}
                        className="font-sans text-xs text-ink-soft hover:text-ink transition-colors duration-150"
                        title="Copy code"
                    >
                        {copied ? "Copied" : "Copy"}
                    </button>
                </div>
            </div>

            {/* Code area */}
            <div className="overflow-x-auto overflow-y-auto max-h-[520px]">
                <table className="w-full border-collapse">
                    <tbody>
                        {lines.map((line, i) => (
                            <tr key={i} className="leading-relaxed">
                                {/* Line number */}
                                <td className="px-3 py-0 text-right text-xs text-muted select-none align-top font-mono tabular-nums w-10 border-r border-line">
                                    {startLine + i}
                                </td>
                                {/* Code */}
                                <td className="px-4 py-0 text-[0.8rem] font-mono whitespace-pre text-ink align-top">
                                    {highlightLine(line)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
