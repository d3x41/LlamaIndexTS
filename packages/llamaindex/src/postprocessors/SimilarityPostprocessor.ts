import type { BaseNodePostprocessor } from "@llamaindex/core/postprocessor";
import type { NodeWithScore } from "@llamaindex/core/schema";

export class SimilarityPostprocessor implements BaseNodePostprocessor {
  similarityCutoff?: number | undefined;

  constructor(options?: { similarityCutoff?: number | undefined }) {
    this.similarityCutoff = options?.similarityCutoff;
  }

  async postprocessNodes(nodes: NodeWithScore[]) {
    if (this.similarityCutoff === undefined) return nodes;

    const cutoff = this.similarityCutoff || 0;
    return nodes.filter((node) => node.score && node.score >= cutoff);
  }
}
