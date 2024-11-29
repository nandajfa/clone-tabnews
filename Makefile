all:
	npm run dev

stop:
	npm run services:stop

test:
	npm run test:watch

clean:
	npm run services:down
