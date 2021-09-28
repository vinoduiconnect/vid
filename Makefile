.PHONY: help

help:
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


serve-static: ## serve a statically build Gridsome site
	python3 -m http.server

dev: ## gridsome develop
	gridsome develop

build: ## gridsome build
	gridsome build

load-build:
	cd __build && python3 -m http.server
