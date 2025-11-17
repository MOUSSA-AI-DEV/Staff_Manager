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

    // afficher staff dans la bare 

let unassignedList = document.getElementById("unassignedList")





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
    // afficher les element dans unassignedList
    
localStaff.map((elA)=>{
    unassignedList.innerHTML = `<div class="grid grid-cols-4 w-full  bg-white rounded-xl shadow-lg p-2 flex flex-col items-center h-30">
  
  <img src="${elA.empPhoto}"
       alt="Image"
       class=" border bg-black w-12 h-19 rounded-full object-cover mb-2">
  <div class="">
  <h3 class="text-sm font-bold  ">${elA.empName} </h3>
  <h5 class="text-sm m-2">${elA.empRole}</h5>
  </div>
  <div class="flex gap-3 mx-2 ">
    <button class="px-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
      Edit
    </button>
    <button class="px-2  bg-red-600 text-white rounded-md hover:bg-red-700">
      Delete
    </button>
  </div>

</div>`

})
    console.log("localstorage")
    console.log(localStaff)
}

)
// add to exp list
let companyName = document.getElementById("companyName")
let role = document.getElementById("role") 
let fromDate = document.getElementById("fromDate")
let toDate = document.getElementById("toDate")

let inputsExp = [companyName, role, fromDate, toDate]



addExp.addEventListener("click",(e)=>{
    const arrayexpList = []
     const experience={}
     inputsExp.map((el)=>{
         if (el === "") return;
         if (el.value.trim()!=""){
            experience[el.id]=el.value
            
         }
         else{
            alert(`implementer cette case ${el.id}`)
         }
          el.value = "";
     })
     
    console.log(experience)
    arrayexpList.push(experience);
    Employee["arrayexpList"] = [arrayexpList]; 
    console.log(Employee)

  
     
   

})


