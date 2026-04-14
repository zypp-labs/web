// lib/supabase-retry.ts - Helper for retrying Supabase queries with exponential backoff

export async function retrySupabaseQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: any; count?: number | null }>,
  retries = 2,
  delay = 1000
): Promise<{ data: T | null; error: any; count?: number | null }> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await queryFn();
      
      // If successful, return immediately (preserve count if present)
      if (!result.error) {
        return {
          data: result.data,
          error: null,
          count: result.count,
        };
      }

      // If it's a network error and we have retries left, try again
      const errorMessage = result.error?.message || String(result.error);
      const isNetworkError = 
        errorMessage.includes("fetch") ||
        errorMessage.includes("network") ||
        errorMessage.includes("ECONNREFUSED") ||
        errorMessage.includes("ETIMEDOUT") ||
        errorMessage.includes("TypeError: fetch failed");
        
      if (attempt < retries && isNetworkError) {
        const waitTime = delay * Math.pow(2, attempt);
        console.warn(
          `Supabase query attempt ${attempt + 1} failed, retrying in ${waitTime}ms...`,
          errorMessage
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }

      // If not a network error or out of retries, return the error
      return result;
    } catch (err: any) {
      const errorMessage = err?.message || String(err);
      
      // If it's a network error and we have retries left, try again
      const isNetworkError = 
        errorMessage.includes("fetch") ||
        errorMessage.includes("network") ||
        errorMessage.includes("ECONNREFUSED") ||
        errorMessage.includes("ETIMEDOUT") ||
        errorMessage.includes("TypeError: fetch failed");
        
      if (attempt < retries && isNetworkError) {
        const waitTime = delay * Math.pow(2, attempt);
        console.warn(
          `Supabase query attempt ${attempt + 1} failed with exception, retrying in ${waitTime}ms...`,
          errorMessage
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }

      // If not a network error or out of retries, throw
      throw err;
    }
  }

  // Should never reach here, but TypeScript needs it
  return { data: null, error: new Error("All retries exhausted") };
}

