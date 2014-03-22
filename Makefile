

test:
	bundle exec jekyll serve -B
	./t/test_website.pl http://localhost:4000; RC=$$?; kill -9 $$(ps auxww | grep "jekyll serve -B" | grep -v grep | awk '{print $$2}'); exit $$RC
