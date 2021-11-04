GEM_HOME=.gem
TESTPORT=4001

.PHONY: .gem

quick: .gem
	JEKYLL_ENV=local NOCLEAN=1 bundle exec bash -c "time jekyll build --trace --limit_posts=15"

build: .gem
	bundle exec jekyll build --trace --limit_posts=5

server: .gem
	bundle exec jekyll serve --host=\* --trace --watch

.gem:
	# sudo apt-get install ruby ruby-dev ruby-bundler nodejs libmagickcore-dev libmagickwand-dev libreadline-gplv2-dev zlib1g-dev
	bundle config set path '.gem'
	bundler install --path $(GEM_HOME)
	bundler update

test: .gem
	NOCLEAN=1 bundle exec jekyll serve --port=$(TESTPORT) & SPID=$$!;  \
		for i in $$(seq 100); do if lsof -i:$(TESTPORT) >/dev/null 2>&1; then break; else sleep 0.3; fi done; \
		TESTEXPECT=Naemon TESTTARGET=http://localhost:$(TESTPORT) PERL_DL_NONLAZY=1 perl -MExtUtils::Command::MM -e "test_harness(0)" t/*.t; \
		RC=$$?; \
		kill -9 $$SPID; \
		exit $$RC

localtest: _site
	TESTEXPECT=Naemon TESTTARGET=file://$(shell pwd)/_site/ PERL_DL_NONLAZY=1 perl -MExtUtils::Command::MM -e "test_harness(0)" t/*.t

clean:
	rm -rf _site
