import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";

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
    filePath: "services/orchestrator/Orchestrator.ts",
    description: "Multi-agent LLM pipeline coordination: Claude plans, GPT-4 codes, Gemini validates",
    code: ORCHESTRATOR_CODE,
  },
  {
    id: "wiring",
    label: "Wiring Generator",
    filePath: "services/wiring/generator.ts",
    description: "Converts structured wiring plans into SVG diagrams with automatic routing",
    code: WIRING_CODE,
  },
  {
    id: "architect",
    label: "Hardware Architect",
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
  { label: "User Request", sublabel: "Natural language" },
  { label: "Hardware Architect", sublabel: "Component detection" },
  { label: "Planner (Claude)", sublabel: "Intent → Plan" },
  { label: "Coder (GPT-4)", sublabel: "Plan → Patches" },
  { label: "Guardian (Gemini)", sublabel: "Validate → Fix" },
  { label: "Patch Engine", sublabel: "Apply changes" },
  { label: "Wiring + Compile", sublabel: "SVG + Binary" },
];

const headerTech = ["TypeScript", "React", "Node.js", "Claude API", "GPT-4 API", "Gemini API"];

const MakerMindCaseStudy = () => {
  const [activeTab, setActiveTab] = useState("orchestrator");
  const activeCode = codeTabs.find((t) => t.id === activeTab)!;

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navigation />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 py-14 sm:py-16">
          {/* Header */}
          <header>
            <Link to="/projects" className="link font-sans text-sm">
              &larr; All projects
            </Link>

            <p className="kicker mt-10 mb-3">Case study</p>
            <h1 className="mb-5">MakerMind</h1>
            <p className="prose-measure text-ink-soft">
              An AI-powered platform that generates microcontroller firmware,
              auto-wiring diagrams, and hardware specifications from plain
              English.
            </p>
            <p className="mt-4 font-sans text-sm text-muted">
              {headerTech.join(" · ")}
            </p>
          </header>

          <div className="rule" role="presentation" />

          {/* System architecture */}
          <section>
            <h2 className="mb-3">System architecture</h2>
            <p className="prose-measure text-ink-soft mb-8">
              A multi-agent LLM pipeline that transforms natural language into
              production-ready firmware.
            </p>

            <ol className="max-w-xl">
              {pipelineSteps.map((step, i) => (
                <li
                  key={step.label}
                  className="flex items-baseline gap-4 border-b border-line py-2.5 last:border-b-0"
                >
                  <span className="w-5 shrink-0 font-mono text-xs text-muted tabular-nums">
                    {i + 1}
                  </span>
                  <span className="font-sans text-sm font-semibold text-ink">
                    {step.label}
                  </span>
                  <span className="ml-auto text-right font-sans text-xs text-muted">
                    {step.sublabel}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <div className="rule" role="presentation" />

          {/* Code showcase */}
          <section>
            <h2 className="mb-3">Under the hood</h2>
            <p className="prose-measure text-ink-soft mb-8">
              Real code from the project. Each module represents a distinct
              engineering challenge.
            </p>

            {/* Quiet underline tabs */}
            <div
              className="flex flex-wrap gap-x-6 gap-y-1 border-b border-line font-sans text-sm"
              role="tablist"
              aria-label="Code modules"
            >
              {codeTabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`-mb-px border-b-2 pb-2 transition-colors duration-150 ${
                    activeTab === tab.id
                      ? "border-accent text-accent"
                      : "border-transparent text-ink-soft hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <p className="mt-4 mb-4 font-sans text-xs text-muted">
              <span className="font-mono">{activeCode.filePath}</span>
              <span aria-hidden="true"> · </span>
              {activeCode.description}
            </p>

            {/* Code block */}
            <div className="overflow-hidden rounded-md border border-line bg-paper-raised">
              <div className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-2">
                <span className="truncate font-mono text-xs text-muted">
                  {activeCode.filePath}
                </span>
                <span className="shrink-0 font-sans text-xs text-muted">
                  TypeScript
                </span>
              </div>
              <pre className="max-h-[480px] overflow-auto p-4 font-mono text-[0.8rem] leading-relaxed text-ink-soft">
                <code>{activeCode.code}</code>
              </pre>
            </div>
          </section>

          <div className="rule" role="presentation" />

          {/* Stats, rendered static */}
          <section>
            <h2 className="mb-6">By the numbers</h2>

            <table className="evidence-table">
              <thead>
                <tr>
                  <th scope="col">Measure</th>
                  <th scope="col">Count</th>
                  <th scope="col">Where</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat) => (
                  <tr key={`${stat.label}-${stat.sublabel}`}>
                    <td>{stat.label}</td>
                    <td className="num">{stat.value}</td>
                    <td>{stat.sublabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div className="rule" role="presentation" />

          {/* Tech stack */}
          <section>
            <h2 className="mb-6">Tech stack</h2>

            <table className="evidence-table">
              <thead>
                <tr>
                  <th scope="col">Tool</th>
                  <th scope="col">Role</th>
                </tr>
              </thead>
              <tbody>
                {techStack.map((tech) => (
                  <tr key={tech.name}>
                    <td className="text-ink">{tech.name}</td>
                    <td>{tech.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div className="rule" role="presentation" />

          <p>
            <Link to="/projects" className="link font-sans text-sm">
              &larr; Back to all projects
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MakerMindCaseStudy;
