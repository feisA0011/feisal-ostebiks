document.addEventListener('DOMContentLoaded', function () {

    fetch("/data/products.json")
        .then(response => response.json())
        .then(function (data) {
            data.forEach(function (product) {
                console.log(product)
                const sku = new URL(window.location).searchParams.get("sku")
                if (product.sku != sku) return;
                const container = document.getElementsByClassName('page')[0];
                container.querySelector('.productName').innerText = product.navn;
                container.querySelector('.productImg').src = `/assets/images/${product.billeder[0]}`
                container.querySelectorAll('.productSlideImg')[0].src = `/assets/images/${product.billeder[1]}`
                container.querySelectorAll('.productSlideImg')[1].src = `/assets/images/${product.billeder[2]}`
                container.querySelectorAll('.productSlideImg')[2].src = `/assets/images/${product.billeder[3]}`
                container.querySelector('.country-name').innerText = product.land;
                container.querySelector('.weight-amount').innerText = product.vægt;
                container.querySelector('.price-amount').innerText = product.pris;

                container.querySelectorAll('.productSlideImg').forEach(img => {
                    img.addEventListener('click', function () {
                        container.querySelector('.productImg').src = this.src;
                    })
                });
            });
        })
})