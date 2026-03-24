import { Elysia } from "elysia";
import { startConsumer } from "./consumer";
import { addClient, removeClient } from "./realtime";

const app = new Elysia()
  .get("/health", () => ({ status: "ok", service: "notification-service" }))
  .ws("/ws", {
    open(ws) {
      addClient(ws);

      ws.send(
        JSON.stringify({
          type: "connection",
          message: "Connected to SuiLens notification stream",
          timestamp: new Date().toISOString(),
        }),
      );
    },
    close(ws) {
      removeClient(ws);
    },
  })
  .listen(3003);

startConsumer().catch(console.error);

console.log(`Notification Service running on port ${app.server?.port}`);
