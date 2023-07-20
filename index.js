import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://kudos-1201b-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const kudosListInDB = ref(database, "kudosList")

const recipient = document.getElementById("recipient")
const inputEl = document.getElementById("input")
const sender = document.getElementById("sender")
const date = document.getElementByIt("date")
const submitBtn = document.getElementById("submit")
const kudos = document.getElementById("kudos")

submitBtn.addEventListener("click", function() {
    let recipientValue = recipient.value
    let inputValue = inputEl.value
    let senderValue = sender.value
    let dateValue = date.value
    let kudosValues = recipientValue + ", " + inputValue + " - " + senderValue + ", " + dateValue

    push(kudosListInDB, kudosValues)

    clearInputField()
})

onValue(kudosListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let commentsArray = Object.entries(snapshot.val())
    
        clearKudos()
        
        for (let i = 0; i < commentsArray.length; i++) {
            let currentComment = commentsArray[i]
            let currentCommentID = currentComment[0]
            let currentCommentValue = currentComment[1]
            
            appendCommentToKudos(currentComment)
        }    
    } else {
        kudos.innerHTML = "No kudos here ... yet"
    }
})

function clearKudos() {
    kudos.innerHTML = ""
}

function clearInputField() {
    inputEl.value = ""
}

function appendCommentToKudos(comment) {
    let commentID = comment[0]
    let commentValue = comment[1]

    let newEl = document.createElement("li")

    newEl.textContent = commentValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `kudosList/${commentID}`)

        remove(exactLocationOfItemInDB)
    })

    kudos.prepend(newEl)
}