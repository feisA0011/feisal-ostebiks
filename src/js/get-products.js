document.addEventListener('DOMContentLoaded', () => {
    fetch('/data/products.json')
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            const cardTemplate = document.getElementById('cardTemplate');
            const list = document.getElementById('cardList');
            data.forEach(function (product) {
                // console.log(product)
                const clone = cardTemplate.content.cloneNode(true)
                clone.querySelector('h1').innerText = product.navn
                clone.querySelector('p').innerText = product.beskrivelse
                clone.querySelector('.table-country-name').innerText = product.land
                clone.querySelector('.table-weight-amount').innerText = product.vægt
                clone.querySelector('.table-price-amount').innerText = product.pris
                clone.querySelector("a").href = `/singleProductPage/?sku=${product.sku}`
                clone.querySelector(".productImg").src = `/assets/images/${product.billeder[0]}`





                list.appendChild(clone);

            })
        })
})