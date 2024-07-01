document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("foo").addEventListener("click", () => {
        if (confirm("ソースコードに移動しますん")) {
            location.href = "https://github.com/Takenoko-II/Takenoko-II.github.io";
        }
        else {
            alert("キャンセルしたってことよ");
        }
    });
});
