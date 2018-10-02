const UICtrl = (function() {
    const UISelectors = {
        form: 'form',
        mainTextInput: '#mainText',
        secondaryTextInput: '#secondaryText',
        mainPreview: '#mainPreview',
        secondaryPreview: '#secondaryPreview'
    };
    const mainPreview = document.querySelector(UISelectors.mainPreview);
    const secondaryPreview = document.querySelector(UISelectors.secondaryPreview);

    return {
        getUISelectors: function() {
            return UISelectors;
        },

        updatePreview: function(e) {
            UICtrl.resetPreviewClass();
            mainPreview.innerText = document.querySelector(UISelectors.mainTextInput).value;
            secondaryPreview.innerText = document.querySelector(UISelectors.secondaryTextInput).value;

        },

        displaySuccess: function() {
            UICtrl.resetPreviewClass();
            UICtrl.updatePreview();
            mainPreview.className = 'preview success';
            secondaryPreview.className = 'preview success';
        },

        displayError: function( index, text1, text2, highlightRemaining = false ) {
            UICtrl.resetPreviewClass();
            let previews = [ { preview: mainPreview, text: text1 }, { preview: secondaryPreview, text: text2 }];
            previews.forEach( (item) => {
                let validSlice = item.text.slice(0, index);
                let errorChar = highlightRemaining ? item.text[index] + item.text.slice(index +1) : item.text[index] || '';
                if ( errorChar == 'undefined' ) errorChar = '';
                let remaining = highlightRemaining ? '' : item.text.slice(index +1);
                let newsPreview = `
                    ${validSlice}<span class='red'>${errorChar}</span>${remaining}
                `;
                item.preview.innerHTML = newsPreview;
            });
        },

        resetPreviewClass: function() {
            mainPreview.className = 'preview';
            secondaryPreview.className ='preview';
        },

        trimLineBreaks: function(str){
            while ( str[str.length -1 ] == '\n' ) {
                str = str.slice(0, str.length -1);
            }
            return str;
        }
    };
})();

export default UICtrl;