all:
	npm run dev

stop:
	npm run services:stop

test:
	npm run test:watch -- migrations

clean:
	npm run services:down

lint:
	npm run lint:prettier:check

lintc:
	npm run lint:prettier:fix

fclean:
	docker system prune -a
