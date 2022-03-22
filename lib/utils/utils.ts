export const isUndefinedOrNull = (value: any): boolean => {
  return (
    undefined === value ||
    null === value ||
    ("number" === typeof value && isNaN(value))
  );
};

export const isUndefinedOrNullOrEmpty = (value: any): boolean => {
  if (isUndefinedOrNull(value)) {
    return true;
  }
  if ("string" === typeof value) {
    if (0 >= value.length) {
      return true;
    }
  } else if (Array.isArray(value)) {
    if (0 >= value.length) {
      return true;
    }
  } else if ("object" === typeof value) {
    if (0 >= Object.keys(value).length) {
      return true;
    }
  }
  return false;
};

export const sortObject = (obj: any) => {
  if ("object" == typeof obj) {
    const sorted = Array.isArray(obj) ? [] : ({} as any);
    Object.keys(obj)
      .sort()
      .forEach(function (key) {
        if (obj[key] == null) sorted[key] = obj[key];
        else if (
          "object" == typeof obj[key] &&
          0 < Object.keys(obj[key]).length
        ) {
          sorted[key] = sortObject(obj[key]);
        } else {
          if (Array.isArray(sorted)) {
            sorted.push(obj[key]);
          } else {
            sorted[key] = obj[key];
          }
        }
      });
    return sorted;
  }
  return obj;
};

export const objectToArray = (obj: any) => {
  const ret: any[] = [];
  if (obj) {
    Object.keys(obj).forEach(function (key) {
      ret.push(obj[key]);
    });
  }
  return ret;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const convertObject = (object: any, convert: any, depth: any) => {
  if ("object" == typeof object) {
    const stringified = Array.isArray(object) ? [] : ({} as any);
    Object.keys(object).forEach(function (key) {
      if (
        "object" == typeof object[key] &&
        0 < Object.keys(object[key]).length
      ) {
        stringified[key] = sortObject(object[key]);
      } else {
        const value =
          "function" === typeof object.toString
            ? object.toString()
            : JSON.stringify(object);
        if (Array.isArray(stringified)) {
          stringified.push(value);
        } else {
          stringified[key] = value;
        }
      }
    });
    return stringified;
  }
  return object;
};
