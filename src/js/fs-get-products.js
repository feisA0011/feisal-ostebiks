document.addEventListener('DOMContentLoaded', () => {

    const cardTemplate = document.getElementById('cardTemplate')
    const list = document.getElementById('cardList')
    const db = firebase.firestore();

    db.collection('wine').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            const clone = cardTemplate.content.cloneNode(true);
            clone.querySelector("h1").innerText = doc.data().name;
            clone.querySelector("img").src = `/assets/images/${doc.data().image[0]}`;
            clone.querySelector('.table-country-name').innerText = doc.data().country
            clone.querySelector('.table-price-amount').innerText = doc.data().price
            clone.querySelector('.region').innerText = doc.data().region
            clone.querySelector('a').href = `/vin/?sku=${doc.id}`



            list.appendChild(clone)

        })
    })
    // fetch('/data/products.json')
    //     .then(response => response.json())
    //     .then(function (data) {
    //         console.log(data);
    //         const cardTemplate = document.getElementById('cardTemplate');
    //         const list = document.getElementById('cardList');
    //         data.forEach(function (product) {
    //             // console.log(product)
    //             const clone = cardTemplate.content.cloneNode(true)
    //             clone.querySelector('h1').innerText = product.navn
    //             clone.querySelector('p').innerText = product.beskrivelse
    //             clone.querySelector('.table-country-name').innerText = product.land
    //             clone.querySelector('.table-weight-amount').innerText = product.vægt
    //             clone.querySelector('.table-price-amount').innerText = product.pris
    //             clone.querySelector("a").href = `/singleProductPage/?sku=${product.sku}`
    //             clone.querySelector(".productImg").src = `/assets/images/${product.billeder[0]}`

    //             list.appendChild(clone);

    //         })
    //     })
})