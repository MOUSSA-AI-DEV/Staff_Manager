import { renderStaffList, DeleteEmployee, STAFF,renderexperince } from "./crud.js";
// import { renderWorkerModal } from "./affiche_worker.js";
import {  validationRules, validateField   } from "./validatField.js"
import { assigne, renderRooms } from "./assign_employee.js";

export let arrayexpList = []
const addBtn = document.getElementById("btn-open-modal");
const ModaleEmploye = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const saveEmployee = document.getElementById("saveEmployee");

const empName = document.getElementById("empName");
const empRole = document.getElementById("empRole");
const empEmail = document.getElementById("empEmail");
const empPhone = document.getElementById("empPhone");
const empPhoto = document.getElementById("empPhoto");
const previewImg = document.getElementById("previewImg");

const inputs = [empName, empRole, empEmail, empPhone, ];


const companyName = document.getElementById("companyName");
const role = document.getElementById("role");
const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");


const containerExperience = document.getElementById("container-experience")

const unassignedList = document.getElementById("unassignedList");


function validateForm() {
    let isValid = true;
    for (const field in validationRules) {
        if (field === "empPhoto") continue; 
        const input = document.getElementById(field);
        if (!validateField(field, input.value.trim())) isValid = false;
    }
    return isValid;
}

inputs.forEach(input => input.addEventListener("input", () => validateField(input.id, input.value.trim())));

// edit*************






addBtn.addEventListener("click", () => {
    ModaleEmploye.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
    ModaleEmploye.classList.add("hidden");
});

let empPhotoBase64 = "";


empPhoto.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) {
        previewImg.src = "https://via.placeholder.com/80";
        empPhotoBase64 = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        empPhotoBase64 = e.target.result;   
        previewImg.src = empPhotoBase64;    
    };
    reader.readAsDataURL(file);
});


saveEmployee.addEventListener("click", () => {
    console.log("jjjjj");
  
console.log("dfghjk")
    if (!validateForm()) return;
    let Employee = {
        id : new Date().getTime().toString()
    };
    console.log("Employee" ,Employee )

    for (let el of inputs) {
       
        Employee[el.id] = el.value;
    }
    ModaleEmploye.classList.add("hidden");
    Employee.empPhoto = empPhotoBase64 || "https://via.placeholder.com/80";
    Employee.arrayexpList = [...arrayexpList];
    containerExperience.innerHTML=""
    arrayexpList = [];

    STAFF.push(Employee);
    localStorage.setItem("STAFF", JSON.stringify(STAFF));

    console.log(Employee);

    inputs.forEach(el => {
        if (el.id !== "empRole") el.value = "";
    });
    empPhoto.value = "";
    previewImg.src = "https://via.placeholder.com/80";
    empPhotoBase64 = "";
    let localStaff = JSON.parse(localStorage.getItem("STAFF")) || [];
    renderStaffList(localStaff, unassignedList);
});

////show function

const modalShow = document.getElementById("modal-show");
const empNameShow = document.getElementById("empName-show");
const empRoleShow = document.getElementById("empRole-show");
const empEmailShow = document.getElementById("empEmail-show");
const empPhoneShow = document.getElementById("empPhone-show");
const previewImgShow = document.getElementById("previewImg-show");
const containerExperienceShow = document.getElementById("container-experience-show");


// Affichage employee

function showEmployeeModal(employee) {

    modalShow.classList.remove("hidden"); 
console.log("here  ")
    empNameShow.value = employee.empName;
    empRoleShow.value = employee.empRole;
    empEmailShow.value = employee.empEmail;
    empPhoneShow.value = employee.empPhone;

    previewImgShow.src = employee.empPhoto || "https://via.placeholder.com/80";

    containerExperienceShow.innerHTML = "";

    if (employee.arrayexpList) {
        employee.arrayexpList.forEach(exp => {
            const div = document.createElement("div");
            div.className = "border p-2 rounded mb-2";
            div.innerHTML = `
                <strong>Company:</strong> ${exp.companyName}<br>
                <strong>Role:</strong> ${exp.role}<br>
                <strong>From:</strong> ${exp.fromDate}<br>
                <strong>To:</strong> ${exp.toDate}
            `;
            containerExperienceShow.appendChild(div);
        });
    } else {
        containerExperienceShow.innerHTML =
            `<p class="text-gray-500"> sans experience  available</p>`;
    }
    console.log("good by")
}


document.getElementById("closeModal-show")
    .addEventListener("click", () => {
        modalShow.classList.add("hidden");
    });
 
let localStaff = JSON.parse(localStorage.getItem("STAFF")) || [];
renderStaffList(localStaff, unassignedList);
assigne()
renderRooms();
export {showEmployeeModal}