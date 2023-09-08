set -ex
[ "$1" == "--inner" ] && {
    cp -r /cdir/web/.webpack/* ./
    sh /cdir/entrypoint.sh caddy file-server --listen :8080
    exit 0
}

docker run -ti --rm \
-v ${PWD}:/cdir \
-p 8080:8080 \
caddy:2.5.2-alpine \
sh /cdir/$0 --inner $@
