const menus = {
    main: `
      inventory [command] 
  
      track .............. check if inventory holds out
      version ............ show package version
      help ............... show help menu for a command`,
  
    track: `
      inventory track <file one> <file two>`
  }
  
  module.exports = (args) => {
    const subCmd = args._[0] === 'help'
      ? args._[1]
      : args._[0]
  
    console.log(menus[subCmd] || menus.main)
  }