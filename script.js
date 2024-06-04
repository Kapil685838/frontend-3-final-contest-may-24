document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

    let cryptoData = [];

    // Fetch data using .then
    function fetchDataUsingThen() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                cryptoData = data;
                renderTable(data);
            })
            .catch(error => console.error('Error fetching data using .then:', error));
    }

    // Fetch data using async/await
    async function fetchDataUsingAsyncAwait() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            cryptoData = data;
            renderTable(data);
        } catch (error) {
            console.error('Error fetching data using async/await:', error);
        }
    }

    // Initial data fetch
    fetchDataUsingAsyncAwait();

    // Render table
    function renderTable(data) {
        const tableBody = document.getElementById('cryptoTable').querySelector('tbody');
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="display:flex; align-items: center;"><img src="${item.image}" alt="${item.name}" width="30">${item.name}</td>
                <td>${item.symbol.toUpperCase()}</td>
                <td>$${item.current_price}</td>
                <td>$${item.total_volume.toLocaleString()}</td>
                <td style="${item.price_change_percentage_24h.toFixed(2) > 0 ? 'color: green;' : 'color: red;'}">${item.price_change_percentage_24h.toFixed(2)}%</td>
                <td>Mkt Cap:$${item.market_cap.toLocaleString()}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Search functionality
    document.getElementById('searchButton').addEventListener('click', () => {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const filteredData = cryptoData.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.symbol.toLowerCase().includes(query)
        );
        renderTable(filteredData);
    });

    // Sort functionality
    document.getElementById('sortMarketCapButton').addEventListener('click', () => {
        const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
        renderTable(sortedData);
    });

    document.getElementById('sortChangeButton').addEventListener('click', () => {
        const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        renderTable(sortedData);
    });
});