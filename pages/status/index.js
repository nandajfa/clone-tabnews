import useSwr from "swr";
import styles from "./StatusPage.module.css";

async function fetchApi(key) {
  const response = await fetch(`${key}`);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </div>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSwr("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }
  return (
    <div className={styles.updatedAtContainer}>
      <span className={styles.emoji}>🕒</span>
      <div className={styles.updatedText}>
        <strong>Última atualização:</strong> {updatedAtText}
      </div>
    </div>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSwr("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  if (isLoading || !data) {
    return <div className={styles.status}>Carregando status...</div>;
  }

  return (
    <div className={styles.statusGrid}>
      <div className={styles.statusCard}>
        <span className={styles.emoji}>🔗</span>
        <h3>Max Connections</h3>
        <p>{data.dependencies.database.max_connections}</p>
      </div>
      <div className={styles.statusCard}>
        <span className={styles.emoji}>⚡</span>
        <h3>Opened Connections</h3>
        <p>{data.dependencies.database.opened_connections}</p>
      </div>
      <div className={styles.statusCard}>
        <span className={styles.emoji}>📦</span>
        <h3>Versão</h3>
        <p>{data.dependencies.database.version}</p>
      </div>
    </div>
  );
}
