const form = document.querySelector('form');
const mainTextInput = document.querySelector('#mainText');
const secondaryTextInput = document.querySelector('#secondaryText');
const mainPreview = document.querySelector('#mainPreview');
const secondaryPreview = document.querySelector('#secondaryPreview');

form.addEventListener('submit', matchText);
mainTextInput.addEventListener('keyup', updatePreview);
secondaryTextInput.addEventListener('keyup', updatePreview);

function updatePreview(e) {
    resetPreviewClass();
    const preview = e.target.parentElement.parentElement.parentElement.querySelector('.preview');
    preview.innerText = trimLineBreaks(e.target.value);
}

function matchText(e) {
    e.preventDefault();
    const mainText = trimLineBreaks(e.target.querySelector('#mainText').value);
    const secondaryText = trimLineBreaks(e.target.querySelector('#secondaryText').value);

    /* VALIDATE INPUT */
    if ( !validateInputs( mainText, secondaryText ) ) return false;

    /* MATCH LENGTH */

    /* MATCH */
    for ( let i = 0; i < mainText.length; i++ ) {
        if ( mainText[i] !== secondaryText[i] ) {
            return generateError(i, mainText, secondaryText);
        }
    }
    
    if ( mainText.length === secondaryText.length ) {
        return generateSuccess();
    }

    else if ( mainText.length > secondaryText.length ) {
        return generateError(secondaryText.length -1, mainText, secondaryText);
    }
    else if ( mainText.length < secondaryText.length ) {
        return generateError(mainText.length, mainText, secondaryText, true);
    } 
    
}

function validateInputs(text1, text2) {
    /* VALIDATE EXISTANCE */
    if ( text1.length < 1 || text2.length < 1 ) return false;

    return true;
}

function generateError(index, text1, text2, highlightRemaining = false) {
    resetPreviewClass();
    let previews = [ { preview: mainPreview, text: text1 }, { preview: secondaryPreview, text: text2 }];
    previews.forEach( (item) => {
        let validSlice = item.text.slice(0, index);
        let errorChar = highlightRemaining ? item.text[index] + item.text.slice(index +1) : item.text[index];
        let remaining = highlightRemaining ? '' : item.text.slice(index +1);
        let newsPreview = `
            ${validSlice}<span class='red'>${errorChar}</span>${remaining}
        `;
        item.preview.innerHTML = newsPreview;
    });
};

function generateSuccess() {
    resetPreview();
    const mainPreview = mainTextInput.parentElement.parentElement.parentElement.querySelector('.preview');
    const secondaryPreview = secondaryTextInput.parentElement.parentElement.parentElement.querySelector('.preview');
    resetPreviewClass();
    mainPreview.className = 'preview success';
    secondaryPreview.className = 'preview success';
}

function resetPreview() {
    mainPreview.innerText = trimLineBreaks(mainTextInput.value);
    secondaryPreview.innerText = trimLineBreaks(secondaryTextInput.value);
}

function resetPreviewClass() {
    mainPreview.className = 'preview';
    secondaryPreview.className ='preview';
}

function trimLineBreaks(str) {
    while ( str[str.length -1 ] == '\n' ) {
        str = str.slice(0, str.length -1);
    }
    return str;
}