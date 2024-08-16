document.addEventListener('DOMContentLoaded', () => {
    checkForReduction();
    loadTable();
    setupForm();
    setupRemoveForm();
    setupEditForm();
});

const defaultMedications = [
    { name: 'Glyxambi', time: '07:00', quantity: 37 },
    { name: 'Press Plus', time: '10:00', quantity: 35 },
    { name: 'Ecasil®81', time: '13:00', quantity: 24 },
    { name: 'Bissulfato de Clopidogrel', time: '14:00', quantity: 38 },
    { name: 'Cloridrato de Metformina', time: '14:00', quantity: 44 },
    { name: 'Cloridrato de Amitriptilina', time: '18:00', quantity: 27 },
    { name: 'Sinvastatina', time: '18:00', quantity: 55 }
];

function getMedications() {
    const meds = localStorage.getItem('medications');
    return meds ? JSON.parse(meds) : defaultMedications;
}

function saveMedications(meds) {
    localStorage.setItem('medications', JSON.stringify(meds));
}

function sortMedications(meds) {
    return meds.sort((a, b) => {
        const [aHour, aMinute] = a.time.split(':').map(Number);
        const [bHour, bMinute] = b.time.split(':').map(Number);
        return aHour - bHour || aMinute - bMinute;
    });
}

function loadTable() {
    const meds = sortMedications(getMedications());
    const tableBody = document.querySelector('#medTable tbody');
    const selectMed = document.getElementById('selectMed');
    const editSelectMed = document.getElementById('editSelectMed');
    tableBody.innerHTML = '';
    selectMed.innerHTML = '<option value="" disabled selected>Selecione...</option>';
    editSelectMed.innerHTML = '<option value="" disabled selected>Selecione...</option>';

    meds.forEach(med => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${med.name}</td>
            <td>${med.time}</td>
            <td>${med.quantity}</td>
        `;
        tableBody.appendChild(tr);

        const option = document.createElement('option');
        option.value = med.name;
        option.textContent = med.name;
        selectMed.appendChild(option);
        editSelectMed.appendChild(option.cloneNode(true)); // Adiciona uma cópia da opção ao menu de edição
    });
}

function reduceQuantities() {
    const meds = getMedications();
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const updatedMeds = meds.map(med => {
        const [medHour, medMinute] = med.time.split(':').map(Number);

        if (
            med.quantity > 0 &&
            (currentHour > medHour || (currentHour === medHour && currentMinute >= medMinute))
        ) {
            med.quantity -= 1;
        }

        return med;
    });

    saveMedications(updatedMeds);
}

function checkForReduction() {
    const lastReduction = localStorage.getItem('lastReductionDate');
    const today = new Date().toLocaleDateString();

    if (lastReduction !== today) {
        reduceQuantities();
        localStorage.setItem('lastReductionDate', today);
    }
}

function setupForm() {
    const form = document.getElementById('medForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const time = document.getElementById('time').value;
        const quantity = parseInt(document.getElementById('quantity').value, 10);

        if (name && time && quantity > 0) {
            const newMed = { name, time, quantity };
            const meds = getMedications();
            meds.push(newMed);
            saveMedications(meds);
            loadTable();
            form.reset();
        }
    });
}

function setupRemoveForm() {
    const removeForm = document.getElementById('removeForm');
    removeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectMed = document.getElementById('selectMed');
        const medName = selectMed.value;

        if (medName) {
            let meds = getMedications();
            meds = meds.filter(med => med.name !== medName);
            saveMedications(meds);
            loadTable();
        }
    });
}

function setupEditForm() {
    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectMed = document.getElementById('editSelectMed');
        const medName = selectMed.value;
        const newTime = document.getElementById('editTime').value;
        const newQuantity = parseInt(document.getElementById('editQuantity').value, 10);

        if (medName && newTime && newQuantity > 0) {
            let meds = getMedications();
            meds = meds.map(med => {
                if (med.name === medName) {
                    med.time = newTime;
                    med.quantity = newQuantity;
                }
                return med;
            });
            saveMedications(meds);
            loadTable();
        }
    });
}
