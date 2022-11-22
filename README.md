# Platform Manager

This app uses AWS Amplify to deploy the front and back end

## Setup git hooks
git config core.hooksPath .githooks
chmod u+x .githooks/*

## Setup .env (customize as needed)
cp .env.example .env

## Sync Staging DB with Prod
```
# Install ddb-sync
go get github.com/instructure/ddb-sync

# Run sync script
ddb-sync --config-file=ddb-sync/prod-to-stage.yml
```