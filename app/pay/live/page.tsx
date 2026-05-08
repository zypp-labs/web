"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { PayNavBar } from "@/components/pay-navbar";
import MinimalCard, {
  MinimalCardDescription,
  MinimalCardTitle,
} from "@/components/minimal-card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type Platform = "android" | "ios";

type PayLiveBuild = {
  id: string;
  platform: Platform;
  build_name: string;
  release_date: string;
  url: string;
  ios_channel: "testflight" | "expo" | null;
  checksum: string | null;
  release_notes: string | null;
  important_notes: string | null;
  is_latest: boolean | null;
};

type LiveBuildsResponse = {
  android: { latest: PayLiveBuild | null; previous: PayLiveBuild[] };
  ios: { latest: PayLiveBuild | null; previous: PayLiveBuild[] };
};

function formatBuildDate(iso: string) {
  try {
    return format(new Date(iso), "MMM d, yyyy");
  } catch {
    return iso;
  }
}

function parseBulletText(text: string | null) {
  if (!text) return [];
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[•*-]\s*/, ""));
}

export default function LiveBuildPage() {
  const [data, setData] = useState<LiveBuildsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/pay-live-builds", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load live builds");
        const json = (await res.json()) as LiveBuildsResponse;
        if (!alive) return;
        setData(json);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Failed to load live builds");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const latestAndroid = data?.android.latest ?? null;
  const latestIos = data?.ios.latest ?? null;
  const previousAndroid = data?.android.previous ?? [];
  const previousIos = data?.ios.previous ?? [];

  return (
    <div className="max-w-screen overflow-x-hidden bg-[#e7ffe2] min-h-screen flex flex-col items-center pt-20">
      <PayNavBar />

      <div className="w-full max-w-5xl px-4 md:px-6 pt-10 pb-20">
        <header className="mb-8">
          <h1 className="font-poppins text-[#163617] font-semibold text-4xl md:text-6xl tracking-tighter">
            Live Updates
          </h1>
          <p className="text-[#163617]/70 font-medium tracking-tight text-sm md:text-md mt-3 max-w-2xl">
            Download the latest version of Zypp Pay. Updated in real time.
          </p>
        </header>

        {loading && (
          <div className="text-[#163617]/70 text-sm">Loading latest builds…</div>
        )}
        {error && (
          <div className="text-red-900 bg-red-200/50 p-3 rounded-lg text-sm font-medium text-center mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Android */}
              <MinimalCard className="p-5">
                <div className="flex flex-col h-full">
                  <div className="text-xs font-mono text-[#163617]/50 uppercase tracking-widest mb-2">
                    Android
                  </div>
                  {latestAndroid ? (
                    <>
                      <MinimalCardTitle className="text-2xl">
                        {latestAndroid.build_name}
                      </MinimalCardTitle>
                      <MinimalCardDescription className="text-sm">
                        Released {formatBuildDate(latestAndroid.release_date)}
                      </MinimalCardDescription>

                      <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
                        <a
                          href={latestAndroid.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2.5 flex items-center justify-center rounded-full bg-[#163617] text-[#A1DC95] font-medium hover:bg-[#163617]/90 transition-colors tracking-[-0.03em] w-full sm:w-auto"
                        >
                          Download APK
                        </a>
                        <Collapsible>
                          <CollapsibleTrigger className="px-6 py-2.5 rounded-full bg-[#cbfac2] text-[#163617] font-medium hover:bg-[#cbfac2]/80 transition-colors w-full sm:w-auto">
                            View release notes
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="pt-3">
                              <ul className="list-disc ml-5 text-sm text-[#163617]/80 space-y-1">
                                {parseBulletText(latestAndroid.release_notes).map((b, idx) => (
                                  <li key={idx}>{b}</li>
                                ))}
                                {parseBulletText(latestAndroid.release_notes).length === 0 && (
                                  <li className="text-[#163617]/50">No release notes provided.</li>
                                )}
                              </ul>
                              {latestAndroid.important_notes && (
                                <div className="mt-4 bg-[#cbfac2] text-[#163617] border border-[#163617]/10 rounded-lg p-3">
                                  <div className="text-xs font-mono uppercase tracking-widest text-[#163617]/80">
                                    Important notes
                                  </div>
                                  <div className="text-sm mt-1 text-[#163617]/90">
                                    {latestAndroid.important_notes}
                                  </div>
                                </div>
                              )}
                              {latestAndroid.checksum && (
                                <div className="mt-4 text-xs text-[#163617]/70 font-mono">
                                  Verification: {latestAndroid.checksum}
                                </div>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-[#163617]/60 mt-2">
                      No Android build has been published yet.
                    </div>
                  )}

                  {/* Quick trust */}
                  {latestAndroid && (
                    <div className="mt-6 text-sm text-[#163617]/80">
                      <div className="text-xs font-mono uppercase tracking-widest text-[#163617]/60">
                        Trust
                      </div>
                      <div className="mt-1 font-medium">Official Zypp build</div>
                    </div>
                  )}
                </div>
              </MinimalCard>

              {/* iOS */}
              <MinimalCard className="p-5">
                <div className="flex flex-col h-full">
                  <div className="text-xs font-mono text-[#163617]/50 uppercase tracking-widest mb-2">
                    iOS
                  </div>
                  {latestIos ? (
                    <>
                      <MinimalCardTitle className="text-2xl">
                        {latestIos.build_name}
                      </MinimalCardTitle>
                      <MinimalCardDescription className="text-sm">
                        Released {formatBuildDate(latestIos.release_date)}
                      </MinimalCardDescription>
                      <div className="mt-2 text-xs font-mono text-[#163617]/60 uppercase tracking-widest">
                        {latestIos.ios_channel === "expo" ? "Expo" : "TestFlight"}
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
                        <a
                          href={latestIos.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2.5 flex items-center justify-center rounded-full bg-[#163617] text-[#A1DC95] font-medium hover:bg-[#163617]/90 transition-colors tracking-[-0.03em] w-full sm:w-auto"
                        >
                          {latestIos.ios_channel === "expo" ? "Open Expo" : "Open TestFlight"}
                        </a>

                        <Collapsible>
                          <CollapsibleTrigger className="px-6 py-2.5 rounded-full bg-[#cbfac2] text-[#163617] font-medium hover:bg-[#cbfac2]/80 transition-colors w-full sm:w-auto">
                            View release notes
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="pt-3">
                              <ul className="list-disc ml-5 text-sm text-[#163617]/80 space-y-1">
                                {parseBulletText(latestIos.release_notes).map((b, idx) => (
                                  <li key={idx}>{b}</li>
                                ))}
                                {parseBulletText(latestIos.release_notes).length === 0 && (
                                  <li className="text-[#163617]/50">No release notes provided.</li>
                                )}
                              </ul>
                              {latestIos.important_notes && (
                                <div className="mt-4 bg-[#cbfac2] text-[#163617] border border-[#163617]/10 rounded-lg p-3">
                                  <div className="text-xs font-mono uppercase tracking-widest text-[#163617]/80">
                                    Important notes
                                  </div>
                                  <div className="text-sm mt-1 text-[#163617]/90">
                                    {latestIos.important_notes}
                                  </div>
                                </div>
                              )}
                              {latestIos.checksum && (
                                <div className="mt-4 text-xs text-[#163617]/70 font-mono">
                                  Verification: {latestIos.checksum}
                                </div>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-[#163617]/60 mt-2">
                      No iOS build has been published yet.
                    </div>
                  )}

                  {latestIos && (
                    <div className="mt-6 text-sm text-[#163617]/80">
                      <div className="text-xs font-mono uppercase tracking-widest text-[#163617]/60">
                        Trust
                      </div>
                      <div className="mt-1 font-medium">Official Zypp build</div>
                    </div>
                  )}
                </div>
              </MinimalCard>
            </section>

            {/* Quick instructions */}
            <section className="mt-8 bg-[#cbfac2] rounded-2xl border border-[#163617]/10 p-5">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#163617]/60">
                    Quick info
                  </div>
                  <h2 className="text-[#163617] text-xl font-semibold mt-2">
                    Install in seconds
                  </h2>
                </div>
                <div className="text-sm text-[#163617]/80">
                  <div className="font-medium mb-1">Official Zypp build</div>
                  <div>
                    Android: Download APK → open → install.
                  </div>
                  <div className="mt-1">
                    iOS: Open TestFlight/Expo → install from the store.
                  </div>
                  {latestAndroid?.checksum && (
                    <div className="mt-3 text-xs font-mono">
                      Android verification: {latestAndroid.checksum}
                    </div>
                  )}
                  {latestIos?.checksum && (
                    <div className="mt-1 text-xs font-mono">
                      iOS verification: {latestIos.checksum}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Previous builds */}
            <section className="mt-8">
              <div className="text-[#163617]/60 text-xs font-mono uppercase tracking-widest mb-3">
                Previous builds
              </div>

              <div className="space-y-4">
                <Collapsible defaultOpen={false}>
                  <CollapsibleTrigger className="w-full text-left px-5 py-3 bg-white/20 rounded-2xl border border-[#163617]/10 text-[#163617] font-medium">
                    Android previous builds ({previousAndroid.length})
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-4 space-y-3">
                      {previousAndroid.length === 0 ? (
                        <div className="text-sm text-[#163617]/60 px-2">
                          No previous Android builds.
                        </div>
                      ) : (
                        previousAndroid.map((b) => (
                          <MinimalCard key={b.id} className="p-4 opacity-90">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div>
                                <div className="text-xs font-mono text-[#163617]/50 uppercase tracking-widest">
                                  Android
                                </div>
                                <div className="text-lg font-semibold text-[#163617]">
                                  {b.build_name}
                                </div>
                                <div className="text-sm text-[#163617]/70">
                                  Released {formatBuildDate(b.release_date)}
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                                <a
                                  href={b.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-5 py-2 rounded-full bg-[#163617] text-[#A1DC95] font-medium hover:bg-[#163617]/90 transition-colors tracking-[-0.03em] text-sm"
                                >
                                  Download APK
                                </a>
                              </div>
                            </div>
                            <div className="mt-3">
                              <Collapsible>
                                <CollapsibleTrigger className="text-sm text-[#163617]/80 hover:text-[#163617] underline underline-offset-2">
                                  Release notes
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <ul className="list-disc ml-5 text-sm text-[#163617]/80 space-y-1 mt-3">
                                    {parseBulletText(b.release_notes).map((note, idx) => (
                                      <li key={idx}>{note}</li>
                                    ))}
                                    {parseBulletText(b.release_notes).length === 0 && (
                                      <li className="text-[#163617]/50">
                                        No release notes provided.
                                      </li>
                                    )}
                                  </ul>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>
                          </MinimalCard>
                        ))
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible defaultOpen={false}>
                  <CollapsibleTrigger className="w-full text-left px-5 py-3 bg-white/20 rounded-2xl border border-[#163617]/10 text-[#163617] font-medium">
                    iOS previous builds ({previousIos.length})
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-4 space-y-3">
                      {previousIos.length === 0 ? (
                        <div className="text-sm text-[#163617]/60 px-2">
                          No previous iOS builds.
                        </div>
                      ) : (
                        previousIos.map((b) => (
                          <MinimalCard key={b.id} className="p-4 opacity-90">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div>
                                <div className="text-xs font-mono text-[#163617]/50 uppercase tracking-widest">
                                  iOS
                                </div>
                                <div className="text-xs font-mono text-[#163617]/60 uppercase tracking-widest mt-1">
                                  {b.ios_channel === "expo" ? "Expo" : "TestFlight"}
                                </div>
                                <div className="text-lg font-semibold text-[#163617]">
                                  {b.build_name}
                                </div>
                                <div className="text-sm text-[#163617]/70">
                                  Released {formatBuildDate(b.release_date)}
                                </div>
                              </div>
                              <a
                                href={b.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2 rounded-full bg-[#163617] text-[#A1DC95] font-medium hover:bg-[#163617]/90 transition-colors tracking-[-0.03em] text-sm w-full sm:w-auto flex items-center justify-center"
                              >
                                {b.ios_channel === "expo" ? "Open Expo" : "Open TestFlight"}
                              </a>
                            </div>
                            <div className="mt-3">
                              <Collapsible>
                                <CollapsibleTrigger className="text-sm text-[#163617]/80 hover:text-[#163617] underline underline-offset-2">
                                  Release notes
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <ul className="list-disc ml-5 text-sm text-[#163617]/80 space-y-1 mt-3">
                                    {parseBulletText(b.release_notes).map((note, idx) => (
                                      <li key={idx}>{note}</li>
                                    ))}
                                    {parseBulletText(b.release_notes).length === 0 && (
                                      <li className="text-[#163617]/50">
                                        No release notes provided.
                                      </li>
                                    )}
                                  </ul>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>
                          </MinimalCard>
                        ))
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

