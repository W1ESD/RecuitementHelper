.PHONY: up down restart logs ps clear build

up:
	@sudo docker-compose up --build

down:
	@sudo docker-compose down

restart:
	@sudo docker-compose restart

logs:
	@sudo docker-compose logs -f

ps:
	@sudo docker-compose ps

clear:
	@sudo docker-compose down -v --rmi all --remove-orphans

build:
	@sudo docker-compose build