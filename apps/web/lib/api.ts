const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export interface CopyResult {
  headline: string;
  tagline: string;
  features: string[];
  cta: string;
}

export async function streamCopy(
  productName: string,
  description: string,
  onToken: (token: string) => void,
  onDone: () => void,
  onError: (error: string) => void
): Promise<void> {
  const response = await fetch(`${API_URL}/api/copy/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productName, description }),
  });

  if (!response.ok) {
    onError(`Request failed: ${response.statusText}`);
    return;
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) {
    onError("No response body");
    return;
  }

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") {
        onDone();
        return;
      }
      try {
        const parsed = JSON.parse(data);
        if (parsed.token) onToken(parsed.token);
        if (parsed.error) onError(parsed.error);
      } catch {
        // skip malformed chunks
      }
    }
  }
  onDone();
}
