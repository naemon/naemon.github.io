TESTPORT=4001

test:
	bundle exec jekyll serve & SPID=$$!;  \
		sleep 10; \
		TESTEXPECT=Naemon TESTTARGET=http://localhost:$(TESTPORT) PERL_DL_NONLAZY=1 perl -MExtUtils::Command::MM -e "test_harness(0)" t/*.t; \
		RC=$$?; \
		kill -9 $$SPID; \
		exit $$RC
