import  UICtrl  from './UICtrl';

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

export default App;

