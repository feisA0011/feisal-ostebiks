document.addEventListener('DOMContentLoaded', function () {





    const params = new URLSearchParams(window.location.search);
    const skuId = params.get('sku')

    const db = firebase.firestore();
    let docRef = db.collection('wine').doc(skuId)

    const container = document.getElementsByClassName('page')[0];
    docRef.get().then(function (doc) {

        container.querySelector('.productName').innerText = doc.data().name;
        // container.querySelector('.productImg').src = `/assets/images/${doc.data().image}`
        container.querySelector('.country-name').innerText = doc.data().country;
        container.querySelector('.region').innerText = doc.data().region;
        container.querySelector('.price-amount').innerText = doc.data().price;

        const productSlide = container.querySelector('.productSlide')
        const template = document.getElementById('template')
        doc.data().image.forEach(img => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('img').src = `/assets/images/${img}`
            productSlide.appendChild(clone);
        });

    });

    let ratings = document.querySelector('.rating')
    let star = document.querySelectorAll('.star')

    star.forEach(element => {
        element.addEventListener('click', () => {
            const stars = parseInt(element.dataset.rating);
            console.log(stars)
            docRef.collection('ratings')
                .doc('rating')
                .update({
                    userRating: firebase.firestore.FieldValue.increment(1),
                    totalStars: firebase.firestore.FieldValue.increment(stars)
                });
        })


        docRef.collection('ratings')
            .doc('rating')

            .onSnapshot(function (doc) {
                console.log(doc.data())
                const userRating = doc.data().userRating;
                const totalStars = doc.data().totalStars;
                const average = totalStars / userRating;
                console.log(average)
                container.querySelector('h3').innerText = average.toFixed(1)


            })



    });


})