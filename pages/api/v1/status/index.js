import { createRouter } from "next-connect";
import database from "infra/database.js";
import controller from "infra/controller.js";
import authorization from "models/authorization.js";

const router = createRouter();

router.use(controller.injectAnonymousOrUser);
router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const userTryingToGet = request.context.user;
  const updatedAt = new Date().toISOString();

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


  const statusObject = {
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: parseInt(dbMaxConnectionValue),
        opened_connections: dbOpenedConnectionsValue,
      }
  }
  };

  const secureOutputValues = authorization.filterOutput(userTryingToGet, "read:status", statusObject);
  response.status(200).json(secureOutputValues);
}
