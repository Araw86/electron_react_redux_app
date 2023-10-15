## Tools needed

1. cubemx to have database installed pan for path
2. yean 3.6.1
3. nodejs v18.16.0

## description

app splitted into _renderrer_ app and _main_ app.

### Renderer

the renderrer app is handling react and gui

### Main

the main app is handling background, connection to file system, downloading, updates, ...

## application behaviour

The application should create a finderCacheStore.json in _database_ folder. It is no stored on git.

## to run debug

1. call `yarn watch` to run wabpack compilatin for electron
2. call `yarn start` to run

## to build

for loal build call
`yarn build_dist`

for github release
`yarn build_dist_github`
