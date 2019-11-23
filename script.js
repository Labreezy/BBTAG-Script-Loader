var base = Module.findBaseAddress("BBTAG.exe");
var target = base.add("0x153C50");
var callcount = 0;
var charId = "";
var scr_handles = [NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL];
var scr_sizes = [0, 0, 0, 0, 0, 0, 0, 0];
Interceptor.attach(target, function (args) {
    if (callcount == 0) {
        scr_handles = [NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL];
        scr_sizes = [0, 0, 0, 0, 0, 0, 0, 0];
    }
    if (callcount % 2 == 0) {
        charId = this.context.eax.sub(0x1C).readCString(3);
        send(charId)
    } else {
        charId += "ea";
        send(charId)
    }
    var scrData = recv('script', function (value) {
        if (value.payload) {
            scr_handles[callcount] = Memory.alloc(value.data.length + 0x100);
            scr_handles[callcount].writeByteArray(value.data);
            scr_sizes[callcount] = value.data.length;
        } else {
            scr_handles[callcount] = NULL;
            scr_sizes[callcount] = 0;
        }
    });
    scrData.wait();
    if (scr_sizes[callcount] != 0){
        this.context.eax = scr_handles[callcount];
        this.context.esp.add(4).writePointer(scr_handles[callcount]);
        this.context.esp.add(8).writeU32(scr_sizes[callcount]);
        console.log("Loaded 0x" + scr_sizes[callcount].toString(16) + " bytes for " + charId);
    }
    else {
        console.log("Skipped script for " + charId);
    }
    callcount = (callcount + 1) % 10
});