// trim string if too long but keep ext
function makeSmallKeepExt(str) {
if(!str) return 'nil';
if(str.length && str.length < 34) return str;

  const maxStringLength = 34;
  const lastDotIndex = str.lastIndexOf('.');
  let namePart = str;
  let extensionPart = '';

  if (lastDotIndex > -1 && lastDotIndex < str.length - 1) {
    namePart = str.substring(0, lastDotIndex);
    extensionPart = str.substring(lastDotIndex + 1);
    if (extensionPart.length > 4) {
      extensionPart = extensionPart.substring(0, 4);
    }
  }

  const maxLength = maxStringLength - (extensionPart.length > 0 ? 4 + extensionPart.length : 3);
  if (namePart.length > maxLength) {
    namePart = namePart.substring(0, maxLength) + '...';
  } else if (extensionPart.length > 0) {
    namePart += '...';
  }

  return extensionPart.length > 0 ? namePart + '.' + extensionPart : namePart;
}

//const truncatedString = truncateStringWithExtension(originalString);
