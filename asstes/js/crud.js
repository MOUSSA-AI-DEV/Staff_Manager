
let STAFF = JSON.parse(localStorage.getItem("STAFF")) || [];
const unassignedList = document.getElementById("unassignedList");

function renderStaffList() {
    let localStaff = JSON.parse(localStorage.getItem("STAFF")) || [];
    unassignedList.innerHTML = "";

    localStaff.forEach(elA => {

        unassignedList.innerHTML += `
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

export { renderStaffList, STAFF, DeleteEmployee };// const submit = document.getElementById("form");

// submit.addEventListener("submit" ,addworker);
// function addworker(e){
//     e.preventDefault();
//      if(!validateForm()){
//                 return; 
//             }
//     const name = nameworker.value.trim();
//     const role =workerrole.value.trim();
//     const company =companyNameExp.value.trim();
//     const rolexp = roleExp.value.trim();
//     const fromdate = startDateExp.value.trim();
//     const todate = endDateExp.value.trim();
//     const photourl = imagepreview.src;

//     // if(company === "")//regex and empty
//     const unassigneddiv = document.createElement("div");
//     unassigneddiv.className ="flex justify-between items-center bg-green-500 border border-gray-200 p-3 rounded-lg";
//     unassigneddiv.innerHTML = 
    
//     <div class="flex items-center gap-4 ">
//             <img src="${photourl}" 
//                 class="w-20 h-20 rounded-full object-cover border border-gray-300">
//         <div>
//                 <p style ="font-size :30px">${name}</p>
//                 <p style ="font-size :15px">${role}</p>
//                 <p style ="font-size :15px">${company}</p>
//                 <p style ="font-size :15px">${rolexp}</p>
//                 <p style ="font-size :15px"> from :${fromdate}</p>
//                 <p style ="font-size :15px"> to :${todate}</p>
            
//         </div> 
//     </div>
//         <button class="text-red-500 font-bold text-lg">X</button>
//         ;
//         unassigneddiv.querySelector("button").addEventListener("click", () => {
//             unassigneddiv.remove();
//         });

//     unassignedList.appendChild(unassigneddiv);
// }
// //validation regex 
// //current idea is declare function of validation or add span message to url &input and remove hidden ???
// const validationRules = {
//     'name': {
//         regex: /^[A-Za-z\s]{2,50}$/,
//         message: "Invalid Name ,name contain only letters and spaces."
//     },
//     'urlimage': {
//         regex: /^(https?://.*.(jpg|jpeg|png|gif|webp))$/i,
//         message: "Invalid image URL (only .jpg, .jpeg, .png, .gif, .webp)."
//     }
// };

// function toggleError(field, show, message = '') {
//     const errorDisplay = document.getElementById(${field}-error);
//     const inputField = document.getElementById(field);

//     if (show) {
//         errorDisplay.textContent = message;
//         errorDisplay.classList.remove('hidden');
//         inputField.classList.add('border-red-500');
//         inputField.classList.remove('border-green-500');
//     } else {
//         errorDisplay.classList.add('hidden');
//         inputField.classList.remove('border-red-500');
//         inputField.classList.add('border-green-500');
//     }
// }


// function validateField(field, value) {
//     const rule = validationRules[field];

//     if (rule && !rule.regex.test(value)) {
//         toggleError(field, true, rule.message);
//         return false;
//     } else if (rule) {
//         toggleError(field, false);
//         return true;
//     }
//     return true;
// }


// function validateForm() {
//     let isValid = true;

//     for (const field in validationRules) {
//         const inputField = document.getElementById(field);
//         if (inputField && !validateField(field, inputField.value)) {
//             isValid = false;
//         }
//     }

//     return isValid;
// }