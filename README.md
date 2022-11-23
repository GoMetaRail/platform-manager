# Platform Manager

This app uses AWS Amplify to deploy the front and back end

## Setup git hooks
```
git config core.hooksPath .githooks
chmod u+x .githooks/*
```

## Setup .env (customize as needed)
```
cp .env.example .env
```

## Sync Staging DB with Prod
# Install ddb-sync
go get github.com/instructure/ddb-sync

# Run sync script
ddb-sync --config-file=ddb-sync/prod-to-stage.yml
```
```

## Amplify codegen
To generate graphql queries and objects, customize the following files and change `../gometarail/` with your relative path to a local clone of the gometarail repo:
* .graphqlconfig.javascript.yml
* .graphqlconfig.typescript.yml

Then run the following script (instead of `amplify codegen`) to generate the files
```
npm run codegen
```
Now you can go to your local gometarail repo and commit the changes.