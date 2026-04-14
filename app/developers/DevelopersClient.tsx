"use client";

import { useState } from "react";
import Link from "next/link";
import { MainBtn } from "@/components/custom/MainBtn";
import { Spotlight } from "@/components/custom/spotlight";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { Waitlist } from "@/components/sections/Waitlist";
import { OutBtn } from "@/components/custom/OutBtn";
import { scrollToWaitlist } from "@/lib/utils/scroll";
import {
  GitBranch,
  BookOpen,
  Zap,
  Shield,
  Globe,
  Cpu,
  Coins,
  Share,
  ArrowUpRight,
  Download,
  Play,
  Github,
  FileCode,
  Server,
  Smartphone,
  CheckCircle2,
  Copy,
  ExternalLink,
  Ticket,
  Truck,
  Gamepad,
} from "lucide-react";

export default function DevelopersClient() {
  const [activeTab, setActiveTab] = useState("sdk");
  const [activeDisTab, setActiveDisTab] = useState("javascript");
  const [copiedCode, setCopiedCode] = useState("");

  const sdks = [
    {
      platform: "JavaScript/TypeScript",
      icon: FileCode,
      version: "v1.2.0",
      description: "Full SDK for web and Node.js applications",
      install: "npm install @zypp/sdk",
      docs: "/docs/javascript",
    },
    {
      platform: "React Native",
      icon: Smartphone,
      version: "v1.1.5",
      description: "Mobile SDK for iOS and Android applications",
      install: "npm install @zypp/react-native",
      docs: "/docs/react-native",
    },
    {
      platform: "Python",
      icon: Server,
      version: "v1.0.8",
      description: "Python SDK for backend services and scripts",
      install: "pip install zypp-protocol",
      docs: "/docs/python",
    },
    {
      platform: "Rust",
      icon: Cpu,
      version: "v1.3.2",
      description: "High-performance Rust implementation",
      install: "cargo add zypp-protocol",
      docs: "/docs/rust",
    },
  ];

  const codeExamples: Record<string, string> = {
    javascript: `// Initialize Zypp SDK
import { Zypp } from '@zypp/sdk';

const zypp = new Zypp({
  network: 'mainnet-beta',
  offlineMode: true
});

// Create an offline transaction
const transaction = await zypp.createTransaction({
  recipient: 'user123',
  amount: '1.0',
  token: 'SOL'
});

// Send via Bluetooth or WiFi Direct
await transaction.sendOffline();`,

    react: `// React Hook Example
import { useZypp } from '@zypp/react-sdk';

function SendCrypto() {
  const { sendPayment, isConnected } = useZypp();
  
  const handleSend = async () => {
    const result = await sendPayment({
      to: 'user456',
      amount: 0.5,
      currency: 'USDC'
    });
    
    console.log('Transaction completed:', result);
  };
  
  return (
    <button 
      onClick={handleSend}
      disabled={!isConnected}
    >
      Send Crypto Offline
    </button>
  );
}`,

    mobile: `// React Native Example
import { ZyppMobile } from '@zypp/react-native';

const discovery = new ZyppMobile.Discovery();

// Discover nearby devices
discovery.on('deviceFound', (device) => {
  console.log('Found device:', device.name);
});

// Start discovery
await discovery.start();`,
  };

  const tutorials = [
    {
      title: "Build Your First Offline dApp",
      duration: "15 min",
      level: "Beginner",
      steps: ["Setup SDK", "Create Transaction", "Test Offline", "Deploy"],
      category: "Getting Started",
    },
    {
      title: "Integrate with Solana Wallet",
      duration: "25 min",
      level: "Intermediate",
      steps: ["Wallet Connection", "Transaction Signing", "State Management"],
      category: "Integration",
    },
    {
      title: "Advanced: Custom Protocol Extensions",
      duration: "45 min",
      level: "Advanced",
      steps: ["Protocol Design", "Security Implementation", "Testing"],
      category: "Advanced",
    },
  ];

  const useCases = [
    {
      title: "Offline NFT Marketplaces",
      description: "Enable NFT trading in areas with limited connectivity",
      icon: Share,
      complexity: "Medium",
    },
    {
      title: "Emergency Response Wallets",
      description: "Deploy wallets for disaster relief scenarios",
      icon: Shield,
      complexity: "Medium",
    },
    {
      title: "Micro-Merchant Payments",
      description: "Offline PoS systems for street vendors",
      icon: Coins,
      complexity: "Easy",
    },
    {
      title: "Community Banking",
      description: "Enable rotating savings groups to settle instantly",
      icon: GitBranch,
      complexity: "Medium",
    },
    {
      title: "Logistics Settlement",
      description: "Offline settlement for supply-chain transfers",
      icon: Truck,
      complexity: "Medium",
    },
    {
      title: "Gaming Loot Transfers",
      description: "Peer-to-peer asset transfers offline",
      icon: Gamepad,
      complexity: "Easy",
    },
    {
      title: "Decentralized File Sharing",
      description: "Share files directly between devices securely",
      icon: Globe,
      complexity: "Hard",
    },
    {
      title: "Event Ticketing Systems",
      description: "Sell and transfer tickets without internet",
      icon: Ticket,
      complexity: "Medium",
    },
    {
      title: "Local Payment Networks",
      description: "Create community payment networks",
      icon: Shield,
      complexity: "Hard",
    },
  ];

  const copyToClipboard = (text: string, lang: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(lang);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans px-4 flex flex-col items-center justify-center">
      <NavBar />
      <Spotlight />

      {/* Hero Section */}
      <section className="relative pt-60 pb-20 px-10 sm:px-10 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">
              Build with{" "}
              <span className="text-primary font-serif italic">Zypp</span>
            </h1>
            <p className="text-md md:text-2xl text-white/70 max-w-3xl mx-auto font-medium tracking-tight mb-8">
              Powerful SDKs and tools to integrate offline crypto transactions
              into your applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MainBtn onClick={scrollToWaitlist}>
                <span className="font-semibold text-black">
                  Get Early Access
                </span>
                <ArrowUpRight className="text-primary-foreground" size={16} />
              </MainBtn>
              <OutBtn>
                  <Link
                    href="https://github.com/zypp-labs"
                    className="flex items-center gap-2 text-white"
                  >
                  <Github className="w-4 h-4" />
                  Visit GitHub
                </Link>
              </OutBtn>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Tabs */}
      <section className="w-full py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: "sdk", label: "SDKs" },
              { id: "docs", label: "Docs" },
              { id: "tutorials", label: "Tutorials" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary text-black border-primary"
                    : "border-white/20 text-white/70 hover:border-primary/50"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
            {activeTab === "sdk" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                {sdks.map((sdk) => (
                  <div
                    key={sdk.platform}
                    className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <sdk.icon className="w-10 h-10 text-primary" />
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {sdk.platform}
                          </h3>
                          <p className="text-sm text-white/60">
                            {sdk.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-white/50">
                        {sdk.version}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/70">
                      <code className="bg-black/60 px-3 py-1 rounded-full border border-white/10">
                        {sdk.install}
                      </code>
                      <Link
                        href={sdk.docs}
                        className="text-primary flex items-center gap-1 text-sm font-medium"
                      >
                        View docs
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "docs" && (
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((doc) => (
                  <div
                    key={doc}
                    className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <BookOpen className="w-8 h-8 text-primary" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Developer Guide {doc}
                        </h3>
                        <p className="text-sm text-white/60">
                          Comprehensive reference documentation
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm text-white/70">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm text-white/70">
                        <Play className="w-4 h-4" />
                        Watch video
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "tutorials" && (
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {tutorials.map((tutorial) => (
                  <div
                    key={tutorial.title}
                    className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-primary/70 uppercase tracking-widest">
                        {tutorial.category}
                      </span>
                      <span className="text-sm text-white/50">
                        {tutorial.duration}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {tutorial.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-4">
                      Level: {tutorial.level}
                    </p>
                    <ul className="space-y-2">
                      {tutorial.steps.map((step) => (
                        <li
                          key={step}
                          className="flex items-center gap-2 text-sm text-white/70"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="w-full py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-white mb-2">
                Code Examples
              </h2>
              <p className="text-white/60">
                Copy-ready snippets for your integration.
              </p>
            </div>
            <div className="flex gap-2">
              {[
                { id: "javascript", label: "JavaScript" },
                { id: "react", label: "React" },
                { id: "mobile", label: "Mobile" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                    activeDisTab === tab.id
                      ? "bg-primary text-black border-primary"
                      : "border-white/20 text-white/70 hover:border-primary/50"
                  }`}
                  onClick={() => setActiveDisTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-black/60 p-6">
            <pre className="text-sm text-white/80 overflow-x-auto">
              <code>{codeExamples[activeDisTab]}</code>
            </pre>
            <button
              className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-white/70"
              onClick={() =>
                copyToClipboard(codeExamples[activeDisTab], activeDisTab)
              }
            >
              <Copy className="w-3 h-3" />
              {copiedCode === activeDisTab ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <useCase.icon className="w-10 h-10 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-white/60">
                      {useCase.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Zap className="w-4 h-4" />
                  Complexity: {useCase.complexity}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="w-full py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-black/5 rounded-3xl border border-white/10 p-12">
          <h2 className="text-4xl font-semibold mb-4">
            Ready to build with <span className="text-primary">Zypp</span>?
          </h2>
          <p className="text-white/70 mb-8">
            Join the developer preview and get instant access to SDKs, docs, and
            support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MainBtn>
              <span className="font-semibold text-black">Request Access</span>
              <ArrowUpRight className="text-primary-foreground" size={16} />
            </MainBtn>
            <OutBtn>
              <span className="flex items-center gap-2 text-white">
                <Play className="w-4 h-4" />
                Watch demo
              </span>
            </OutBtn>
          </div>
        </div>
      </section>

      <Waitlist />
      <Footer />
    </div>
  );
}
