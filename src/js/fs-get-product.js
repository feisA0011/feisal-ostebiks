document.addEventListener('DOMContentLoaded', function () {




    const params = new URLSearchParams(window.location.search);
    const skuId = params.get('sku')

    const db = firebase.firestore();

    let docRef = db.collection('wine').doc(skuId)
    docRef.get().then(function (doc) {

        const container = document.getElementsByClassName('page')[0];

        container.querySelector('.productName').innerText = doc.data().name;
        container.querySelector('.productImg').src = `/assets/images/${doc.data().image}`
        container.querySelector('.country-name').innerText = doc.data().country;
        container.querySelector('.region').innerText = doc.data().region;
        container.querySelector('.price-amount').innerText = doc.data().price;
        // container.querySelectorAll('.productSlideImg')[0].src = `/assets/images/${doc.data().image[1]}`
        // container.querySelectorAll('.productSlideImg')[1].src = `/assets/images/${doc.data().image[2]}`
        // container.querySelectorAll('.productSlideImg')[2].src = `/assets/images/${doc.data().image[3]}`

        const productSlide = container.querySelector('.productSlide')
        const template = document.getElementById('template')
        doc.data().image.forEach(img => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('img').src = `/assets/images/${img}`
            productSlide.appendChild(clone);
        });



    })

    // fetch("/data/products.json")
    //     .then(response => response.json())
    //     .then(function (data) {
    //         data.forEach(function (product) {
    //             console.log(product)
    //             const sku = new URL(window.location).searchParams.get("sku")
    //             if (product.sku != sku) return;
    //             const container = document.getElementsByClassName('page')[0];
    //             container.querySelector('.productName').innerText = product.navn;
    //             container.querySelector('.productImg').src = `/assets/images/${product.billeder[0]}`
    //             container.querySelectorAll('.productSlideImg')[0].src = `/assets/images/${product.billeder[1]}`
    //             container.querySelectorAll('.productSlideImg')[1].src = `/assets/images/${product.billeder[2]}`
    //             container.querySelectorAll('.productSlideImg')[2].src = `/assets/images/${product.billeder[3]}`
    //             container.querySelector('.country-name').innerText = product.land;
    //             container.querySelector('.weight-amount').innerText = product.vægt;
    //             container.querySelector('.price-amount').innerText = product.pris;

    //             container.querySelectorAll('.productSlideImg').forEach(img => {
    //                 img.addEventListener('click', function () {
    //                     container.querySelector('.productImg').src = this.src;
    //                 })
    //             });
    //         });
    //     })
})