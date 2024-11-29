#!/bin/bash

HOOK_NAME="pre-commit"

HOOK_DIR=".git/hooks"

HOOK_CONTENT="#!/bin/bash

# Do not commit on error when zipping
set -e

echo 'Creating .xpi file'

(cd src && zip -r ../monospeed@m.haustein.xpi .)

if [ \$? -ne 0 ]; then
    echo 'Could not zip. Commit aborted.'
    exit 1
fi

git add monospeed@m.haustein.xpi

echo 'Successfull. Proceeding with commit.'
"

if [ ! -d "$HOOK_DIR" ]; then
    echo "Error: $HOOK_DIR not found. Cannot init $HOOK_NAME."
    exit 1
fi

HOOK_PATH="$HOOK_DIR/$HOOK_NAME"
echo "$HOOK_CONTENT" > "$HOOK_PATH"

chmod +x "$HOOK_PATH"

echo "Hook $HOOK_PATH initialized successfully."
