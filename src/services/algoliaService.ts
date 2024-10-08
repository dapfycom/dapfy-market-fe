import { SearchClient, searchClient } from "@algolia/client-search";

const ALGOLIA_APPLICATION_ID = process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!;
const ALGOLIA_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!;

class AlgoliaService {
  private client: SearchClient;

  constructor() {
    this.client = searchClient(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY);
  }

  async searchProducts(query: string, indexName?: string) {
    const results = await this.client.searchSingleIndex({
      indexName: indexName ?? process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!,
      searchParams: {
        query,
      },
    });
    return results;
  }
}

export const algoliaService = new AlgoliaService();
