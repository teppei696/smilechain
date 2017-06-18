// This is a JavaScript file
    function selectAlbum(int) {
        localStorage.setItem('select', int);
        location.href = "index.html";
    }
    function settingDialog() {
        userid = window.prompt("input user id", userid);
    }
