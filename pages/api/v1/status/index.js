import database from "infra/database.js";
import { InternalServerError } from "infra/errors.js";

async function status(request, response) {
  try {
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
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });

    console.log("\n Erro dentro do catch do controller");
    console.log(publicErrorObject);
    response.status(500).json(publicErrorObject);
  }
}

export default status;
