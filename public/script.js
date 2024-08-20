
document.addEventListener('DOMContentLoaded', () => {
    const ultimaAtualizacao = document.getElementById('ultima_atualizacao')
    const medForm = document.getElementById('medForm');
    const removeForm = document.getElementById('removeForm');
    const editForm = document.getElementById('editForm');
    const medTableBody = document.getElementById('medTable').querySelector('tbody');
    const selectMed = document.getElementById('selectMed');
    const editSelectMed = document.getElementById('editSelectMed');

    // Função para carregar medicamentos na tabela e opções de seleção
    const loadMedications = async () => {
        try {
            ultimaAtualizacao.innerHTML = `Ultima atualização: ` + `${new Date().getDate()}/` + `${new Date().getMonth()}/` + `${new Date().getFullYear()} às ` + `${new Date().getHours()}:` + `${new Date().getMinutes()}` 

            const response = await fetch('/get-medications');
            const medications = await response.json();

            // Limpar a tabela e opções de seleção
            medTableBody.innerHTML = '';
            selectMed.innerHTML = '<option value="" disabled selected>Selecione...</option>';
            editSelectMed.innerHTML = '<option value="" disabled selected>Selecione...</option>';

            medications.forEach(med => {
                // Adicionar à tabela
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${med.nome}</td>
                    <td>${med.hora}</td>
                    <td>${med.quantidade}</td>
                `;
                medTableBody.appendChild(row);

                // Adicionar ao select de remover e editar
                const option = document.createElement('option');
                option.value = med.id_medicamentos;
                option.textContent = med.nome;
                selectMed.appendChild(option);
                editSelectMed.appendChild(option.cloneNode(true));
            });
        } catch (error) {
            console.error('Erro ao carregar medicamentos:', error);
            
        }
    };

    // Adicionar novo medicamento
    medForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('name').value;
        const hora = document.getElementById('time').value;
        const quantidade = document.getElementById('quantity').value;

        try {
            await fetch('/add-medication', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, hora, quantidade })
            });
            loadMedications(); // Atualiza a tabela e seleções após adicionar
            medForm.reset(); // Limpa o formulário
        } catch (error) {
            console.error('Erro ao adicionar medicamento:', error);
        }
    });

    // Excluir medicamento
    removeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('selectMed').value;

        try {
            await fetch('/remove-medication', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            loadMedications(); // Atualiza a tabela e seleções após excluir
            removeForm.reset(); // Limpa o formulário
        } catch (error) {
            console.error('Erro ao excluir medicamento:', error);
        }
    });

    // Editar medicamento
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editSelectMed').value;
        const hora = document.getElementById('editTime').value;
        const quantidade = document.getElementById('editQuantity').value;

        try {
            await fetch('/edit-medication', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, hora, quantidade })
            });
            loadMedications(); // Atualiza a tabela e seleções após editar
            editForm.reset(); // Limpa o formulário
        } catch (error) {
            console.error('Erro ao editar medicamento:', error);
        }
    });

    // Carregar medicamentos ao iniciar
    loadMedications();
});
