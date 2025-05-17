// Load phone data
fetch('../phones/data.json')
  .then(res => res.json())
  .then(data => {
    const phones = data.phones;
    const select1 = document.getElementById('phone1-select');
    const select2 = document.getElementById('phone2-select');

    // Populate dropdowns
    phones.forEach(phone => {
      select1.innerHTML += `<option value="${phone.id}">${phone.model}</option>`;
      select2.innerHTML += `<option value="${phone.id}">${phone.model}</option>`;
    });

    // Compare on selection change
    select1.addEventListener('change', () => comparePhones());
    select2.addEventListener('change', () => comparePhones());
  });

function comparePhones() {
  const phone1Id = document.getElementById('phone1-select').value;
  const phone2Id = document.getElementById('phone2-select').value;
  if (!phone1Id || !phone2Id) return;

  fetch('../phones/data.json')
    .then(res => res.json())
    .then(data => {
      const phone1 = data.phones.find(p => p.id === phone1Id);
      const phone2 = data.phones.find(p => p.id === phone2Id);

      // Update UI
      document.getElementById('phone1-card').innerHTML = createPhoneCard(phone1);
      document.getElementById('phone2-card').innerHTML = createPhoneCard(phone2);

      // Render charts
      renderCharts(phone1, phone2);

      // Simple explanation
      document.getElementById('efficiency-text').innerHTML = `
        <strong>${phone1.model}'s processor</strong> is 
        <span class="highlight">${phone1.specs.efficiency}</span> compared to 
        <strong>${phone2.model}</strong>.
      `;
    });
}

function createPhoneCard(phone) {
  return `
    <img src="../${phone.image}" alt="${phone.model}">
    <h2>${phone.model}</h2>
    <ul>
      <li>Processor: ${phone.specs.processor}</li>
      <li>Battery: ${phone.specs.battery}</li>
      <li>Camera: ${phone.specs.camera}</li>
    </ul>
  `;
}

function renderCharts(phone1, phone2) {
  // Battery Life Chart
  new Chart(document.getElementById('batteryChart'), {
    type: 'bar',
    data: {
      labels: [phone1.model, phone2.model],
      datasets: [{
        label: 'Battery Life (hrs)',
        data: [20, 22], // Replace with real data
        backgroundColor: ['#4e73df', '#1cc88a']
      }]
    }
  });

  // Performance Chart
  new Chart(document.getElementById('performanceChart'), {
    type: 'radar',
    data: {
      labels: ['Speed', 'Efficiency', 'Camera', 'Battery'],
      datasets: [
        { label: phone1.model, data: [90, 95, 85, 88] },
        { label: phone2.model, data: [88, 90, 92, 84] }
      ]
    }
  });
}
