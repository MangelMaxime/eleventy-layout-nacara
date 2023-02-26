// Setup the copy code button for snippets
const setupCopyCode = () => {
    const snippetElements = Array.from(document.querySelectorAll("pre > code"));

    snippetElements
        .forEach(codeElement => {
            // If one of the parent of codeElement has data-disable-copy-button attributes
            // do not had the copy button
            // We store this information on a parent because we don't control the `snippet` generation
            if (codeElement.closest("[data-disable-copy-button]")) {
                return;
            }

            const copyButton = document.createElement("button");
            copyButton.innerText = "Copy";
            copyButton.classList.add(
                "button",
                "is-primary",
                "is-outlined",
                "is-copy-button"
            );

            const codeText = codeElement.innerText;

            copyButton.addEventListener("click", () => {
                // Copy the code into the clipboard
                const $input = document.createElement("textarea");
                document.body.appendChild($input);
                $input.value = codeText;
                $input.select();
                document.execCommand("copy");
                $input.remove();

                // Notify the user
                copyButton.innerText = "Copied";
                // Revert the button text
                window.setTimeout(() => {
                    copyButton.innerText = "Copy";
                }, 1000)
            })

            codeElement.appendChild(copyButton);
        });
}

// The page is ready to execute our code
if (document.readyState === "complete") {
    setupCopyCode();
    // The page is not ready, wait for it to be ready
} else {
    document.onreadystatechange = () => {
        if (document.readyState === "complete") {
            setupCopyCode();
        }
    }
}
