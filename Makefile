dev: clean
	gatsby develop

clean:
	gatsby clean

build: clean
	gatsby build

run-deploy:
	../s3deploy \
 		-bucket lyonheart-us \
 		-region us-east-1 \
 		-distribution-id E3NC727W0A985S \
 		-source public

deploy: build run-deploy

.PHONY: clean deploy run-deploy
