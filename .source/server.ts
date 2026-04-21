// @ts-nocheck
import * as __fd_glob_17 from "../content/relayer/api/submit-transaction.mdx?collection=relayerDocs"
import * as __fd_glob_16 from "../content/relayer/api/submit-intent.mdx?collection=relayerDocs"
import * as __fd_glob_15 from "../content/relayer/api/stream-job.mdx?collection=relayerDocs"
import * as __fd_glob_14 from "../content/relayer/api/ops-metrics.mdx?collection=relayerDocs"
import * as __fd_glob_13 from "../content/relayer/api/index.mdx?collection=relayerDocs"
import * as __fd_glob_12 from "../content/relayer/api/health.mdx?collection=relayerDocs"
import * as __fd_glob_11 from "../content/relayer/api/get-job.mdx?collection=relayerDocs"
import * as __fd_glob_10 from "../content/relayer/api/batch-intents.mdx?collection=relayerDocs"
import * as __fd_glob_9 from "../content/relayer/webhooks.mdx?collection=relayerDocs"
import * as __fd_glob_8 from "../content/relayer/transactions.mdx?collection=relayerDocs"
import * as __fd_glob_7 from "../content/relayer/quickstart.mdx?collection=relayerDocs"
import * as __fd_glob_6 from "../content/relayer/job-lifecycle.mdx?collection=relayerDocs"
import * as __fd_glob_5 from "../content/relayer/intents.mdx?collection=relayerDocs"
import * as __fd_glob_4 from "../content/relayer/index.mdx?collection=relayerDocs"
import * as __fd_glob_3 from "../content/relayer/environments.mdx?collection=relayerDocs"
import * as __fd_glob_2 from "../content/relayer/authentication.mdx?collection=relayerDocs"
import * as __fd_glob_1 from "../content/relayer/architecture.mdx?collection=relayerDocs"
import { default as __fd_glob_0 } from "../content/relayer/meta.json?collection=relayerDocs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const relayerDocs = await create.docs("relayerDocs", "content/relayer", {"meta.json": __fd_glob_0, }, {"architecture.mdx": __fd_glob_1, "authentication.mdx": __fd_glob_2, "environments.mdx": __fd_glob_3, "index.mdx": __fd_glob_4, "intents.mdx": __fd_glob_5, "job-lifecycle.mdx": __fd_glob_6, "quickstart.mdx": __fd_glob_7, "transactions.mdx": __fd_glob_8, "webhooks.mdx": __fd_glob_9, "api/batch-intents.mdx": __fd_glob_10, "api/get-job.mdx": __fd_glob_11, "api/health.mdx": __fd_glob_12, "api/index.mdx": __fd_glob_13, "api/ops-metrics.mdx": __fd_glob_14, "api/stream-job.mdx": __fd_glob_15, "api/submit-intent.mdx": __fd_glob_16, "api/submit-transaction.mdx": __fd_glob_17, });