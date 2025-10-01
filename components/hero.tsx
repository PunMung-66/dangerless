export function Hero() {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        Welcome to <span className="text-primary">Dangerless</span>
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
        An application for providing travelers with real-time neighborhood
        safety ratings and local safety news alerts.
      </p>
    </div>
  );
}
