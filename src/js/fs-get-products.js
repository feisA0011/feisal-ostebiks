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

})