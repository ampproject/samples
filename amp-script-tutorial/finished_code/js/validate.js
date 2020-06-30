console.log('Hello, amp-script!');

const passwordBox = document.getElementById("passwordBox");
const submitButton = document.getElementById("submitButton");
const rulesArea = document.getElementById("rules");

const checkRegexes = {
  lower: /[a-z]/,
  upper: /[A-Z]/,
  digit: /\d/,
  special: /[^a-zA-Z\d]/i,
  eight: /.{8}/
};

// This creates a closure that contains the functions we'll use and stores the HTML element
function initCheckPassword(element) {
  const checkPass = (el) => {
    el.classList.remove("invalid");
    el.classList.add("valid");
  };

  const checkFail = (el) => {
    el.classList.remove("valid");
    el.classList.add("invalid");
  };

/*
 * Retrieve the contents of the password input. Check it against our regexes.
 * If a rule passes, turn the on-screen text green. If it fails, turn it red.
 * If all the rules pass, enable the Submit button!
 */
  const checkPassword = () => {
    const password = element.value;
    let failed = false;

    for (const check in checkRegexes) {
      let li = document.getElementById(check);

      if (password.match(checkRegexes[check])) {
        checkPass(li);
      } else {
        checkFail(li);
        failed = true;
      }
    }

    if (!failed) {
      submitButton.removeAttribute("disabled");
    }
  };

  element.addEventListener("focus", () => rulesArea.removeAttribute("hidden"));
  element.addEventListener("keyup", checkPassword);
}

initCheckPassword(passwordBox);