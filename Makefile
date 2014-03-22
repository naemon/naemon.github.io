

test:
	bundle exec jekyll serve & SPID=$$!;  \
		./t/test_website.pl http://localhost:4000; \ 
		RC=$$?; \
		kill -9 $$SPID; \
		exit $$RC
