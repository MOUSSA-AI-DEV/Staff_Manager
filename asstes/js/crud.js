import { arrayexpList } from "./app.js";


let STAFF = JSON.parse(localStorage.getItem("STAFF")) || [];
// const unassignedList = document.getElementById("unassignedList");

function renderStaffList(localStaff,div) {
    // let localStaff = JSON.parse(localStorage.getItem("STAFF")) || [];
    unassignedList.innerHTML = "";

    localStaff.forEach(elA => {

        div.innerHTML += `
    <div class="card-staff grid grid-cols-4 w-full bg-white rounded-xl shadow-lg p-2 flex flex-col items-center">            
        <img src="${elA.empPhoto}" class="w-12 h-12 rounded-full object-cover mb-2">
                <div>
                    <h3 class="font-bold">${elA.empName}</h3>
                    <h5>${elA.empRole}</h5>
                </div>
                <div class="flex gap-3">
                    <button class="px-2 bg-blue-600 text-white rounded-md">Edit</button>
<button id="${elA.id}" class="delete-btn px-2 bg-red-600 text-white rounded-md">Delete</button>

      
                </div>
            </div>
        `;
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const card = e.target.closest(".card-staff");
            DeleteEmployee(btn.id, card);
        });
    });
}

function DeleteEmployee(id, cardElement) {
    STAFF = STAFF.filter(el => parseInt(el.id) !== parseInt(id));
    localStorage.setItem("STAFF", JSON.stringify(STAFF));
    if (cardElement) cardElement.remove();
}


// experience******************=>


function renderexperince(experience, div) {
    div.innerHTML = "";
console.log(experience)
    experience.forEach(elA => {

        div.innerHTML += `
    <div class="experience grid grid-cols-4 w-full bg-white rounded-xl shadow-lg p-2 flex flex-col items-center">            
                <div>
                    <h3 class="font-bold">${elA.companyName}</h3>
                    <h5>${elA.role}</h5>
                </div>
                <div class="flex gap-3">
                    <button  id="${elA.id}" class="edit-ex px-2 bg-blue-600 text-white rounded-md">Edit</button>
<button id="${elA.id}" class="delete-ex px-2 bg-red-600 text-white rounded-md">Delete</button>

      
                </div>
            </div>
        `;
    });

    document.querySelectorAll(".delete-ex").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault()
            const card = e.target.closest(".experience");
            DeleteEmployee(btn.id, card);
        });
    });
    document.querySelectorAll(".edit-ex").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault()
            editExperience(btn.id);
            e.stopPropagation()
        });
    });
    
}

let editID = null;
function editExperience(id) {
    editID = id;

    const exp = arrayexpList.find(e => e.id == id);

    document.getElementById("companyName").value = exp.companyName;
    document.getElementById("role").value = exp.role;
    document.getElementById("fromDate").value = exp.fromDate;
    document.getElementById("toDate").value = exp.toDate;

    const btn = document.getElementById("addExp");
    btn.textContent = "Update experience";

}



document.getElementById("addExp").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("iam in")
    console.log(arrayexpList)

    const companyName = document.getElementById("companyName").value;
    const role = document.getElementById("role").value;
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;


// console.log("moussafddddddddd")
// console.log(editID)
//     console.log("moussafddddddddd")

    if (editID){
        const exp = arrayexpList.find(e => e.id == editID);

        exp.companyName = companyName;
        exp.role = role;
        exp.fromDate = fromDate;
        exp.toDate = toDate;

        editID = null;

        const btn = document.getElementById("addExp");
        btn.textContent = " +Add experience";
      
    }
    else {
        arrayexpList.push({
            id: Date.now().toString(),
            companyName,
            role,
            fromDate,
            toDate
        });
    }

    document.getElementById("companyName").value = "";
    document.getElementById("role").value = "";
    document.getElementById("fromDate").value = "";
    document.getElementById("toDate").value = "";
    
    renderexperince(arrayexpList, document.getElementById("container-experience"));
    e.stopPropagation()
}); 





export { renderStaffList, STAFF, DeleteEmployee,renderexperince };
