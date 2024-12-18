const textarea = document.getElementById("code");
const reset = document.getElementById("reset");
const solution = document.getElementById("solution");
const output = document.querySelector(".output");
const code = textarea.value;
let userEntry = textarea.value;

function updateCode() {
    output.innerHTML = textarea.value;
}

const htmlSolution = "<em>This is my text.</em>";
let solutionEntry = htmlSolution;

reset.addEventListener("click", () => {
    textarea.value = code;
    userEntry = textarea.value;
    solutionEntry = htmlSolution;
    solution.value = "Show solution";
    updateCode();
});

solution.addEventListener("click", () => {
    if (solution.value === "Show solution") {
        textarea.value = solutionEntry;
        solution.value = "Hide solution";
    } else {
        textarea.value = userEntry;
        solution.value = "Show solution";
    }
    updateCode();
});

textarea.addEventListener("input", updateCode);
window.addEventListener("load", updateCode);

// stop tab key tabbing out of textarea and
// make it write a tab at the caret position instead
textarea.onkeydown = (e) => {
    if (e.code === "Tab") {
        e.preventDefault();
        insertAtCaret("\t");
    }

    if (e.code === "Escape") {
        textarea.blur();
    }
};

function insertAtCaret(text) {
    const scrollPos = textarea.scrollTop;
    let caretPos = textarea.selectionStart;

    const front = textarea.value.substring(0, caretPos);
    const back = textarea.value.substring(
        textarea.selectionEnd,
        textarea.value.length,
    );
    textarea.value = front + text + back;
    caretPos += text.length;
    textarea.selectionStart = caretPos;
    textarea.selectionEnd = caretPos;
    textarea.focus();
    textarea.scrollTop = scrollPos;
}

// Update the saved userCode every time the user updates the text area code

textarea.onkeyup = () => {
    // We only want to save the state when the user code is being shown,
    // not the solution, so that solution is not saved over the user code
    if (solution.value === "Show solution") {
        userEntry = textarea.value;
    } else {
        solutionEntry = textarea.value;
    }

    updateCode();
};
