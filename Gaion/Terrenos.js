        // 1. CÁLCULO AUTOMÁTICO DE ÁREA
        const frontInput = document.getElementById('front');
        const depthInput = document.getElementById('depth');
        const areaInput = document.getElementById('area');

        function calculateArea() {
            const front = parseFloat(frontInput.value) || 0;
            const depth = parseFloat(depthInput.value) || 0;
            if (front > 0 && depth > 0) {
                areaInput.value = (front * depth).toFixed(2);
            } else {
                areaInput.value = '';
            }
        }

        frontInput.addEventListener('input', calculateArea);
        depthInput.addEventListener('input', calculateArea);

        // 2. FORMATAÇÃO DE MOEDA (PREÇO)
        const priceInput = document.getElementById('price');
        priceInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = (value / 100).toFixed(2) + '';
            value = value.replace('.', ',');
            value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            e.target.value = value ? 'R$ ' + value : '';
        });

        // 3. UPLOAD E PREVIEW DE IMAGENS
        const fileInput = document.getElementById('fileInput');
        const uploadArea = document.getElementById('uploadArea');
        const previewContainer = document.getElementById('previewContainer');
        let selectedFiles = [];

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
            });
        });

        uploadArea.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });

        function handleFiles(files) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    selectedFiles.push(file);
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const div = document.createElement('div');
                        div.className = 'preview-item';
                        div.innerHTML = `
                            <img src="${e.target.result}" alt="Preview">
                            <button type="button" class="remove-btn" onclick="removeImage(this, '${file.name}')">×</button>
                        `;
                        previewContainer.appendChild(div);
                        previewContainer.classList.add('active');
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        window.removeImage = function(btn, fileName) {
            btn.parentElement.remove();
            selectedFiles = selectedFiles.filter(f => f.name !== fileName);
            if (selectedFiles.length === 0) {
                previewContainer.classList.remove('active');
            }
        };

        // 4. SUBMISSÃO DO FORMULÁRIO
const form = document.getElementById('terrainForm');
const toast = document.getElementById('toast');
const terrainType = document.getElementById('terrainType');
const address = document.getElementById('address');
const front = document.getElementById('front');
const depth = document.getElementById('depth');
const area = document.getElementById('area');
 const productsGrid = document.querySelector('.products-grid');

form.addEventListener('submit', (e) => {
    e.preventDefault();
        if (selectedFiles.length === 0) {
        alert('Selecione pelo menos uma imagem.');
        return;
    }
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerText;

    submitBtn.innerText = '⏳ Salvando...';
    submitBtn.disabled = true;

    const formData = new FormData();
    // Informações principais
    formData.append('price', document.getElementById('price').value);
    formData.append('terrainType', terrainType.value);
    formData.append('address', address.value);
    formData.append('area', area.value);
    formData.append('seller', document.getElementById('seller').value);

    // Informações adicionais
    formData.append('neighborhood', document.getElementById('neighborhood').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('reference', document.getElementById('reference').value);
    formData.append('front', front.value);
    formData.append('depth', depth.value);
    formData.append('topography', document.getElementById('topography').value);
    formData.append('frontage', document.getElementById('frontage').value);
    formData.append('observations', document.getElementById('observations').value);
    formData.append('contact', document.getElementById('contact').value);

    // Imagens
    selectedFiles.forEach((file) => {
        formData.append('images', file);
    });

    fetch('http://127.0.0.1:5000/api/terrenos', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Resposta da API:", data);        // Imagem do card
        const image = selectedFiles.length > 0
            ? URL.createObjectURL(selectedFiles[0])
            : 'https://via.placeholder.com/500x300';

        // Criar card
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.cursor = 'pointer';

        card.addEventListener('click', () => {
            if(data.id) {
                const url = new URL("in/compra/compra.html", window.location.href);
                url.searchParams.set("id", data.id);
                window.location.href = url.toString();
            }
        });

        card.innerHTML = `
            <div class="card-image">
                <img src="${image}" alt="Terreno">
                <span class="price-badge">${priceInput.value}</span>
            </div>

            <div class="card-body">
                <span class="terrain-type">${terrainType.value}</span>

                <div class="location">
                    📍 ${address.value}
                </div>

                <div class="dimensions-grid">

                    <div class="dim-item">
                        <div class="dim-label">Frente</div>
                        <div class="dim-value">
                            ${front.value}
                            <span class="dim-unit">m</span>
                        </div>
                    </div>

                    <div class="dim-item">
                        <div class="dim-label">Profund.</div>
                        <div class="dim-value">
                            ${depth.value}
                            <span class="dim-unit">m</span>
                        </div>
                    </div>

                    <div class="dim-item">
                        <div class="dim-label">Área</div>
                        <div class="dim-value">
                            ${area.value}
                            <span class="dim-unit">m²</span>
                        </div>
                    </div>

                </div>
            </div>
        `;

        // Adicionar no topo da lista
        productsGrid.prepend(card);

        // Mostrar toast
        toast.classList.add('show', 'success');

        // Limpar formulário
        form.reset();
        area.value = '';

        previewContainer.innerHTML = '';
        previewContainer.classList.remove('active');
        selectedFiles = [];

        submitBtn.innerText = originalText;
        submitBtn.disabled = false;

        setTimeout(() => {
            toast.classList.remove('show', 'success');
        }, 3000);

    })
    .catch(error => {
        console.error("Erro ao enviar para API:", error);
        alert("Houve um erro ao enviar o terreno para o servidor.");
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    });
});

// 5. CARREGAR TERRENOS EXISTENTES
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://127.0.0.1:5000/api/terrenos')
        .then(response => response.json())
        .then(data => {
            const productsGrid = document.querySelector('.products-grid');
            if (!productsGrid) return;
            productsGrid.innerHTML = ''; // Limpa os de exemplo do HTML
            
            // Inverte para colocar os mais recentes no topo
            data.reverse().forEach(t => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.style.cursor = 'pointer';
                
                card.addEventListener('click', () => {
                    if(t.id) {
                        const url = new URL("in/compra/compra.html", window.location.href);
                        url.searchParams.set("id", t.id);
                        window.location.href = url.toString();
                    }
                });

                card.innerHTML = `
                    <div class="card-image">
                        <img src="${t.imagem}" alt="Terreno">
                        <span class="price-badge">R$ ${t.preco || ''}</span>
                    </div>

                    <div class="card-body">
                        <span class="terrain-type">${t.tipo || ''}</span>

                        <div class="location">
                            📍 ${t.endereco || ''}
                        </div>

                        <div class="dimensions-grid">
                            <div class="dim-item">
                                <div class="dim-label">Frente</div>
                                <div class="dim-value">
                                    ${t.largura || '-'}
                                    <span class="dim-unit">m</span>
                                </div>
                            </div>
                            <div class="dim-item">
                                <div class="dim-label">Profund.</div>
                                <div class="dim-value">
                                    ${t.comprimento || '-'}
                                    <span class="dim-unit">m</span>
                                </div>
                            </div>
                            <div class="dim-item">
                                <div class="dim-label">Área</div>
                                <div class="dim-value">
                                    ${t.area || '-'}
                                    <span class="dim-unit">m²</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(card);
            });
        })
        .catch(err => console.error("Erro ao carregar lista de terrenos:", err));
});