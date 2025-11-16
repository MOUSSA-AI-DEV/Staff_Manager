const STAFF = []

let addBtn = document.getElementById("btn-open-modal")
let ModaleEmploye = document.getElementById("modal")


addBtn.addEventListener("click", (e) => {
    ModaleEmploye.classList.remove("hidden")
    console.log(ModaleEmploye)
})


let empName = document.getElementById("empName")
let empRole = document.getElementById("empRole")
let empEmail = document.getElementById("empEmail")
let empPhone = document.getElementById("empPhone")
let empPhoto = document.getElementById("empPhoto")

let addExp = document.getElementById("addExp")
let expList = document.getElementById("expList")
let expInput = document.getElementById("expInput");









let closeModal = document.getElementById("closeModal")
closeModal.addEventListener("click", (e) => {
    ModaleEmploye.classList.add("hidden")

})
let saveEmployee = document.getElementById("saveEmployee")

const inputs = [
    empName,
    empRole,
    empEmail,
    empPhone,
    empPhoto
]
let Employee = {}
saveEmployee.addEventListener("click", (e) => {
    let isValid = false
    inputs.map((el) => {
        console.log([el])
        console.log([el.value])
        if (el.value.trim() != "") {
            Employee[el.id] = el.value
            isValid = true
        }
        else {
            alert(`  ${el.id} not implement yet`)
            isValid = false
        }

    })
    if (isValid) {
        STAFF.push(Employee)
        console.log(STAFF)
        localStorage.setItem("STAFF", JSON.stringify(STAFF));
        inputs.forEach(element => {
            if (element.id !== "empRole")
                element.value = ""
        });
    }
    let localStaff = JSON.parse(localStorage.getItem("STAFF"))
    console.log("localstorage")
    console.log(localStaff)
}

)
// add to exp list 
const arrayexpList = []
addExp.addEventListener("click",(e)=>{
 
    const el = expInput.value.trim(); 
    if (el === "") return;
    arrayexpList.push(el);
    Employee["arrayexpList"] = [...arrayexpList]; 

    const span = document.createElement("span");
    span.className = "rounded-md border border-gray-300 bg-gray-300 w-auto inline-block p-2";
    span.textContent = el;
    expList.appendChild(span);
     
    expInput.value = "";

})

