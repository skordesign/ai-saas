"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  Copy,
  CheckCheck,
  RotateCcw,
  Zap,
  Target,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { streamCopy } from "@/lib/api";

interface ParsedCopy {
  headline: string;
  tagline: string;
  features: string[];
  cta: string;
}

function parseCopy(raw: string): ParsedCopy {
  const get = (label: string) =>
    raw.match(new RegExp(`${label}:\\s*(.+?)(?=\\n[A-Z_]+:|$)`, "s"))?.[1]?.trim() ?? "";

  return {
    headline: get("HEADLINE"),
    tagline: get("TAGLINE"),
    features: [get("FEATURE_1"), get("FEATURE_2"), get("FEATURE_3")].filter(Boolean),
    cta: get("CTA"),
  };
}

const EXAMPLES = [
  { name: "Linktool", description: "A smart link-in-bio page builder for creators" },
  { name: "FlowDocs", description: "AI-powered documentation that writes itself as you code" },
  { name: "PulseHR", description: "Employee performance tracking with real-time AI coaching" },
];

export default function AICopyDemo() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [rawOutput, setRawOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef(false);

  const parsed = isDone ? parseCopy(rawOutput) : null;

  const handleGenerate = async () => {
    if (!productName.trim() || !description.trim()) return;
    abortRef.current = false;
    setRawOutput("");
    setError(null);
    setIsDone(false);
    setIsStreaming(true);

    await streamCopy(
      productName,
      description,
      (token) => {
        if (!abortRef.current) setRawOutput((prev) => prev + token);
      },
      () => {
        setIsStreaming(false);
        setIsDone(true);
      },
      (err) => {
        setIsStreaming(false);
        setError(err);
      }
    );
  };

  const handleReset = () => {
    abortRef.current = true;
    setRawOutput("");
    setIsDone(false);
    setIsStreaming(false);
    setError(null);
  };

  const handleCopy = async () => {
    if (!parsed) return;
    const text = [
      `Headline: ${parsed.headline}`,
      `Tagline: ${parsed.tagline}`,
      ...parsed.features.map((f, i) => `Feature ${i + 1}: ${f}`),
      `CTA: ${parsed.cta}`,
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExample = (ex: { name: string; description: string }) => {
    setProductName(ex.name);
    setDescription(ex.description);
  };

  const canGenerate = productName.trim().length > 0 && description.trim().length > 0 && !isStreaming;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-2xl border border-border bg-card overflow-hidden glow">
        {/* Header bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="ml-3 text-xs text-muted-foreground font-mono">neuralcopy.ai — live demo</span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-muted-foreground">GPT-4o</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Input fields */}
          <div className="space-y-3">
            <Input
              placeholder="Product name (e.g. FlowDocs)"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="bg-input border-border h-11"
              disabled={isStreaming}
            />
            <Textarea
              placeholder="What does it do? (e.g. AI-powered docs that write themselves as you code)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-input border-border resize-none h-20"
              disabled={isStreaming}
            />
          </div>

          {/* Example chips */}
          {!isStreaming && !isDone && (
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground self-center">Try:</span>
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.name}
                  onClick={() => handleExample(ex)}
                  className="text-xs px-3 py-1 rounded-full border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors text-muted-foreground hover:text-foreground"
                >
                  {ex.name}
                </button>
              ))}
            </div>
          )}

          {/* Generate button */}
          <div className="flex gap-2">
            <Button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="flex-1 h-11 glow-sm"
            >
              {isStreaming ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Copy
                </>
              )}
            </Button>
            {(isDone || isStreaming) && (
              <Button variant="outline" size="icon" onClick={handleReset} className="h-11 w-11">
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3">
              {error.includes("Failed to fetch")
                ? "Could not reach the API. Make sure the .NET backend is running on :5000."
                : error}
            </div>
          )}

          {/* Streaming / Result output */}
          <AnimatePresence>
            {(isStreaming || isDone) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border border-border bg-background/60 p-4 space-y-3">
                  {isStreaming && !isDone ? (
                    <div className="font-mono text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed min-h-[60px]">
                      {rawOutput}
                      <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-middle" />
                    </div>
                  ) : parsed ? (
                    <div className="space-y-4">
                      {parsed.headline && (
                        <div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <Zap className="w-3 h-3 text-yellow-400" />
                            Headline
                          </div>
                          <p className="font-bold text-xl leading-tight">{parsed.headline}</p>
                        </div>
                      )}
                      {parsed.tagline && (
                        <div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <MessageSquare className="w-3 h-3 text-blue-400" />
                            Tagline
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{parsed.tagline}</p>
                        </div>
                      )}
                      {parsed.features.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Target className="w-3 h-3 text-violet-400" />
                            Feature Bullets
                          </div>
                          <ul className="space-y-1.5">
                            {parsed.features.map((f, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span className="text-primary mt-0.5">→</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {parsed.cta && (
                        <div>
                          <div className="text-xs text-muted-foreground mb-2">CTA Button</div>
                          <span className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                            {parsed.cta}
                          </span>
                        </div>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="w-full mt-2"
                      >
                        {copied ? (
                          <>
                            <CheckCheck className="w-4 h-4 mr-2 text-green-400" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy All
                          </>
                        )}
                      </Button>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
