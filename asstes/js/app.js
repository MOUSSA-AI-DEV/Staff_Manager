import { renderStaffList, DeleteEmployee, STAFF } from "./crud.js";
let arrayexpList = [];

const addBtn = document.getElementById("btn-open-modal");
const ModaleEmploye = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const saveEmployee = document.getElementById("saveEmployee");

const empName = document.getElementById("empName");
const empRole = document.getElementById("empRole");
const empEmail = document.getElementById("empEmail");
const empPhone = document.getElementById("empPhone");
const empPhoto = document.getElementById("empPhoto");

const inputs = [empName, empRole, empEmail, empPhone, empPhoto];


const companyName = document.getElementById("companyName");
const role = document.getElementById("role");
const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");

const inputsExp = [companyName, role, fromDate, toDate];
const addExp = document.getElementById("addExp");


addBtn.addEventListener("click", () => {
    ModaleEmploye.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
    ModaleEmploye.classList.add("hidden");
});


addExp.addEventListener("click", () => {

    let experience = {};

    for (let el of inputsExp) {
        if (el.value.trim() === "") {
            alert(el.id);
            return;
        }
        experience[el.id] = el.value;
        el.value = "";
    }

    arrayexpList.push(experience);

    console.log( experience);
    console.log( arrayexpList);
});


saveEmployee.addEventListener("click", () => {
    
    let Employee = {
        id : new Date().getTime().toString()
    };
    console.log("Employee" ,Employee )
    let isValid = true;

    for (let el of inputs) {
        if (el.value.trim() === "") {
            alert(`${el.id} empty`);
            isValid = false;
            return;
        }
        Employee[el.id] = el.value;
    }
    ModaleEmploye.classList.add("hidden");
    Employee.arrayexpList = [...arrayexpList];

    arrayexpList = [];

    STAFF.push(Employee);
    localStorage.setItem("STAFF", JSON.stringify(STAFF));

    console.log(Employee);

    inputs.forEach(el => {
        if (el.id !== "empRole") el.value = "";
    });

    renderStaffList();
});
   

renderStaffList();

