all:
	docker compose -f infra/compose.yaml up -d

clean:
	docker compose -f infra/compose.yaml down --volumes --remove-orphans
