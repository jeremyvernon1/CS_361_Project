function compare() {
    const checkedArr = [];
    var checkedBoxes = document.querySelectorAll('input[name=mycheckboxes]:checked');
    // Get items that are clicked
    // Check if over 3
    // Route to new page
    window.location.href = "/sitePage3";
}

var checkedCount = 0;

checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
if (checkedCount > 3) {
    alert("Please select fewer airports.");
}
