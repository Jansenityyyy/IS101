const sideMenu = document.querySelector('.aside');
const menuBtn = document.querySelector('#menu_bar');
const closeBtn = document.querySelector('#close_btn');


const themeToggler = document.querySelector('.theme-toggler');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
})


themeToggler.addEventListener('click', () => {
    
    document.body.classList.toggle('dark-theme-variables')



    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
})






    // 1. Data array
    const recentOrders = [
        { name: "Phone", number: 456, payment: "02/04/26", status: "Pending", amount: 200, type: "Sales" },
        { name: "Clothes", number: 250, payment: "11/25/26", status: "Pending", amount: 125, type: "Expenses" },
        { name: "Watch", number: 380, payment: "08/20/26", status: "Pending", amount: 100, type: "Income" }
    ];

    // 2. Render table
    function renderRecentOrders() {
        const tbody = document.querySelector('.recent_order tbody');
        tbody.innerHTML = "";
        recentOrders.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${order.name}</td>
                <td>${order.number}</td>
                <td>${order.payment}</td>
                <td class="warning">${order.status}</td>
                <td class="primary">Details</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // 3. Calculate totals
    function calculateTotals() {
        let sales = 0, expenses = 0, income = 0;
        recentOrders.forEach(order => {
            if (order.type === "Sales") sales += order.amount;
            if (order.type === "Expenses") expenses += order.amount;
            if (order.type === "Income") income += order.amount;
        });
        return [sales, expenses, income];
    }

    // 4. Chart.js setup
    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sales', 'Expenses', 'Income'],
            datasets: [{
                label: '₱ in Last 24 Hours',
                data: [0, 0, 0],
                backgroundColor: [
                    'rgba(163, 22, 22, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(45, 230, 220, 0.6)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // 5. Update chart with totals
    function updateChart() {
        const [sales, expenses, income] = calculateTotals();
        salesChart.data.datasets[0].data = [sales, expenses, income];
        salesChart.update();
    }

    // 6. On page load
    document.addEventListener('DOMContentLoaded', () => {
        renderRecentOrders();
        updateChart();
    });




