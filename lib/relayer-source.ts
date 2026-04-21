import { loader } from "fumadocs-core/source";
import { relayerDocs } from "@/.source/server";

export const relayerSource = loader(relayerDocs.toFumadocsSource(), {
  baseUrl: "/relayer/docs",
});
