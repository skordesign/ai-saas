import { Sparkles, GitBranch, AtSign, Link } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-sm">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg gradient-text">Polarizelab</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              AI-powered copywriting that converts. Stop staring at blank pages — let AI write your
              landing page in seconds.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: GitBranch, label: "GitHub" },
                { icon: AtSign, label: "Twitter" },
                { icon: Link, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Polarizelab, Inc. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with{" "}
            <span className="text-primary">Next.js 16</span> +{" "}
            <span className="text-primary">.NET 10</span> +{" "}
            <span className="text-primary">Azure OpenAI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
