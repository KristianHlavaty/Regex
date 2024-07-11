// === strict quality == loose equlity (doesnt check type)
// usernameInput.style.borderColor = ""; default color

const usernameInput = document.getElementById("username-input");
const usernameHint = document.getElementById("username-hint");

const passwordInput = document.getElementById("password-input");
const passwordHint = document.getElementById("password-hint");

const emailInput = document.getElementById("email-input");
const emailHint = document.getElementById("email-hint");

const submitBtn = document.getElementById("submit-btn");

function validateInput(_targetInput){

	let result;

	switch (_targetInput) {
		case "username":
			const usernameRegex = /^[a-z]{6,30}$/;
			result = usernameRegex.test(usernameInput.value);
		
			if (result === false) {
				usernameInput.style.borderColor = "red";
				usernameHint.style.color = "red";
				usernameHint.innerText = "Username must be 6-30 characters long and contain only lowercase letters";
			}
			else {
				usernameInput.style.borderColor = "";
				usernameHint.innerText = "";
			}
		
			formState.validUsername = result;
			formState.toggleSubmitBtn();
			break;
		case "password":
			if(passwordInput.value.length >= 8 && passwordInput.value.length <= 256) {
				const containsLowercase = /[a-z]/;
				const containsUppercase = /[A-Z]/;
				const containsNumber = /\d/;
				const containsSymbol = /\W/;

				result = containsLowercase.test(passwordInput.value) && containsUppercase.test(passwordInput.value) && containsNumber.test(passwordInput.value) && containsSymbol.test(passwordInput.value);
				if (result === false)
					{
						passwordInput.style.borderColor = "red";
						passwordHint.style.color = "red";
						passwordHint.innerText = "Password must contain at least one lowercase, uppercase, number, and symbol";
					}
				else {
					passwordInput.style.borderColor = "";
					passwordHint.innerText = "";
				}
			} else {
				passwordInput.style.borderColor = "red";
				passwordHint.style.color = "red";
				passwordHint.innerText = "Password must be at least 8 character long or at most 256";
			}
			formState.validPassword = result;
			formState.toggleSubmitBtn();
			break;
		case "email":
			emailInput.value = emailInput.value.toLowerCase();
			const accountNameSection = emailInput.value.split('@')[0];

			if(accountNameSection.length >= 2 && accountNameSection.length <= 64){
				const emailRegex = /^[a-zA-Z]+\.?[a-z0-9]+@[a-z0-9]{2,64}\.(com|org)$/i;
				result = emailRegex.test(emailInput.value);
				if (result === false) {
					emailInput.style.borderColor = "red";
					emailHint.style.color = "red";
					emailHint.innerText = "Enter the email address in the format: someone@example.com OR someone@example.org";
				} else {
					emailInput.style.borderColor = "";
					emailHint.style.color = "";
					emailHint.innerText = "";
				}
			} else {
				emailInput.style.borderColor = "red";
				emailHint.style.color = "red";
				emailHint.innerText = "Email must be at least 2 character long or at most 64. Only lowercase letters are allowed, numbers, and periods (.) are allowed.";
			}
			formState.validEmail = result;
			formState.toggleSubmitBtn();
			break;
		default:
			break;
	}
}
const formState = {
	validUsername: false,
	validPassword: false,
	validEmail: false,
	toggleSubmitBtn: function() {
		submitBtn.disabled = !(this.validUsername && this.validPassword && this.validEmail);
	}
};

formState.toggleSubmitBtn();

usernameInput.addEventListener("input", () => {
	validateInput("username");
})

passwordInput.addEventListener("input", () => {
	validateInput("password");
})

emailInput.addEventListener("input", () => {
	validateInput("email");
})