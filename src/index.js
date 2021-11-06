const fs = require('fs')

require('yargs')
  .demandCommand()
  .strict()
  .help()
  .command(
    '$0 [filename]',
    'Creates a default Excalidraw SVG file',
    {
      filename: {
        type: 'string',
        default: 'diagram.svg',
        describe: 'The name of the file to create',
      },
      y: {
        type: 'boolean',
        default: false,
        describe: 'Overwrite existing file',
      },
    },
    async (args) => {
      const data = fs.readFileSync(require.resolve('../fixtures/default.svg'))
      try {
        fs.writeFileSync(args.filename, data, { flag: args.y ? 'w' : 'wx' })
        console.log(args.filename)
      } catch (error) {
        if (error.code === 'EEXIST') {
          console.error(`${args.filename} already exists`)
          process.exitCode = 1
          return
        }
        throw error
      }
    },
  )
  .parse()
