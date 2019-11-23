# BBTAG Script Loader

---

This program allows you to load in modified character scripts rebuilt from bbtools without modifying the filesystem.

Simply place the rebuilt file in the bbtag_scripts folder (don't rename it, just keep it as xxx(ea).bin).
After that, open BBTAG, then run the program.  Don't run the program first, it won't find BBTAG and exit.

While both BBTAG and this are running, if you have a script that matches, say, Noel's script name, then every time you load Noel into battle, the script file will be your custom one, not the default.

You will not get banned if you use this online.  The game will desync as soon as a modded action happens, since you're loading your script and they're loading the default.

However, if both scripts match 100%, it is possible to netplay these mods with your friends.

Additionally, if you modify a script file in the folder, then load again, your old script will be replaced with the new one.
Similarly, if you rename/delete a script file than load again, your old script will go back to default once loaded.

Repo link for bbtools: https://github.com/dantarion/bbtools