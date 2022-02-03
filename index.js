const firebaseConfig = {
    apiKey: "AIzaSyA1EQho8HVD19jpDJXi7qzSuiWaZ6fiaUk",
    authDomain: "shopeasy-74638.firebaseapp.com",
    projectId: "shopeasy-74638",
    storageBucket: "shopeasy-74638.appspot.com",
    messagingSenderId: "206936006546",
    appId: "1:206936006546:web:ac0b27b53e2cda27532b4b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)



var db = firebase.firestore()


window.onload = function () {
    
    const allProducts = document.querySelector('.all-products'); 

    db.collection('products')
        .onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data())
                console.log(doc.data().productName)
                console.log(doc.data().productDesc)
                console.log(doc.data().productPrice)
                allProducts.innerHTML += `<div class="single-product"><h3>${doc.data().productName}</h3>
                <p>${doc.data().productDesc}</p>
                <p>Price&nbsp;<span>$${doc.data().productPrice}</span></p>
                <button class="view-btn"><a href="product.html">View Details</a></button>
                `

                
            })
        })
}

const formWrapper = document.querySelector('.form-wrapper');
const loginFormWrapper = document.querySelector('.login-form-wrapper'); 
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn')
const logoutBtn = document.querySelector('.logout-btn')
const signInForm = document.querySelector('.signin-form');
const loginForm = document.querySelector('.login-form');


const closeButton = document.querySelector('.close'); 
const closeButton1 = document.querySelector('.close1'); 

closeButton.addEventListener('click', function (e) {
    e.target.parentElement.parentElement.parentElement.style.display = 'none'
})

closeButton1.addEventListener('click', function (e) {
    e.target.parentElement.parentElement.parentElement.style.display = 'none'
})

registerBtn.addEventListener('click', function () {
    formWrapper.classList.toggle('hide')
})

loginBtn.addEventListener('click', function () {
    loginFormWrapper.classList.toggle('hide');
})

signInForm.addEventListener('submit', async function (e) {

    e.preventDefault();

    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    console.log(email, password)

    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1EQho8HVD19jpDJXi7qzSuiWaZ6fiaUk", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
            email: email,
            password: password
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    const data = await response.json()
    console.log(data)

    console.log(data.idToken)

    const id = data.idToken;

    localStorage.setItem('id', `${id}`);

    

})

loginForm.addEventListener('submit', async function (e) {

    e.preventDefault();

    const email1 = document.querySelector('.email1').value;
    const password1 = document.querySelector('.password1').value;
    console.log(email1, password1)

    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1EQho8HVD19jpDJXi7qzSuiWaZ6fiaUk", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
            email: email1,
            password: password1
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    const data = await response.json()
    const userId = data.localId;
    const useremail = data.email;
    console.log(useremail)
    console.log(userId)


    //console.log(data.idToken)

    const userToken = data.idToken;

    localStorage.setItem('id', `${userToken}`);
    localStorage.setItem('userid', `${userId}`);
    localStorage.setItem('useremail', `${useremail}`);

})

logoutBtn.addEventListener('click', e => {
    e.preventDefault();
    
    console.log('User signed out!');
    localStorage.clear();
    //localStorage.removeItem('id'); 
    //localStorage.removeItem('userid'); 
})
