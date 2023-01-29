function chooseImage() {
    const input = document.getElementById("file-input");
    input.addEventListener("change", function() {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = function() {
            const img = document.getElementById("selected-image");
            img.src = reader.result;
        }
        reader.readAsDataURL(file);

        const filterBox = document.getElementsByClassName("filter-container")[0]
        const imageBox = document.getElementsByClassName("image-container")[0]

        filterBox.style.display = "block";
        imageBox.style.display = "block";
    });
    input.click();
}

