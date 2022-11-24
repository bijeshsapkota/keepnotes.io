
document.body.style.backgroundImage = "url('bg.jpg')";

//console.log('welcome');
showNotes();
//if user adds note, add it to the localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
        }

    if (addTxt.value == ""){
        return false;
    }
    else{
    notesObj.push(myObj);
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    //console.log(notesObj);
    showNotes();
})

//function to show elements from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null ) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title text-dark">${element.title}</h5>
            <p class="card-text ">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary bg-secondary btn-sm">Delete Note</button>
        </div>
    </div>
    `;
    });
    let notesEle = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;

    }
    else {
        notesEle.innerHTML = `There is no notes. Add it from above.`;
      }
}


//function to delete a note
function deleteNote(index) {
    //  console.log('I am deleting', index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value;
    // console.log('Input event fired', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})