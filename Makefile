SUBDIRS = configs middlewares app
.PHONY: subdirs $(SUBDIRS)
subdirs: $(SUBDIRS)

pkg:
	npx exoskeleton config --force
	npx exoskeleton middleware --force
	rm -rf package
	tsc --project tsconfig.json
	npx tscpaths -p tsconfig.json -s . -o ./package
	rm -rf package/exoskeleton.config.js
	rm -rf package/exoskeleton.config.js.map
	cp -R config package/
	cp -R app/views package/app/
	cp README.md package/
	cp LICENSE package/

rc: pkg
	node ./scripts/pkg.rc.js

publish: pkg
	node ./scripts/pkg.build.js
