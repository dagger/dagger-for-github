```console
dagger init
cp ~/.config/dagger/keys.txt .
dagger new ci -p ./ci
mkdir -p ./ci
dagger query
dagger up --no-cache --log-format plain
```
