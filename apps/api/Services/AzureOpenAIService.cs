using Azure;
using Azure.AI.OpenAI;
using OpenAI.Chat;

namespace api.Services;

public class AzureOpenAIService
{
    private readonly ChatClient _chatClient;

    public AzureOpenAIService(IConfiguration config)
    {
        var endpoint = config["AzureOpenAI:Endpoint"] ?? throw new InvalidOperationException("AzureOpenAI:Endpoint is required");
        var apiKey = config["AzureOpenAI:ApiKey"] ?? throw new InvalidOperationException("AzureOpenAI:ApiKey is required");
        var deployment = config["AzureOpenAI:DeploymentName"] ?? "gpt-4o";

        var client = new AzureOpenAIClient(new Uri(endpoint), new AzureKeyCredential(apiKey));
        _chatClient = client.GetChatClient(deployment);
    }

    public async IAsyncEnumerable<string> StreamCopyAsync(string productName, string description)
    {
        var systemPrompt = """
            You are an expert SaaS marketing copywriter. Generate high-converting landing page copy.
            Format your response in this exact structure with these labels on separate lines:

            HEADLINE: [A punchy, benefit-focused headline under 10 words]
            TAGLINE: [A compelling subheadline that expands on the headline, 1-2 sentences]
            FEATURE_1: [First key benefit, starting with an action verb, under 15 words]
            FEATURE_2: [Second key benefit, starting with an action verb, under 15 words]
            FEATURE_3: [Third key benefit, starting with an action verb, under 15 words]
            CTA: [Call-to-action button text, 2-5 words]

            Be specific, benefit-driven, and avoid generic buzzwords.
            """;

        var userMessage = $"Product: {productName}\nDescription: {description}";

        var messages = new List<ChatMessage>
        {
            new SystemChatMessage(systemPrompt),
            new UserChatMessage(userMessage)
        };

        var options = new ChatCompletionOptions { MaxOutputTokenCount = 400 };

        await foreach (var chunk in _chatClient.CompleteChatStreamingAsync(messages, options))
        {
            foreach (var part in chunk.ContentUpdate)
            {
                if (!string.IsNullOrEmpty(part.Text))
                    yield return part.Text;
            }
        }
    }
}
