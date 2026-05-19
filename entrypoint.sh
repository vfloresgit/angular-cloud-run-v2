#!/bin/sh

# Fail on any error
set -e

# The directory where the Angular app is served
APP_DIR="/usr/share/nginx/html"

# Create the config.json file
# The value of ENVIRONMENT_NAME will be passed in from the Cloud Run service
# If the variable is not set, use a default value
cat > ${APP_DIR}/config.json <<EOF
{
  "environmentName": "${ENVIRONMENT_NAME:-default}"
}
EOF

# Echo the config for debugging purposes
echo "Generated config.json:"
cat ${APP_DIR}/config.json

# Execute the CMD from the Dockerfile
exec "$@"
