FRONTEND_PATH = --prefix application

install:
	npm install $(FRONTEND_PATH)

run:
	npm run dev $(FRONTEND_PATH)

update:
	npm update $(FRONTEND_PATH)

build:
	npm run build $(FRONTEND_PATH)

test:
	npm test $(FRONTEND_PATH)

storybook:
	npm run storybook $(FRONTEND_PATH)
