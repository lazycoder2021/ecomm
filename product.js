if (localStorage.getItem('id')) {
    window.location.href = './product.html';

}


if (!localStorage.getItem('id')) {
    window.location.href = './error.html';
}

const addToCartButton = document.querySelector('.add-to-cart-button'); 

addToCartButton.addEventListener('click', function () {
    console.log('works')
})

alert('works')

