set -ex
[ "$1" == "--inner" ] && {
    corepack enable
    yarn install --immutable
    yarn run web:build:prod
    exit 0
}

docker run -ti --rm \
-v ${PWD}:/cdir \
-w /cdir \
node:16 \
bash ./$0 --inner $@
