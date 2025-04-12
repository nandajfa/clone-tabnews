import { createRouter } from "next-connect";
import database from "infra/database.js";
import controller from "infra/controller.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const dbVersion = await database.query("SHOW server_version;");
  const dbVersionValue = dbVersion.rows[0].server_version;

  const dbMaxConnection = await database.query("SHOW max_connections;");
  const dbMaxConnectionValue = dbMaxConnection.rows[0].max_connections;

  const dbName = process.env.POSTGRES_DB;
  const dbOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dbName],
  });
  const dbOpenedConnectionsValue = dbOpenedConnections.rows[0].count;

  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: parseInt(dbMaxConnectionValue),
        opened_connections: dbOpenedConnectionsValue,
      },
    },
  });
}
