using System.Threading.Channels;

var channel = Channel.CreateUnbounded<string>();

_ = Task.Run(async () =>
{
    while (true)
    {
        var result = await channel.Reader.ReadAsync();
        Console.WriteLine(result);
    }
});

await channel.Writer.WriteAsync("Hello");
await channel.Writer.WriteAsync("Hello");
await channel.Writer.WriteAsync("Hello");
await channel.Writer.WriteAsync("Hello");

Console.ReadLine();

//  Mediator
