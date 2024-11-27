all:
	docker compose -f infra/compose.yaml up

clean:
	docker compose down
