function renderStaffList() {
    let localStaff = JSON.parse(localStorage.getItem("STAFF")) || [];
    unassignedList.innerHTML = "";

    localStaff.forEach(elA => {
        unassignedList.innerHTML += `
            <div class="grid grid-cols-4 w-full bg-white rounded-xl shadow-lg p-2 flex flex-col items-center">
                <img src="${elA.empPhoto}" class="w-12 h-12 rounded-full object-cover mb-2">
                <div>
                    <h3 class="font-bold">${elA.empName}</h3>
                    <h5>${elA.empRole}</h5>
                </div>
                <div class="flex gap-3">
                    <button class="px-2 bg-blue-600 text-white rounded-md">Edit</button>
                    <button class="px-2 bg-red-600 text-white rounded-md">Delete</button>
                </div>
            </div>
        `;
    });
}

export {renderStaffList}