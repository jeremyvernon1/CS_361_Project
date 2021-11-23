var checkedCount = 0;

checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
if (checkedCount > 3) {
    alert("Please select fewer airports.");
}
