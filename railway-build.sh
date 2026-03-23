#!/bin/bash
# Railway build script for API server

echo "Installing dependencies..."
pnpm install --frozen-lockfile

echo "Building API server..."
pnpm --filter @workspace/api-server run build

echo "Build complete!"
