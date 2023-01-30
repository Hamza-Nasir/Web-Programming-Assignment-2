var filters = ["brightness-button", "saturation-button", "inversion-button", "grayscale-button"]
var filterHeadings = ["Brightness", "Saturation", "Inversion", "Grayscale"]
var filterValues = [100, 100, 0, 0]
var selectedElement = 0;
var imageFlippedValue = 0;

function mod(n, m) {
    return ((n % m) + m) % m;
}

function rotateLeft() {
    imageFlippedValue -= 90
    imageFlippedValue = mod(imageFlippedValue, 360);

    let img = document.getElementById("selected-image");
    let container = document.getElementById("image-container");

    img.style.transform = `rotate(${imageFlippedValue}deg)`;

    // document.getElementById("image-container").style.transform = `rotate(${imageFlippedValue}deg)`;
    // img.style.maxHeight = container.offsetWidth + 'px';


}

function rotateRight() {
    imageFlippedValue += 90
    imageFlippedValue = mod(imageFlippedValue, 360);

    let img = document.getElementById("selected-image");

    img.style.transform = `rotate(${imageFlippedValue}deg)`;
    // document.getElementById("image-container").style.transform = `rotate(${imageFlippedValue}deg)`;
}

function resetFilters() {
    filterValues = [100, 100, 0, 0]

    document.getElementById("slider-value").innerHTML = filterValues[selectedElement];
    document.getElementById("rangeSlider").value = filterValues[selectedElement];

    document.getElementById("selected-image").style.filter = `brightness(${filterValues[0]}%) saturate(${filterValues[1]}%) invert(${filterValues[2]}%) grayscale(${filterValues[3]}%)`;
}

function setFilterValue() {
    var slider = document.getElementById('rangeSlider');
    slider.addEventListener('input', sliderChange);

    function sliderChange() {
        document.getElementById("slider-value").innerHTML = this.value;
        filterValues[selectedElement] = this.value;

        if (selectedElement == 0) {
            document.getElementById("selected-image").style.filter = `brightness(${this.value}%) saturate(${filterValues[1]}%) invert(${filterValues[2]}%) grayscale(${filterValues[3]}%)`;
        } else if (selectedElement == 1) {
            document.getElementById("selected-image").style.filter = `brightness(${filterValues[0]}%) saturate(${this.value}%) invert(${filterValues[2]}%) grayscale(${filterValues[3]}%)`;
        } else if (selectedElement == 2) {
            document.getElementById("selected-image").style.filter = `brightness(${filterValues[0]}%) saturate(${filterValues[1]}%) invert(${this.value}%) grayscale(${filterValues[3]}%)`;
        } else if (selectedElement == 3) {
            document.getElementById("selected-image").style.filter = `brightness(${filterValues[0]}%) saturate(${filterValues[1]}%) invert(${filterValues[2]}%) grayscale(${this.value}%)`;
        }
    }
}

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
        
        filterValues = [100, 100, 0, 0]
        imageFlippedValue = 0
        document.getElementById("selected-image").style.transform = `rotate(0deg)`;
        resetFilters();
    });
    input.click();
}

function chooseFilter(itemNo) {
    if (itemNo === selectedElement) {
        return
    }

    if (itemNo != 0) {
        document.getElementById("rangeSlider").max = 100
    } else {
        document.getElementById("rangeSlider").max = 200
    }

    newItem = document.getElementById(filters[itemNo])
    oldItem = document.getElementById("selected-filter-button")

    oldItem.id = filters[selectedElement]
    newItem.id = "selected-filter-button";

    selectedElement = itemNo;

    // Setting the name for the slider to also display
    sliderHeading = document.getElementById("filter-name")
    sliderHeading.innerHTML = filterHeadings[selectedElement]

    document.getElementById("slider-value").innerHTML = filterValues[selectedElement];
    document.getElementById("rangeSlider").value = filterValues[selectedElement];
}