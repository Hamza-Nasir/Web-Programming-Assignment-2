var filters = ["brightness-button", "saturation-button", "inversion-button", "grayscale-button"]
var filterHeadings = ["Brightness", "Saturation", "Inversion", "Grayscale"]
var selectedElement = 0;

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

function chooseFilter(itemNo) {
    if (itemNo === selectedElement) {
        return
    }

    newItem = document.getElementById(filters[itemNo])
    oldItem = document.getElementById("selected-filter-button")

    oldItem.id = filters[selectedElement]
    newItem.id = "selected-filter-button";

    selectedElement = itemNo;

    // Setting the name for the slider to also display
    sliderHeading = document.getElementById("filter-name")
    sliderHeading.innerHTML = filterHeadings[selectedElement]
}