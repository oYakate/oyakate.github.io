const textElement = document.querySelector('.text');
const cursor = document.querySelector('.cursor');
const additionalContent = document.querySelector('.additional-content');

const mainMessage = "Hello, World!";
const additionalMessage = [
    { text: "Visit my ", type: "text" },
    { text: "", type: "link", url: "https://github.com/oYakate/" },
];

let mainIndex = 0;
let subIndex = 0;
let charIndex = 0;

function typeMainMessage() {
    if (mainIndex < mainMessage.length) {
        textElement.textContent += mainMessage[mainIndex];
        mainIndex++;
        setTimeout(typeMainMessage, 150);
    } else {
        cursor.style.animation = "none"; 
        setTimeout(typeAdditionalContent, 500);
    }
}

function typeAdditionalContent() {
    if (subIndex < additionalMessage.length) {
        const current = additionalMessage[subIndex];

        if (current.type === "text") {
            let span = additionalContent.querySelector(`span[data-index="${subIndex}"]`);
            if (!span) {
                span = document.createElement('span');
                span.dataset.index = subIndex;
                additionalContent.appendChild(span);
            }
            span.textContent += current.text[charIndex];
        } else if (current.type === "link") {
            let link = additionalContent.querySelector(`a[data-index="${subIndex}"]`);
            if (!link) {
                link = document.createElement('a');
                link.href = current.url;
                link.target = "_blank";
                link.dataset.index = subIndex;
                link.style.marginRight = "5px"; 
                link.style.marginLeft = "5px"; 
                additionalContent.appendChild(link);
            }
            link.textContent += current.text[charIndex];
        }

        charIndex++;

        if (charIndex >= current.text.length) {
            charIndex = 0;
            subIndex++;
        }

        setTimeout(typeAdditionalContent, 100);
    } else {
        cursor.style.animation = "blink 0.5s step-start infinite"; 
    }
}

typeMainMessage();
