# Cricket Scoreboard

This is a webapp that scores a game of Cricket. (The darts game.)

You run it with Docker.

## Production

```
docker build -t cricketscoreboard ~/code/go/src/github.com/sirsean/cricketscoreboard
docker stop cricketscoreboard
docker rm cricketscoreboard
docker run -p 7676:80 --name cricketscoreboard -d cricketscoreboard
docker logs -f --tail=20 cricketscoreboard
```

## Development

```
./build.sh
docker build -t cricketscoreboard .
docker run -p 7676:80 --name cricketscoreboard --rm cricketscoreboard
```
