using api.Models;
using api.Services;
using System.Text.Json;

namespace api.Endpoints;

public static class CopyEndpoints
{
    public static void MapCopyEndpoints(this WebApplication app)
    {
        app.MapPost("/api/copy/stream", async (CopyRequest request, AzureOpenAIService aiService, HttpResponse response) =>
        {
            if (string.IsNullOrWhiteSpace(request.ProductName) || string.IsNullOrWhiteSpace(request.Description))
                return Results.BadRequest(new { error = "ProductName and Description are required." });

            response.Headers.ContentType = "text/event-stream";
            response.Headers.CacheControl = "no-cache";
            response.Headers.Connection = "keep-alive";

            try
            {
                await foreach (var token in aiService.StreamCopyAsync(request.ProductName, request.Description))
                {
                    var data = JsonSerializer.Serialize(new { token });
                    await response.WriteAsync($"data: {data}\n\n");
                    await response.Body.FlushAsync();
                }

                await response.WriteAsync("data: [DONE]\n\n");
                await response.Body.FlushAsync();
            }
            catch (Exception ex)
            {
                var error = JsonSerializer.Serialize(new { error = ex.Message });
                await response.WriteAsync($"data: {error}\n\n");
                await response.Body.FlushAsync();
            }

            return Results.Empty;
        });

        app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }));
    }
}
