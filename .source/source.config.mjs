// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
var relayerDocs = defineDocs({
  dir: "content/relayer"
});
var source_config_default = defineConfig();
export {
  source_config_default as default,
  relayerDocs
};
