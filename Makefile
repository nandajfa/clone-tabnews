all:
	npm run dev

stop:
	npm run services:stop

test:
	npm run test:watch -- migrations

clean:
	npm run services:down
