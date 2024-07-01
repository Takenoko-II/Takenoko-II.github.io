document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("foo").addEventListener("click", () => {
        alert(Date.now().toString());
    });
});
