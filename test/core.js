// const node modules.
const fs = require('fs');
const path = require('path');

// const parser and test suite.
const { Parser } = require('acorn')
const ava = require('ava')

// const library.
const stripSymbolDescription = require('..')

const directoryPath = path.resolve(path.dirname(__dirname), 'test')
const directoryPathInput = path.resolve(directoryPath, 'input')
const directoryPathOutput = path.resolve(directoryPath, 'output')
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
