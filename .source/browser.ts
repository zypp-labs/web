// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  relayerDocs: create.doc("relayerDocs", {"architecture.mdx": () => import("../content/relayer/architecture.mdx?collection=relayerDocs"), "authentication.mdx": () => import("../content/relayer/authentication.mdx?collection=relayerDocs"), "environments.mdx": () => import("../content/relayer/environments.mdx?collection=relayerDocs"), "index.mdx": () => import("../content/relayer/index.mdx?collection=relayerDocs"), "intents.mdx": () => import("../content/relayer/intents.mdx?collection=relayerDocs"), "job-lifecycle.mdx": () => import("../content/relayer/job-lifecycle.mdx?collection=relayerDocs"), "quickstart.mdx": () => import("../content/relayer/quickstart.mdx?collection=relayerDocs"), "transactions.mdx": () => import("../content/relayer/transactions.mdx?collection=relayerDocs"), "webhooks.mdx": () => import("../content/relayer/webhooks.mdx?collection=relayerDocs"), "api/batch-intents.mdx": () => import("../content/relayer/api/batch-intents.mdx?collection=relayerDocs"), "api/get-job.mdx": () => import("../content/relayer/api/get-job.mdx?collection=relayerDocs"), "api/health.mdx": () => import("../content/relayer/api/health.mdx?collection=relayerDocs"), "api/index.mdx": () => import("../content/relayer/api/index.mdx?collection=relayerDocs"), "api/ops-metrics.mdx": () => import("../content/relayer/api/ops-metrics.mdx?collection=relayerDocs"), "api/stream-job.mdx": () => import("../content/relayer/api/stream-job.mdx?collection=relayerDocs"), "api/submit-intent.mdx": () => import("../content/relayer/api/submit-intent.mdx?collection=relayerDocs"), "api/submit-transaction.mdx": () => import("../content/relayer/api/submit-transaction.mdx?collection=relayerDocs"), }),
};
export default browserCollections;