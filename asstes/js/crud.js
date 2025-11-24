import { arrayexpList,showEmployeeModal } from "../js/app.js";


let STAFF = JSON.parse(localStorage.getItem("STAFF")) || [];

function renderStaffList(localStaff, div) {
    div.innerHTML = ""; 

    localStaff.forEach(elA => {
        div.innerHTML += `
          <div class="card-staff grid grid-cols-4  w-full bg-blue-200 rounded-md border p-2 items-center gap-2">
  <div class="flex justify-center">
    <img src="${elA.empPhoto}" class="w-12 h-12 rounded-full object-cover">
  </div>

  <div class="">
    <h3 class="font-bold">${elA.empName}</h3>
    <h5>${elA.empRole}</h5>
  </div>

  <div class="flex justify-center gap-2 ">
    <button data-id="${elA.id}" class="view-btn px bg-green-800 text-white rounded-md">view</button>
    <button data-id="${elA.id}" class="edit-btn px-2 bg-blue-800 text-white rounded-md">edit</button>
    <button data-id="${elA.id}" class="delete-btn px-2 bg-red-800 text-white rounded-md">delete</button>
  </div>
</div>

        `;
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = btn.dataset.id;
            const card = e.target.closest(".card-staff");
            DeleteEmployee(id, card);
        });
    });

    document.querySelectorAll(".view-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            console.log("view-btn")
            const id = btn.dataset.id;
            const emp = localStaff.find(emp => emp.id === id);
            if (emp) showEmployeeModal(emp);
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

let rpID = null;
function editExperience(id) {
    rpID = id;

    const exp = arrayexpList.find(e => e.id == id);

    document.getElementById("companyName").value = exp.companyName;
    document.getElementById("role").value = exp.role;
    document.getElementById("fromDate").value = exp.fromDate;
    document.getElementById("toDate").value = exp.toDate;

    const btn = document.getElementById("addExp");
    btn.textContent = "Update experience";

}


// addexp

document.getElementById("addExp").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("iam in")
    console.log(arrayexpList)

    const companyName = document.getElementById("companyName").value;
    const role = document.getElementById("role").value;
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;


    if (fromDate > toDate) {

        alert(`date de depart up  then date fini `)
        console.log(fromDate, toDate)
        return
    }

    if (rpID){
        const exp = arrayexpList.find(e => e.id == rpID);

        exp.companyName = companyName;
        exp.role = role;
        exp.fromDate = fromDate;
        exp.toDate = toDate;

        rpID = null;

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
