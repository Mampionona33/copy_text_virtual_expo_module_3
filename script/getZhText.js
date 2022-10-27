(() => {
  const selectedText = window.getSelection(0);
  const selectedTextToString = selectedText.toString();

  const anchorNode = selectedText.anchorNode.parentElement;

  const DOT = '•';

  let formatList = '';

  let outPutText = ' ';
  let prevText = '';
  let nbTotalText = 0;

  if (anchorNode.tagName.match(/li/gi)) {
    console.log(anchorNode.tagName);
    formatList = DOT + ' ' + selectedTextToString;
    outPutText = formatList.replace(/\n/g, '\n' + DOT + ' ');
  } else {
    if (selectedTextToString.length > 0) {
      outPutText = outPutText.concat(selectedTextToString, '\n');
    }
  }

  chrome.storage.sync.get(['Zh_text'], (result) => {
    // If there is a stored data
    if (Object.keys(result).length > 0) {
      prevText = result.Zh_text;

      // clacul sum of sotred data + selected data
      nbTotalText = outPutText.length + prevText.length;

      if (nbTotalText < 1700) {
        outPutText = prevText.concat(outPutText);
        chrome.storage.sync.set({ Zh_text: outPutText }, () =>
          console.log(outPutText)
        );
      } else {
        alert(`Nombre de caractère pour idp text EN  atteint ${nbTotalText}`);
      }
    } else {
      // if there is data stored
      chrome.storage.sync.set({ Zh_text: outPutText }, () =>
        console.log(outPutText)
      );
    }
  });
})();
