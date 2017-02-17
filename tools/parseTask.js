#!/usr/bin/env node

// Usage:
// cat three-steps-forward.md | node ./tools/parseTask.js

const readline = require('readline');
const flocs = require('../lib/flocs-node.js');

process.stdin.on('data', function(buffer) {
  const text = buffer.toString();
  const task = flocs.parseTaskSourceText(text);
  console.log(JSON.stringify(task));
});
