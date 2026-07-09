import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Code2, Cpu, Zap, Layers, GitBranch, Terminal, Box, Workflow, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Background } from "@/components/Background";
import { CodeBlock } from "@/components/CodeBlock";

/* ═══════════════════════════════════════════
   CODE SNIPPETS - Real code from MakerMind
   ═══════════════════════════════════════════ */

const ORCHESTRATOR_CODE = `/**
 * Orchestrator.ts - The brain of the MakerMind system.
 * Coordinates the entire pipeline:
 * 1. Planner LLM → Understands user intent, creates plan
 * 2. Coder LLM → Generates code patches from plan
 * 3. Guardian LLM → Validates and fixes inconsistencies
 * 4. PatchEngine → Applies validated patches to filesystem
 */

export class Orchestrator {
  private readonly config: Required<OrchestratorConfig>;
  private readonly logger: OrchestratorLogger;

  constructor(
    private readonly patchEngine: PatchEngine,
    private readonly planner: PlannerLLM,
    private readonly coder: CoderLLM,
    private readonly guardian: GuardianLLM,
    config?: OrchestratorConfig
  ) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.logger = new OrchestratorLogger(this.config.logLevel);
  }

  public async processRequest(
    request: UserRequest,
    context: ProjectContext
  ): Promise<OrchestratorResult> {
    const startTime = Date.now();

    // Step 1 - Planning: Understand intent and create plan
    this.logger.info('Step 1: Running Planner LLM (Claude)...');
    const plan = await this.runPlannerLLM(request, context);

    // Step 2 - Coding: Generate patches from plan
    this.logger.info('Step 2: Running Coder LLM (GPT-4)...');
    const rawBatch = await this.runCoderLLM(request, context, plan);

    // Step 3 - Guardian: Validate and fix consistency issues
    this.logger.info('Step 3: Running Guardian LLM (Gemini)...');
    const finalBatch = await this.runGuardianLLM(
      request, context, plan, rawBatch
    );

    // Step 4 - Validation: Structural validation via PatchEngine
    const validation = this.patchEngine.validateBatch(finalBatch);
    if (!validation.valid) {
      return { success: false, errors: validation.errors };
    }

    // Step 5 - Application: Apply patches
    if (!this.config.dryRun) {
      await this.patchEngine.applyBatch(finalBatch);
    }

    return {
      success: true,
      applied: !this.config.dryRun,
      plan,
      patchBatchJson: finalBatch,
    };
  }
}`;

const WIRING_CODE = `/**
 * WiringDiagramGenerator - Converts wiring plans to SVG
 * Renders boards, components, pins, and wire connections
 * with automatic routing and color-coding.
 */

export class WiringDiagramGenerator {
  private options: Required<RenderOptions>;

  public generateSVG(plan: WiringPlan): string {
    const width = plan.canvasWidth || 800;
    const height = plan.canvasHeight || 600;
    const parts: string[] = [];

    // SVG header with embedded styles
    parts.push(this.renderSVGHeader(width, height));
    parts.push(this.renderDefs());
    parts.push(this.renderBackground(width, height));

    if (this.options.showGrid) {
      parts.push(this.renderGrid(width, height));
    }

    if (plan.title) {
      parts.push(this.renderTitle(plan.title, width));
    }

    // Board → Components → Wires (layered rendering)
    parts.push(this.renderBoard(plan));
    parts.push(this.renderComponents(plan));
    parts.push(this.renderWires(plan));

    parts.push('</svg>');
    return parts.join('\\n');
  }

  private renderWire(
    wire: WireConnection,
    plan: WiringPlan,
    index: number
  ): string {
    const fromPos = this.findPinPosition(
      wire.from.componentId, wire.from.pinId, plan
    );
    const toPos = this.findPinPosition(
      wire.to.componentId, wire.to.pinId, plan
    );

    const color = wire.color || this.pickWireColor(index);
    const midX = (fromPos.x + toPos.x) / 2;
    const midY = (fromPos.y + toPos.y) / 2;
    const curveOffset = (index % 3 - 1) * 20;

    return \`<path
      d="M \${fromPos.x} \${fromPos.y}
         Q \${midX + curveOffset} \${midY + curveOffset}
           \${toPos.x} \${toPos.y}"
      fill="none"
      stroke="\${color}"
      stroke-width="2.5"
      class="wire"
      filter="url(#wireGlow)"
    />\`;
  }
}`;

const ARCHITECT_CODE = `/**
 * HardwareArchitect - Analyzes natural language requests
 * and produces structured architecture specifications
 * including boards, components, and system requirements.
 */

export class HardwareArchitect {
  private registry: ComponentRegistry;

  public async buildSpec(
    input: HardwareArchitectInput
  ): Promise<ArchitectureSpec> {
    const text = input.text.toLowerCase();

    // Check for multi-device patterns
    const isMultiDevice = this.detectMultiDevicePattern(text);

    if (isMultiDevice) {
      return this.buildMultiDeviceSpec(input, text);
    }

    // Single-device flow
    const board = this.selectBoard(text);
    const components = this.detectComponents(text, board);

    // Add status LED if not explicitly present
    if (components.length > 0 &&
        !components.some(c => c.componentId === 'led-basic')) {
      components.push({
        id: 'status_led',
        componentId: 'led-basic',
        role: 'indicator',
      });
    }

    const requirements = this.analyzeRequirements(text, components);

    return {
      summary: this.generateSummary(board, requirements),
      devices: [{ id: 'main-device', board, components }],
      requirements,
    };
  }

  private detectComponents(
    text: string,
    board: BoardKind
  ): ArchitectureComponentSpec[] {
    const components: ArchitectureComponentSpec[] = [];

    for (const mapping of COMPONENT_MAPPINGS) {
      const matched = mapping.keywords.some(kw => text.includes(kw));

      if (matched) {
        let componentId = mapping.componentId;

        // Upgrade DHT11 to DHT22 for ESP32/wifi projects
        if (componentId === 'dht11-temp-humidity'
            && board === 'esp32') {
          componentId = 'dht22-temp-humidity';
        }

        const instanceId =
          \`\${componentId}_\${components.length}\`;

        components.push({
          id: instanceId,
          componentId,
          role: mapping.role,
        });
      }
    }

    return components;
  }
}`;

/* ═══════════════════════════════════════════
   CASE STUDY PAGE
   ═══════════════════════════════════════════ */

const codeTabs = [
    {
        id: "orchestrator",
        label: "Orchestrator",
        icon: Workflow,
        filePath: "services/orchestrator/Orchestrator.ts",
        description: "Multi-agent LLM pipeline coordination: Claude plans, GPT-4 codes, Gemini validates",
        code: ORCHESTRATOR_CODE,
    },
    {
        id: "wiring",
        label: "Wiring Generator",
        icon: Zap,
        filePath: "services/wiring/generator.ts",
        description: "Converts structured wiring plans into SVG diagrams with automatic routing",
        code: WIRING_CODE,
    },
    {
        id: "architect",
        label: "Hardware Architect",
        icon: Cpu,
        filePath: "services/architecture/hardwareArchitect.ts",
        description: "Transforms natural language into hardware specifications with component detection",
        code: ARCHITECT_CODE,
    },
];

const stats = [
    { value: "12", label: "Service Modules", sublabel: "Backend architecture" },
    { value: "3", label: "LLM Agents", sublabel: "Claude · GPT-4 · Gemini" },
    { value: "665", label: "Lines", sublabel: "SVG wiring generator" },
    { value: "475", label: "Lines", sublabel: "Hardware architect" },
];

const techStack = [
    { name: "TypeScript", category: "Language" },
    { name: "React", category: "Frontend" },
    { name: "Vite", category: "Build" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Node.js", category: "Runtime" },
    { name: "Express", category: "Server" },
    { name: "Claude API", category: "AI, Planning" },
    { name: "GPT-4 API", category: "AI, Coding" },
    { name: "Gemini API", category: "AI, Validation" },
    { name: "Arduino CLI", category: "Compilation" },
    { name: "WebSerial", category: "Hardware I/O" },
    { name: "SVG", category: "Diagrams" },
];

const pipelineSteps = [
    { label: "User Request", sublabel: "Natural language", color: "bg-slate-800/50" },
    { label: "Hardware Architect", sublabel: "Component detection", color: "bg-slate-800/50" },
    { label: "Planner (Claude)", sublabel: "Intent → Plan", color: "bg-indigo-500/10 border-indigo-500/30" },
    { label: "Coder (GPT-4)", sublabel: "Plan → Patches", color: "bg-emerald-500/10 border-emerald-500/30" },
    { label: "Guardian (Gemini)", sublabel: "Validate → Fix", color: "bg-amber-500/10 border-amber-500/30" },
    { label: "Patch Engine", sublabel: "Apply changes", color: "bg-slate-800/50" },
    { label: "Wiring + Compile", sublabel: "SVG + Binary", color: "bg-slate-800/50" },
];

const MakerMindCaseStudy = () => {
    const [activeTab, setActiveTab] = useState("orchestrator");
    const activeCode = codeTabs.find((t) => t.id === activeTab)!;

    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <Background />
            <Navigation />

            <main className="pt-24 pb-32">
                <div className="container mx-auto px-4 max-w-5xl">

                    {/* ─── HEADER ─── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-20"
                    >
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-8"
                        >
                            <ArrowLeft size={14} />
                            All Projects
                        </Link>

                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                                <Terminal size={22} className="text-slate-400" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 tracking-tight leading-[1.1]">
                                    MakerMind
                                </h1>
                                <p className="text-lg text-slate-400 mt-3 max-w-2xl leading-relaxed">
                                    An AI-powered platform that generates microcontroller firmware,
                                    auto-wiring diagrams, and hardware specifications from plain English.
                                </p>
                            </div>
                        </div>

                        {/* Tech badges */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {["TypeScript", "React", "Node.js", "Claude API", "GPT-4 API", "Gemini API"].map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 text-xs font-medium text-slate-400 bg-slate-800/50 border border-slate-700 rounded-lg"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* ─── ARCHITECTURE PIPELINE ─── */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-28"
                    >
                        <div className="accent-line mb-5" />
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-3">System Architecture</h2>
                        <p className="text-slate-400 text-sm mb-10 max-w-lg">
                            A multi-agent LLM pipeline that transforms natural language into production-ready firmware
                        </p>

                        {/* Pipeline visualization */}
                        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
                            {pipelineSteps.map((step, i) => (
                                <div key={i} className="flex items-center">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08, duration: 0.4 }}
                                        className={`px-4 py-3 text-center min-w-[120px] border-t-2 ${
                                            step.color.includes('indigo') ? 'border-t-indigo-500' :
                                            step.color.includes('emerald') ? 'border-t-emerald-500' :
                                            step.color.includes('amber') ? 'border-t-amber-500' :
                                            'border-t-slate-600'
                                        }`}
                                    >
                                        <div className="text-xs font-semibold text-slate-100">{step.label}</div>
                                        <div className="text-[10px] text-slate-400 mt-0.5">{step.sublabel}</div>
                                    </motion.div>
                                    {i < pipelineSteps.length - 1 && (
                                        <ChevronRight size={14} className="text-slate-600 mx-1 hidden md:block flex-shrink-0" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* ─── CODE SHOWCASE ─── */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-28"
                    >
                        <div className="accent-line mb-5" />
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-3">Under the Hood</h2>
                        <p className="text-slate-400 text-sm mb-10 max-w-lg">
                            Real code from the project. Each module represents a distinct engineering challenge
                        </p>

                        {/* Tabs */}
                        <div className="flex gap-1 mb-6 p-1 bg-slate-800/50 rounded-xl border border-slate-700 w-fit">
                            {codeTabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                                ? "bg-slate-800 text-slate-100 border border-slate-600"
                                                : "text-slate-400 hover:text-slate-300"
                                            }`}
                                    >
                                        <Icon size={14} />
                                        <span className="hidden sm:inline">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Tab description */}
                        <p className="text-xs text-slate-400 mb-4 flex items-center gap-2">
                            <Code2 size={12} />
                            <span className="font-mono">{activeCode.filePath}</span>
                            <span className="text-slate-600">·</span>
                            <span>{activeCode.description}</span>
                        </p>

                        {/* Code viewer */}
                        <CodeBlock
                            code={activeCode.code}
                            language="typescript"
                            filePath={activeCode.filePath}
                        />
                    </motion.section>

                    {/* ─── TECHNICAL STATS ─── */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-28"
                    >
                        <div className="accent-line mb-5" />
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-10">By the Numbers</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.5 }}
                                    className="py-6 px-4 text-center border-b border-slate-700/50"
                                >
                                    <div className="text-4xl md:text-5xl font-bold metric-number mb-1">{stat.value}</div>
                                    <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                                    <div className="text-[11px] text-slate-500 mt-1">{stat.sublabel}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* ─── TECH STACK ─── */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-20"
                    >
                        <div className="accent-line mb-5" />
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-10">Tech Stack</h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {techStack.map((tech, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.04, duration: 0.4 }}
                                    className="px-3 py-1.5 rounded-lg border border-slate-700"
                                >
                                    <div className="text-sm font-medium text-slate-300">{tech.name}</div>
                                    <div className="text-[11px] text-slate-500">{tech.category}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* ─── BACK LINK ─── */}
                    <div className="text-center pt-8 border-t border-slate-700">
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 transition-colors"
                        >
                            <ArrowLeft size={14} />
                            Back to All Projects
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default MakerMindCaseStudy;
