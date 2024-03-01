## Install Instructions
1. Make sure you have (Docker)[https://www.docker.com/] installed
2. Uncomment the appropriate line in docker-compose.yaml depending on your device
3. Navigate your command line to this folder and run `docker compose up -d`
4. You may have to add the ./volume to your docker file sharing resources
5. Connect to the db with your favorite client like (DBeaver)[https://dbeaver.io/]
6. When you want to spin down, run `docker compose down -v`

Commands:
```docker compose up -d```
```docker compose down -v```
