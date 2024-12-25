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

lintfix:
	npm run lint:prettier:fix

comm:
	npm run commit

fclean:
	docker system prune -a
