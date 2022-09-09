# note app

## Monorepo structure
```
-- apps /directory contains all applications  
    - api  - rest api - microp/typegoose
    - site - react/redux app
...
```

- Clone this repo
- open a terminal in this repository root

``` shell
    # at project root

    $ pnpm install

    cd apps/api
    pnpm dev

    cd apps/site
    pnpm dev

```
- visit http://localhost:5171

#todo use a Layer 7 reverse proxy with docker network

___
licence MIT