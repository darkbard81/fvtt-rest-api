/// <reference types="@league-of-foundry-developers/foundry-vtt-types" />
Hooks.once("ready", () => {
  const expressApp = (game as any).server?.app;
  if (!expressApp) {
    console.warn("FVTT REST API: Express app not found");
    return;
  }

  const worldId = game.world.id;

  function checkKey(req: any, res: any, next: any) {
    const key = req.headers["x-api-key"];
    if (key === worldId) return next();
    return res.status(401).json({ error: "Invalid API key" });
  }

  expressApp.get("/api/hello", checkKey, (_req: any, res: any) => {
    res.json({ message: "Hello from FVTT!", world: worldId });
  });
});
