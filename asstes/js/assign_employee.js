
import { renderStaffList } from "../js/crud.js";
export const roomArrays = JSON.parse(localStorage.getItem("ROOMS")) || {
    conference: [],
    reception: [],
    server: [],
    security: [],
    staff: [],
    archives: []
};

function saveRooms() {
    localStorage.setItem("ROOMS", JSON.stringify(roomArrays));
}

function updateZoneBackground(zone) {
    const container = document.querySelector(`[data-zone="${zone}"] [data-zone-list]`);
    const zoneDiv = container.closest(".zone");
   
    if (roomArrays[zone].length === 0) {
        zoneDiv.classList.add("bg-red-200");
    } else {
        zoneDiv.classList.remove("bg-red-200");
    }
}

const workerPopup = document.getElementById("worker-display-popup-room");
const worcker_preview = document.getElementById("worker-preview");
const btn_close_affichage = document.getElementById("close-worker-popup-room");

function canAccessZone(role, zone) {
    if (role === "Manager") return true;
    // if (zone === "reception") return role === "Receptionist";
    if (zone === "server") return role === "IT Technician";
    if (zone === "security") return role === "Security Agent";
    if (zone === "archives") {
        if (role === "Cleaning Staff") return false;
        return role === "Archivist" || role === "Manager";
    }
    if (role === "Other") {
        return !["server", "security", "archives"].includes(zone);
    }
    if (role === "Cleaning Staff") {
        return zone !== "archives";
    }
    return false;
}

function openWorkerPopup(zoneName) {
    worcker_preview.innerHTML = "";
    const staff = JSON.parse(localStorage.getItem("STAFF")) || [];
    const filtered = staff.filter(emp => canAccessZone(emp.empRole, zoneName));
    

    filtered.forEach(emp => {
        const card = document.createElement("div");
        card.className = "border p-2 rounded cursor-pointer hover:bg-gray-100";
        card.dataset.id = emp.id;
        card.innerHTML = `
            <strong>${emp.empName}</strong>
            <p class="text-sm text-gray-600">${emp.empRole}</p>
        `;
        worcker_preview.appendChild(card);
    });

    workerPopup.classList.remove("hidden");
}

btn_close_affichage.addEventListener("click", () => {
    workerPopup.classList.add("hidden");
});





worcker_preview.addEventListener("click", (e) => {
    // get id of  card to pass and find it
    const card = e.target.closest("[data-id]");
    if (!card) return;

    const empId = card.dataset.id;
    let staff = JSON.parse(localStorage.getItem("STAFF")) || [];
    const employee = staff.find(emp => emp.id === empId);

    const zoneName = document.querySelector(".zone.active")?.dataset.zone;
    if (!canAccessZone(employee.empRole, zoneName)) {
        alert("Cet employé n'a pas accès à cette zone.");
        return;
    }

    const room = roomArrays[zoneName];
    if (room.length >= 5) {
        alert("Cette salle a déjà 5 employés.");
        return;
    }

    room.push(employee);
    saveRooms();

    staff = staff.filter(emp => emp.id !== empId);
    localStorage.setItem("STAFF", JSON.stringify(staff));

    renderStaffList(staff, document.getElementById("unassignedList"));
    addEmployeeToRoom(zoneName, employee);

    workerPopup.classList.add("hidden");
});

function removeEmployeeFromRoom(zone, empId) {
    let staff = JSON.parse(localStorage.getItem("STAFF")) || [];
    const index = roomArrays[zone].findIndex(emp => emp.id === empId);
    if (index === -1) return;

    const employee = roomArrays[zone][index];
    roomArrays[zone].splice(index, 1);
    saveRooms();

    staff.push(employee);
    localStorage.setItem("STAFF", JSON.stringify(staff));

    renderStaffList(staff, document.getElementById("unassignedList"));
    renderRooms();
    updateZoneBackground(zone);
}

export function renderRooms() {
    // get zones 
    Object.keys(roomArrays).forEach(zone => {
        const container = document.querySelector(`[data-zone="${zone}"] [data-zone-list]`);
        const zoneDiv = container.closest(".zone");
        container.innerHTML = "";
       
        if (roomArrays[zone].length === 0) {
            zoneDiv.classList.add("bg-red-200");
        }
        else {
            zoneDiv.classList.remove("bg-red-200");
        }
// loop pour dustibier les employees
        roomArrays[zone].forEach(emp => {
            const empDiv = document.createElement("div");
            empDiv.className = "flex justify-between items-center p-2 bg-gray-100 rounded";
            empDiv.dataset.id = emp.id;

            empDiv.innerHTML = `
                <span>${emp.empName}</span>
                <button class=" remove-emp-btn">x</button>
            `;

            empDiv.querySelector(".remove-emp-btn").addEventListener("click", () => {
                removeEmployeeFromRoom(zone, emp.id);
            });

            container.appendChild(empDiv);
        });
    });
}

function addEmployeeToRoom(zone, employee) {
    const container = document.querySelector(`[data-zone="${zone}"] [data-zone-list]`);
    const empDiv = document.createElement("div");
    const zoneDiv = container.closest(".zone");
    
    empDiv.className = "flex justify-between items-center p-2 bg-gray-100 rounded";
    empDiv.dataset.id = employee.id;

    empDiv.innerHTML = `
        <span>${employee.empName}</span>
        
        <button class=" remove-emp-btn">X</button>
    `;

    empDiv.querySelector(".remove-emp-btn").addEventListener("click", () => {
        removeEmployeeFromRoom(zone, employee.id);
    });

    container.appendChild(empDiv);

    updateZoneBackground(zone);
}

export function assigne() {
    const roomButtons = document.querySelectorAll(".btn-add-zone");

    roomButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const zoneName = btn.closest(".zone").dataset.zone;
            document.querySelectorAll(".zone").forEach(z => z.classList.remove("active"));
            btn.closest(".zone").classList.add("active");
            openWorkerPopup(zoneName);
        });
    });

    renderRooms();
}
