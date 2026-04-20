using api.Endpoints;
using api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins("http://localhost:3000", "https://neuralcopy.dev")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddSingleton<AzureOpenAIService>();

var app = builder.Build();

app.UseCors();
app.MapCopyEndpoints();

app.Run();
