GEM=gem
JEKYLL := $(shell which jekyll)
ifndef JEKYLL
	GEM_HOME=.gem
	JEKYLL=$(GEM_HOME)/bin/jekyll
else
	GEM_HOME=
endif
TESTPORT=4001

quick: .gem
	GEM_HOME=$(GEM_HOME) JEKYLL_ENV=local NOCLEAN=1 bash -c "time $(JEKYLL) build --trace --limit_posts=15"

build: .gem
	GEM_HOME=$(GEM_HOME) $(JEKYLL) build --trace

server: .gem
	GEM_HOME=$(GEM_HOME) $(JEKYLL) serve --host=\* --trace --watch

.gem:
	# apt-get install libmagickcore-dev libmagickwand-dev
	#GEM_HOME=$(GEM_HOME) $(GEM) install jekyll

test: .gem
	GEM_HOME=$(GEM_HOME) NOCLEAN=1 $(JEKYLL) serve --port=$(TESTPORT) & SPID=$$!;  \
		for i in $$(seq 100); do if lsof -i:$(TESTPORT) >/dev/null 2>&1; then break; else sleep 0.3; fi done; \
		TESTEXPECT=Naemon TESTTARGET=http://localhost:$(TESTPORT) PERL_DL_NONLAZY=1 perl -MExtUtils::Command::MM -e "test_harness(0)" t/*.t; \
		RC=$$?; \
		kill -9 $$SPID; \
		exit $$RC

localtest: _site
	TESTEXPECT=Naemon TESTTARGET=file://$(shell pwd)/_site/ PERL_DL_NONLAZY=1 perl -MExtUtils::Command::MM -e "test_harness(0)" t/*.t

clean:
	rm -rf _site
