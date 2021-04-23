import { walk } from 'estree-walker'
import MagicString from 'magic-string'
import { createFilter } from '@rollup/pluginutils'

const whitespace = /\s/

export default function (options = {}) {
  // Overwrite default options and deconstruct them.
  const {
    exclude,
    include,
    sourceMap,
  } = Object.assign({
    exclude: null,
    include: '**/*.js',
    sourceMap: false,
  }, options)

  // Create filter.
  const filter = createFilter(include, exclude)

  return {
    name: 'strip-symbol-description',

    transform (code, id) {
      if (!filter(id)) {
        return null
      }

      let ast, edited = false

      try {
        ast = this.parse(code)
      } catch (error) {
        error.message += ` in ${id}`
        throw error
      }

      const magicString = new MagicString(code)

      const remove = function (start, end) {
        while (whitespace.test(code[start - 1])) {
          start -= 1
        }
        magicString.remove(start, end)
      }

      const isBlock = function (node) {
        return node && (node.type === 'BlockStatement' || node.type === 'Program')
      }

      const removeStatement = function (node) {
        if (isBlock(node.parent)) {
          remove(node.start, node.end)
        } else {
          magicString.overwrite(node.start, node.end, '')
        }

        edited = true
      }

      walk(ast, {
        enter (node, parent) {
          Object.defineProperty(node, 'parent', {
            value: parent,
            enumerable: false,
            configurable: true
          })

          if (sourceMap) {
            magicString.addSourcemapLocation(node.start)
            magicString.addSourcemapLocation(node.end)
          }

          // Check if symbol call.
          if (node.type !== 'CallExpression' || !node.callee || node.callee.name !== 'Symbol') {
            return
          }

          // Remove contents.
          for (const argument of node.arguments) {
            removeStatement(argument)
          }

          // Node is done so we skip!
          this.skip();
        },
      })

      if (!edited) {
        return null
      }

      return {
        code: magicString.toString(),
        map: sourceMap ? magicString.generateMap() : null,
      }
    },
  }
}
