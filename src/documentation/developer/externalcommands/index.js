function _update_cmd_filter(val) {
    if(val == "") {
        document.querySelectorAll("DIV.js-command").forEach((el) => {
            el.style.display = "";
        });
        return;
    }
    document.querySelectorAll("DIV.js-command").forEach((el) => {
        el.style.display = "none";
    });
    document.querySelectorAll("DIV.js-command."+val).forEach((el) => {
        el.style.display = "";
    });
    return;
}
