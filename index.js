document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("foo").addEventListener("click", () => {
        alert("ソースコードに移動しますん");
        location.href = "https://github.com/Takenoko-II/Takenoko-II.github.io";
    });
});
