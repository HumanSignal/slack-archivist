export async function getAll<T>(
  fn: (payload: any) => T,
  query: object,
  payloadKey: string
) {
  let error;
  let cursor;
  let results: any[] = [];
  do {
    const res = await getNextPageOfWebAPIResults({ fn, query, cursor });
    if (!res.isError) {
      const data = res.page[payloadKey];
      results = results.concat(data);
      cursor = res.cursor;
    } else {
      error = res.error;
      console.log(error);
    }
  } while (!error && cursor);
  return results;
}

interface WebAPIPageError {
  error: string;
  isError: true;
}

interface WebAPIPageResult {
  page: any;
  cursor: string;
  isError: false;
}

async function getNextPageOfWebAPIResults({
  fn,
  query,
  cursor,
}: {
  fn: any;
  query: object;
  cursor?: string;
}): Promise<WebAPIPageError | WebAPIPageResult> {
  const payload = {
    limit: 200,
    cursor,
    ...query,
  };
  const page = await fn(payload);
  if (page.ok) {
    return {
      page,
      cursor: page.response_metadata?.next_cursor,
      isError: false,
    };
  }
  return { error: page.error, isError: true };
}
