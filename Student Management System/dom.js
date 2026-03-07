// Elements
const rollInput = document.getElementById('rollInput');
const nameInput = document.getElementById('nameInput');
const addBtn = document.getElementById('addBtn');
const studentList = document.getElementById('studentList');
const total = document.getElementById('total');
const presentCount = document.getElementById('presentCount');
const searchInput = document.getElementById('search');
const sortBtn = document.getElementById('sortBtn');
const highlightBtn = document.getElementById('highlightBtn');

// Enable/disable Add button
nameInput.addEventListener('input', () => {
    addBtn.disabled = nameInput.value.trim() === "";
});

// Add student
addBtn.addEventListener('click', () => {
    const roll = rollInput.value.trim();
    const name = nameInput.value.trim();
    if(!name) return;

    const li = document.createElement('li');
    const info = document.createElement('span');
    info.className = "student-info";
    info.textContent = `${roll} – ${name}`;

    // Present checkbox
    const presentChk = document.createElement('input');
    presentChk.type = 'checkbox';
    presentChk.title = 'Present';
    presentChk.addEventListener('change', updatePresentCount);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit';
    editBtn.addEventListener('click', () => {
        const newRoll = prompt("Enter new Roll No.", roll);
        const newName = prompt("Enter new Name", name);
        if(newRoll !== null && newName !== null) {
            info.textContent = `${newRoll} – ${newName}`;
        }
    });

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
        if(confirm("Are you sure you want to delete this student?")){
            li.remove();
            updateTotal();
            updatePresentCount();
        }
    });

    // Controls div
    const controls = document.createElement('div');
    controls.className = "controls";
    controls.appendChild(presentChk);
    controls.appendChild(editBtn);
    controls.appendChild(delBtn);

    li.appendChild(info);
    li.appendChild(controls);

    studentList.appendChild(li);

    rollInput.value = '';
    nameInput.value = '';
    addBtn.disabled = true;

    updateTotal();
    updatePresentCount();
});

// Update total students
function updateTotal(){
    total.textContent = `Total students: ${studentList.children.length}`;
}

// Update present/absent count
function updatePresentCount(){
    const all = studentList.querySelectorAll('li');
    let present = 0;
    all.forEach(li => {
        const chk = li.querySelector('input[type="checkbox"]');
        if(chk.checked){
            li.classList.add('present');
            present++;
        } else {
            li.classList.remove('present');
        }
    });
    const absent = all.length - present;
    presentCount.textContent = `Present: ${present}, Absent: ${absent}`;
}

// Search/filter students
searchInput.addEventListener('input', () => {
    const text = searchInput.value.toLowerCase();
    Array.from(studentList.children).forEach(li => {
        const info = li.querySelector('.student-info').textContent.toLowerCase();
        li.style.display = info.includes(text) ? '' : 'none';
    });
});

// Sort students A–Z
sortBtn.addEventListener('click', () => {
    const items = Array.from(studentList.children);
    items.sort((a,b) => {
        const nameA = a.querySelector('.student-info').textContent.toLowerCase();
        const nameB = b.querySelector('.student-info').textContent.toLowerCase();
        return nameA.localeCompare(nameB);
    });
    items.forEach(li => studentList.appendChild(li));
});

// Highlight first student
highlightBtn.addEventListener('click', () => {
    Array.from(studentList.children).forEach(li => li.classList.remove('highlight'));
    if(studentList.firstElementChild){
        studentList.firstElementChild.classList.add('highlight');
    }
});