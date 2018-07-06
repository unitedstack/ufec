// 简单的深拷贝函数
function clone(objectToBeCloned) {
  // Basis.
  if (!(objectToBeCloned instanceof Object) || objectToBeCloned instanceof Function) {
    return objectToBeCloned;
  }

  let objectClone;

  // Filter out special objects.
  const Constructor = objectToBeCloned.constructor;
  switch (Constructor) {
    // Implement other special objects here.
    case RegExp:
      objectClone = new Constructor(objectToBeCloned);
      break;
    case Date:
      objectClone = new Constructor(objectToBeCloned.getTime());
      break;
    default:
      objectClone = new Constructor();
  }

  // Clone each property.
  for (const prop in objectToBeCloned) {
    objectClone[prop] = clone(objectToBeCloned[prop]);
  }

  return objectClone;
}

export default clone;
