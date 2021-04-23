// Import node modules.
import fs from 'fs';
import path from 'path';

// Import parser and test suite.
import { Parser } from 'acorn'
import ava from 'ava'

// Import library.
import stripSymbolDescription from '../src/index.js'

const directoryPath = path.dirname(import.meta.url).substring(7)
const directoryPathInput = path.join(directoryPath, 'input')
const directoryPathOutput = path.join(directoryPath, 'output')
// Get files in input directory.
fs.readdir(directoryPathInput, function (error, files) {
  if (error) {
    throw error
  }

  // Test each file.
  files.forEach(function (fileName) {
    if (!fileName.endsWith('.js')) {
      return
    }

    // Read input and output.
    const input = fs.readFileSync(path.join(directoryPathInput, fileName), 'utf-8')
    const outputExpected = fs.readFileSync(path.join(directoryPathOutput, fileName), 'utf-8')

    // Convert input and compare to expected output.
    ava(fileName, (test) => {
      const output = stripSymbolDescription()
        .transform.call(
          {
            parse: (code) => Parser.parse(code, {
              sourceType: 'module',
              ecmaVersion: 2020,
            })
          },
          input,
          fileName
        )

      if (!output) {
        test.fail('No output given')
        return
      }
      test.is(output.code, outputExpected)
    })
  });
});
