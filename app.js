console.log('welcome to notes taking app!!')
showNotes();


// to add to the local storage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener(
    'click', function (e) {
        let addtxt = document.getElementById('addtxt');
        let addtitle = document.getElementById('addtitle');
        let notes = localStorage.getItem('notes');
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        let myObj = {
            tilte : addtitle.value,
            text : addtxt.value
        }
        notesObj.push(myObj); //notes obj is array of object
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addtxt.value = "";
        addtitle.value = "";
        // console.log(notesObj);
        showNotes();
    }
);

// display the notes array into the cards
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html = html + `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${index+1}. ${element.tilte}</h5>
                        <p class="card-text">${element.text}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>
            `;
    });
    let notesEle = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    }
    else {
        notesEle.innerHTML = `<strong>Nothing to Show</strong>`;
    }
}


//function to delete note
function deleteNote(index) {
    // console.log('deleteing',index);
    let notes = localStorage.getItem('notes');
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


// seaarching an ele
let search = document.getElementById('searchtxt');
search.addEventListener('input', function () {

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let tilteTxt = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputVal) || tilteTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });

}
);


//delete all button 
let del = document.getElementById('del_btn');
del.addEventListener(
    'click',function(){
        localStorage.clear();
        showNotes();
    }
);






