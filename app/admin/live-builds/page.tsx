"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Download, Smartphone, Sparkles } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

type Platform = "android" | "ios";
type IosChannel = "testflight" | "expo";

type PayLiveBuild = {
  id: string;
  platform: Platform;
  build_name: string;
  release_date: string;
  url: string;
  ios_channel: IosChannel | null;
  checksum: string | null;
  release_notes: string | null;
  important_notes: string | null;
  is_latest: boolean | null;
};

type LiveBuildsResponse = {
  android: { latest: PayLiveBuild | null; previous: PayLiveBuild[] };
  ios: { latest: PayLiveBuild | null; previous: PayLiveBuild[] };
};

function todayYmd() {
  const d = new Date();
  // yyyy-MM-dd for <input type="date">
  return d.toISOString().slice(0, 10);
}

export default function LiveBuildsAdminPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [platform, setPlatform] = useState<Platform>("android");
  const [buildName, setBuildName] = useState("");
  const [releaseDate, setReleaseDate] = useState(todayYmd());
  const [isLatest, setIsLatest] = useState(true);

  const [apkFile, setApkFile] = useState<File | null>(null);
  const [androidUrl, setAndroidUrl] = useState("");

  const [iosChannel, setIosChannel] = useState<IosChannel>("testflight");
  const [iosUrl, setIosUrl] = useState("");

  const [releaseNotes, setReleaseNotes] = useState("");
  const [importantNotes, setImportantNotes] = useState("");
  const [checksum, setChecksum] = useState("");

  const [preview, setPreview] = useState<LiveBuildsResponse | null>(null);

  const selectedFileInfo = useMemo(() => {
    if (!apkFile) return null;
    return `${apkFile.name} (${Math.round(apkFile.size / 1024 / 1024)}MB)`;
  }, [apkFile]);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      try {
        const res = await fetch("/api/pay-live-builds", { cache: "no-store" });
        const json = (await res.json()) as LiveBuildsResponse;
        if (!alive) return;
        setPreview(json);
      } catch {
        // ignore preview errors (admin can still add updates)
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const latestAndroid = preview?.android.latest ?? null;
  const latestIos = preview?.ios.latest ?? null;

  const refreshPreview = async () => {
    const res = await fetch("/api/pay-live-builds", { cache: "no-store" });
    const json = (await res.json()) as LiveBuildsResponse;
    setPreview(json);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedBuildName = buildName.trim();
    if (!trimmedBuildName) {
      setError("Build name is required.");
      return;
    }

    if (!releaseDate) {
      setError("Release date is required.");
      return;
    }

    if (platform === "android") {
      const hasFile = Boolean(apkFile);
      const hasUrl = Boolean(androidUrl.trim());
      if (!hasFile && !hasUrl) {
        setError("For Android, provide an APK file or an Android APK URL.");
        return;
      }
    }

    if (platform === "ios") {
      if (!iosUrl.trim()) {
        setError("For iOS, provide the TestFlight/Expo URL.");
        return;
      }
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("platform", platform);
      formData.append("build_name", trimmedBuildName);
      formData.append("release_date", new Date(releaseDate).toISOString());
      formData.append("is_latest", isLatest ? "true" : "false");

      formData.append("release_notes", releaseNotes);
      formData.append("important_notes", importantNotes);
      formData.append("checksum", checksum);

      if (platform === "android") {
        if (apkFile) formData.append("file", apkFile);
        formData.append("android_url", androidUrl.trim());
      }

      if (platform === "ios") {
        formData.append("ios_channel", iosChannel);
        formData.append("ios_url", iosUrl.trim());
      }

      const res = await fetch("/api/admin/pay-live-builds", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Failed to add update");
      }

      // Reset minimal fields, keep platform selection.
      setBuildName("");
      setReleaseNotes("");
      setImportantNotes("");
      setChecksum("");
      setApkFile(null);
      setAndroidUrl("");
      setIosUrl("");
      setIsLatest(true);
      setError(null);

      await refreshPreview();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Live Builds</h1>
        <p className="text-white/60">
          Publish the latest Zypp Pay mobile builds. Only one latest per platform.
        </p>
      </div>

      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-white/80 text-sm font-medium mb-1">Current latest</div>
            <div className="text-white/60 text-xs">
              Updates appear instantly on <span className="font-mono text-white/80">/live</span>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-primary" />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/20 rounded-xl border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-4 h-4 text-primary" />
              <div className="text-white font-medium">Android</div>
            </div>
            {latestAndroid ? (
              <div>
                <div className="text-white font-semibold">{latestAndroid.build_name}</div>
                <div className="text-white/60 text-sm">
                  {format(new Date(latestAndroid.release_date), "MMM d, yyyy")}
                </div>
              </div>
            ) : (
              <div className="text-white/60 text-sm">No Android build published yet.</div>
            )}
          </div>

          <div className="bg-black/20 rounded-xl border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Download className="w-4 h-4 text-primary" />
              <div className="text-white font-medium">iOS</div>
            </div>
            {latestIos ? (
              <div>
                <div className="text-white font-semibold">{latestIos.build_name}</div>
                <div className="text-white/60 text-sm">
                  {format(new Date(latestIos.release_date), "MMM d, yyyy")}
                </div>
              </div>
            ) : (
              <div className="text-white/60 text-sm">No iOS build published yet.</div>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Add Update</h2>
          <p className="text-white/60 text-sm">Publish a new build and optionally mark it as the latest.</p>
        </div>

        {error && (
          <div className="bg-red-500/15 border border-red-400/30 text-red-200 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white/70 text-sm">Build name</Label>
            <Input
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              placeholder="e.g. v0.3.2-beta"
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white/70 text-sm">Platform</Label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none"
            >
              <option value="android">Android</option>
              <option value="ios">iOS</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-white/70 text-sm">Release date</Label>
            <Input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white/70 text-sm">Is Latest</Label>
            <div className="flex items-center gap-3">
              <Switch checked={isLatest} onCheckedChange={setIsLatest} />
              <div className="text-white/60 text-sm">
                Mark this as the latest build for the selected platform.
              </div>
            </div>
          </div>
        </div>

        {platform === "android" && (
          <div className="space-y-3">
            <div className="text-white/80 text-sm font-medium">Android payload</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/70 text-sm">APK file (optional)</Label>
                <input
                  type="file"
                  accept=".apk,application/vnd.android.package-archive"
                  onChange={(e) => setApkFile(e.target.files?.[0] ?? null)}
                  className="w-full text-white/70"
                />
                {selectedFileInfo && (
                  <div className="text-white/60 text-xs mt-1">{selectedFileInfo}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-white/70 text-sm">Android APK URL (optional)</Label>
                <Input
                  value={androidUrl}
                  onChange={(e) => setAndroidUrl(e.target.value)}
                  placeholder="https://.../zypp-pay-latest.apk"
                  className="bg-white/5 border-white/10 text-white"
                />
                <div className="text-white/60 text-xs">
                  Used if no APK file is uploaded.
                </div>
              </div>
            </div>
          </div>
        )}

        {platform === "ios" && (
          <div className="space-y-3">
            <div className="text-white/80 text-sm font-medium">iOS payload</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/70 text-sm">iOS distribution</Label>
                <select
                  value={iosChannel}
                  onChange={(e) => setIosChannel(e.target.value as IosChannel)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none"
                >
                  <option value="testflight">TestFlight</option>
                  <option value="expo">Expo</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-white/70 text-sm">
                  {iosChannel === "expo" ? "Expo URL" : "TestFlight URL"}
                </Label>
                <Input
                  value={iosUrl}
                  onChange={(e) => setIosUrl(e.target.value)}
                  placeholder={
                    iosChannel === "expo"
                      ? "https://expo.dev/... or exp://..."
                      : "https://testflight.apple.com/join/..."
                  }
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white/70 text-sm">Release notes</Label>
            <Textarea
              value={releaseNotes}
              onChange={(e) => setReleaseNotes(e.target.value)}
              placeholder={`Bullet points, one per line.\nExample:\n- Offline payments are smoother\n- Smaller APK size`}
              className="min-h-[140px] bg-white/5 border-white/10 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white/70 text-sm">Important notes (optional)</Label>
            <Textarea
              value={importantNotes}
              onChange={(e) => setImportantNotes(e.target.value)}
              placeholder="Breaking changes, install steps, etc."
              className="min-h-[110px] bg-white/5 border-white/10 text-white"
            />

            <Label className="text-white/70 text-sm mt-3">Checksum (optional)</Label>
            <Input
              value={checksum}
              onChange={(e) => setChecksum(e.target.value)}
              placeholder="e.g. SHA-256: abcd..."
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
          >
            {loading ? "Adding…" : "Add Update"}
          </Button>
          <button
            type="button"
            onClick={() => {
              setBuildName("");
              setReleaseDate(todayYmd());
              setIsLatest(true);
              setApkFile(null);
              setAndroidUrl("");
              setIosChannel("testflight");
              setIosUrl("");
              setReleaseNotes("");
              setImportantNotes("");
              setChecksum("");
              setError(null);
            }}
            className="px-4 py-2 bg-white/5 text-white/70 hover:bg-white/10 border border-white/10 rounded-lg transition-colors w-full sm:w-auto"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

