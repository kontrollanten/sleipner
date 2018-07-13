# Sleipner - Blazing fast dev docs (alpha)
Icon made by [Freepik](http://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)

# Development

## Installation
```
yarn
```

## Run development environment
The following command will start `webpack-dev-server` and `electron`. `webpack-dev-server` will be ran inside the renderer process. The renderer process will be prepared with:
* HMR
* [React Developer Tools](https://github.com/facebook/react-devtools)
* [Redux DevTools chrome extension](https://github.com/zalmoxisus/redux-devtools-extension)
```
yarn dev
```

## Run production built renderer in electron
The following will build renderer into production and then run it with the `electron` cmd. An easier way to verify renderer production build.
```
yarn start
```

## Code validation

### Linting
```
yarn lint #both js and style linting
```
or
```
yarn lint:js
```
or
```
yarn lint:style
```

### Unit testing
```
yarn test
```
or
```
yarn test:main
```
or
```
yarn test:renderer
```
or
```
yarn test:renderer --watch
```

## Commiting
Commits are linted with [commitlint](https://github.com/marionebl/commitlint) with [conventional change](https://conventionalcommits.org/) rules. It's easiest to use the following command to commit your changes:
```
yarn git-cz
```
