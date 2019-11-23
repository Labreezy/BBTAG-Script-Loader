import os, frida, sys

if not os.path.exists("bbtag_scripts"):
    os.makedirs("bbtag_scripts")

session = frida.attach("BBTAG.exe")
script = session.create_script(open("script.js").read())

def on_message(message, data):
    if message["type"] == "error":
        print(message)
        print("PLEASE HIT ENTER ON WINDOW UNTIL EXIT, ERROR OCCURED")
        session.detach()
        sys.exit(-1)
    else:
        filepath = "bbtag_scripts/scr_" + message["payload"] + ".bin"
        if os.path.exists(filepath):
            scr_data = open(filepath, "rb").read()
            script.post({'type': 'script', 'payload': True, 'data': [b for b in scr_data]})
        else:
            script.post({'type': 'script', 'payload': False})

script.on("message", on_message)
script.load()
print("Press enter to exit.")
sys.stdin.read()