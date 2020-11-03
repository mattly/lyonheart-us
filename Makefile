dev:
	gatsby develop

clean:
	rm -rf public

build:
	gatsby build

run-deploy:
	../s3deploy \
 		-bucket lyonheart-us \
 		-region us-east-1 \
 		-distribution-id E3NC727W0A985S \
 		-source public

deploy: clean build run-deploy

.PHONY: clean deploy run-deploy
