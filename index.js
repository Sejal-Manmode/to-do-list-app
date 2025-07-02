const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");

item.addEventListener(
    "keyup",
    function(event){
        if(event.key == "Enter"){
            addItem(this.value);
            this.value = "";
        }
    }
)

function addItem(data){
    const listItem = document.createElement("li");
    if(data === ""){
        alert("Cannot add empty value");
        listItem = "";
    }

    listItem.innerHTML = `
        ${data}
        <i class="fa-solid fa-xmark"></i>
    `;

    listItem.addEventListener(
        "click",
        function(){
            this.classList.toggle("done");
        }
    )

    listItem.querySelector("i").addEventListener(
        "click",
        function(){
            listItem.remove();
            saveItem();
        }
    )

    toDoBox.append(listItem);
    saveItem();
}
function saveItem(){
const tasks = document.querySelectorAll("li");
  const item = [];
  tasks.forEach((task) => {
    item.push(task.textContent.trim()); // trim() to remove extra whitespace
  });
  console.log(item);
  if (item.length === 0) {
    localStorage.removeItem("tasks");
  } else {
    localStorage.setItem("tasks", JSON.stringify(item));
  }
}

//Self Calling Function
(
    function(){
        const lsItem = JSON.parse(localStorage.getItem("tasks") || "[]");
            lsItem.forEach((lsItem)=>{
                addItem(lsItem);
        });
        console.log(lsItem);
    }
)()