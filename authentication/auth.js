const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')
const loginForm = document.getElementById('login-form')
const signUpForm = document.getElementById('signup-button')

let authentication = () => {


firebase.auth().onAuthStateChanged(function (user) {
    let playlistContainer = document.getElementById('playlist-container')
    /*
    if (user) {
        playlistContainer.style.display = "block"

    }
    else {
        playlistContainer.style.display = "none"
        console.log('no users signed in')
    }
    */
    const signUp = (e) => {
        e.preventDefault()
        const email = usernameInput.value
        const password = passwordInput.value


        //signup method
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(cred => {
                console.log(cred.user)
            })

            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    }

    //signIn method
    const signIn = (e) => {
        e.preventDefault()
        const email = usernameInput.value
        const password = passwordInput.value

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(cred => {
                console.log(cred.user)
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    }


    //logout method
    
    const logout = document.getElementById('logout');
    logout.addEventListener('click', async(e)=>{
        e.preventDefault()
        await auth.signOut()
        console.log('user signed out')
    })
    
   loginForm.addEventListener("click", signIn)
    signUpForm.addEventListener("click", signUp)   
})
}

export {authentication}