import { renderStaffList, DeleteEmployee, STAFF,renderexperince } from "./crud.js";

import {  validationRules, validateField   } from "./validatField.js"

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

const inputsExp = [companyName, role, fromDate, toDate];
const addExp = document.getElementById("addExp");

const containerExperience = document.getElementById("container-experience")

const unassignedList = document.getElementById("unassignedList");


function validateForm() {
    let isValid = true;
    for (const field in validationRules) {
        if (field === "empPhoto") continue; 
        const input = document.getElementById(field);
        if (!input) continue;
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

// addExp.addEventListener("click", () => {

//     let experience = {
//         id: new Date().getTime().toString()
//     };

//     for (let el of inputsExp) {
//         if (el.value.trim() === "") {
//             return;
//         }
//         experience[el.id] = el.value;
//         el.value = "";
//     }

//     arrayexpList.push(experience);
//     renderexperince(arrayexpList,containerExperience)
//     console.log( experience);
//     console.log( arrayexpList);
// });


saveEmployee.addEventListener("click", () => {
    console.log("jjjjj");
    console.log(arrayexpList);
console.log("dfghjk")
    if (!validateForm()) return;
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

let localStaff = JSON.parse(localStorage.getItem("STAFF")) || [];
renderStaffList(localStaff, unassignedList);
