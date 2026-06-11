import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* The RUBS Bug Hunt: Hadi's real EQR dynamic-SQL detective story, sanitized,
   stepped through in four moves. Interaction pattern adapted from the v3 demo,
   restyled to the site's existing card + code-window system. */

const moves = [
  {
    tag: "Move 1 · The hunch",
    head: "A number nobody questioned",
    story:
      "Weeks after launch, some utility estimates looked off to me. Not provably wrong, just off. Everyone else had moved on. I started where you always should: one property, one charge code, by hand.",
    file: "rubs_probe.sql",
    code: `-- one property, one code, by hand
SELECT r.PERIOD, u.NMBRBED,
  CEILING(SUM(r.TRANAMT) * 1.0 /
    COUNT(DISTINCT r.NAMEGROUP)) AS calc
FROM RMLEDG r
JOIN UNIT u ON u.RMPROPID = r.RMPROPID
WHERE u.RMPROPID = '29909'
  AND r.CHGCODE  = 'ru1';`,
  },
  {
    tag: "Move 2 · Scale the search",
    head: "80 combinations per property",
    story:
      "20 charge codes times 4 bedroom types meant 80 hand checks per property, across hundreds of properties. So I wrote dynamic SQL: nested WHILE loops that generate and execute every combination into a temp table.",
    file: "rubs_sweep.sql",
    code: `-- 20 codes x 4 bedroom types = 80 per property
WHILE @i <= 20            -- ru1 ... ru20
BEGIN
  WHILE @j <= 3           -- beds 0 ... 3
  BEGIN
    SET @sql = 'INSERT INTO #LEDGER ...';
    EXEC sp_executesql @sql;
    SET @j += 1;
  END
  SET @i += 1;
END`,
  },
  {
    tag: "Move 3 · The reveal",
    head: "FULL OUTER JOIN tells no lies",
    story:
      "Ledger truth in one temp table, the stored estimates in another. A FULL OUTER JOIN with a tolerance band surfaces every mismatch, including the rows that exist on only one side. There it is.",
    file: "rubs_compare.sql",
    code: `-- ledger truth vs stored estimate
SELECT
  CASE
    WHEN ABS(r.calc - a.amt) < 0.01 THEN 'MATCH'
    WHEN a.amt IS NULL              THEN 'MISSING'
    ELSE 'DIFFERENT'   -- there it is
  END AS status
FROM #LEDGER r
FULL OUTER JOIN #AUDIT a
  ON a.code = r.code AND a.beds = r.beds;`,
  },
  {
    tag: "Move 4 · Close it out",
    head: "Root cause, patch FRD, redeploy",
    story:
      "The mismatches clustered on one pattern: a bedroom-type grouping edge case. I authored the patch FRD, the fix shipped, and the corrected values were validated against 12 months of ledger history.",
    file: "outcome.txt",
    code: `✓ root cause: bedroom-grouping edge case
✓ patch FRD authored and approved
✓ validated vs 12 months of ledger history
✓ corrected values live on equityapartments.com`,
  },
];

const TOKEN = new RegExp(
  "('[^']*')|(--.*)|(✓.*)|\\b(FULL OUTER JOIN|INSERT INTO|IS NULL|SELECT|FROM|JOIN|ON|WHERE|AND|OR|CASE|WHEN|THEN|ELSE|END|AS|WHILE|BEGIN|SET|EXEC|DISTINCT|NULL)\\b|\\b(CEILING|SUM|COUNT|ABS|sp_executesql)\\b",
  "g"
);

function highlightLine(line: string, key: number) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(line)) !== null) {
    if (m.index > last) nodes.push(line.slice(last, m.index));
    const [full, str, comment, check, kw, fn] = m;
    if (str) nodes.push(<span key={nodes.length} className="text-emerald-400">{str}</span>);
    else if (comment) nodes.push(<span key={nodes.length} className="text-slate-500 italic">{comment}</span>);
    else if (check) nodes.push(<span key={nodes.length} className="text-emerald-400">{check}</span>);
    else if (kw) nodes.push(<span key={nodes.length} className="text-blue-400">{kw}</span>);
    else if (fn) nodes.push(<span key={nodes.length} className="text-amber-400">{fn}</span>);
    last = m.index + full.length;
  }
  if (last < line.length) nodes.push(line.slice(last));
  return (
    <div key={key} className="whitespace-pre">
      {nodes.length ? nodes : " "}
    </div>
  );
}

export const BugHunt = () => {
  const [step, setStep] = useState(0);
  const current = moves[step];
  const last = moves.length - 1;

  return (
    <section id="bug-hunt" className="py-section-lg relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="accent-line mb-5" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
              The bug nobody else caught
            </h2>
            <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
              A real story from an S&P 500 production system. Sanitized, and playable
              in four moves. This is the kind of work that does not fit in a bullet point.
            </p>
          </motion.div>

          <div className="glass-card overflow-hidden">
            {/* Top bar: move tag + step dots */}
            <div className="flex items-center justify-between gap-3 flex-wrap px-5 sm:px-7 py-4 border-b border-slate-700">
              <span className="text-sm font-semibold text-blue-400">{current.tag}</span>
              <div className="flex items-center gap-2" role="tablist" aria-label="Bug hunt steps">
                {moves.map((mv, i) => (
                  <button
                    key={mv.tag}
                    onClick={() => setStep(i)}
                    aria-label={`Go to ${mv.tag}`}
                    aria-selected={i === step}
                    role="tab"
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i <= step ? "bg-blue-500 w-8" : "bg-slate-700 w-4 hover:bg-slate-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Body: story + code */}
            <div className="grid md:grid-cols-2">
              <motion.div
                key={`story-${step}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-slate-100 mb-3 tracking-[-0.01em]">
                  {current.head}
                </h3>
                <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed">
                  {current.story}
                </p>
              </motion.div>

              <div className="border-t md:border-t-0 md:border-l border-slate-700 bg-[#0B1120]">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono ml-2">
                    {current.file} · sanitized
                  </span>
                </div>
                <motion.pre
                  key={`code-${step}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="p-5 font-mono text-[12px] leading-[1.7] text-slate-300 overflow-x-auto scrollbar-thin"
                >
                  {current.code.split("\n").map((line, i) => highlightLine(line, i))}
                </motion.pre>
              </div>
            </div>

            {/* Nav */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-t border-slate-700">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                aria-label="Previous step"
                className="btn-outline inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-30 disabled:cursor-default"
              >
                <ArrowLeft size={15} />
                Back
              </button>
              <span className="text-xs text-slate-500 tabular-nums">
                {step + 1} / {moves.length}
              </span>
              <button
                onClick={() => setStep((s) => Math.min(last, s + 1))}
                disabled={step === last}
                aria-label="Next step"
                className="btn-outline inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-30 disabled:cursor-default"
              >
                Next
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
