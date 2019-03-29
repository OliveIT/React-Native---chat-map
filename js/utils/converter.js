export function to3dArray(arrays, length = 3) {
  const newArray = [];
  while (arrays.length > 0) {
    newArray.push(arrays.splice(0, length));
  }

  return newArray;
}

export function to4dArray(arrays, length = 4) {
  const newArray = [];
  while (arrays.length > 0) {
    newArray.push(arrays.splice(0, length));
  }

  return newArray;
}

export function arrayGroup(arrays, length = 3) {
  const newArray = [];
  while (arrays.length > 0) {
    newArray.push(arrays.splice(0, length));
  }

  return newArray;
}

export function array4Group(arrays, length = 4) {
  const newArray = [];
  while (arrays.length > 0) {
    newArray.push(arrays.splice(0, length));
  }

  return newArray;
}

export function getFilePathExtension(path = '') {
  return path.match(/\.([^\./\?]+)($|\?)/)[1];
}

export function getFileName(path = '') {
  if (path === null) return +new Date();
  return path.match(/(\w+)(\.\w+)+(?!.*(\w+)(\.\w+)+)/)[0];
}
