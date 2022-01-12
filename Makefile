build:
	docker build -t "server-sdc" ./

run:
	docker run -d -p 5001:5001 server-sdc


docker cp answers.csv 7123c4857b42:/
docker cp answers_photos.csv 7123c4857b42:/