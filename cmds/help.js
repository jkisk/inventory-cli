const menus = {
    main: `
      outside [command] <options>
  
      track .............. see if inventory holds out
      version ............ show package version
      help ............... show help menu for a command`,
  
    track: `
      inventory track -orders.json stock.json (REVISIT!!!)`
  }
  
  module.exports = (args) => {
    const subCmd = args._[0] === 'help'
      ? args._[1]
      : args._[0]
  
    console.log(menus[subCmd] || menus.main)
  }