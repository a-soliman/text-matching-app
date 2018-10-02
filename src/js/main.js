
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
            const preview = e.target.parentElement.parentElement.parentElement.querySelector('.preview');
            preview.innerText = UICtrl.trimLineBreaks(e.target.value);

        },

        resetPreview: function() {

        },

        displaySuccess: function() {
            UICtrl.resetPreview();
            UICtrl.resetPreviewClass();
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
const App = (function(UICtrl) {
    const UISelectors = UICtrl.getUISelectors();

    // Load event listeners
    const loadEventListeners = function() {
        document.querySelector(UISelectors.form).addEventListener('submit', matchText);
        document.querySelector(UISelectors.mainTextInput).addEventListener('keyup', UICtrl.updatePreview);
        document.querySelector(UISelectors.secondaryTextInput).addEventListener('keyup', UICtrl.updatePreview);
    }

    const matchText = (e) => {
        e.preventDefault();
        const mainText = UICtrl.trimLineBreaks(e.target.querySelector('#mainText').value);
        const secondaryText = UICtrl.trimLineBreaks(e.target.querySelector('#secondaryText').value);

        /* VALIDATE INPUT */
        if ( !validateInputs( mainText, secondaryText ) ) return false;

        /* MATCH LENGTH */

        /* MATCH */
        for ( let i = 0; i < mainText.length; i++ ) {
            if ( mainText[i] !== secondaryText[i] ) {
                return UICtrl.displayError(i, mainText, secondaryText);
            }
        }
        
        if ( mainText.length === secondaryText.length ) {
            return UICtrl.displaySuccess();
        }

        else if ( mainText.length > secondaryText.length ) {
            return UICtrl.displayError(secondaryText.length -1, mainText, secondaryText);
        }
        else if ( mainText.length < secondaryText.length ) {
            return UICtrl.displayError(mainText.length, mainText, secondaryText, true);
        }
        
    }

    const validateInputs = (text1, text2) => {
        /* VALIDATE EXISTANCE */
        if ( text1.length < 1 || text2.length < 1 ) return false;
    
        return true;
    }

    return {
        init: function() {
            console.log('INIT');
            loadEventListeners();
        }
    }
})(UICtrl);

App.init();
