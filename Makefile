clean:
	rm -rf public

deploy: clean
	gatsby build
	s3deploy \
 		-bucket lyonheart-us \
 		-region us-east-1 \
 		-distribution-id E3NC727W0A985S \
 		-source public

.PHONY: clean dev deploy setup
