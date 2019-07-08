export const encodeForFirebaseKey = s => {
  return new Promise((resolve, reject) => {
    if (typeof s == "string") {
      const convert = s
        .replace("_", "__")
        .replace(".", "_P")
        .replace("$", "_D")
        .replace("#", "_H")
        .replace("[", "_O")
        .replace("]", "_C")
        .replace("/", "_S");

      resolve(convert);
    } else {
      reject(new Error("문자열이 아닙니다."));
    }
  });
};

export const decodeFromFirebaseKey = s => {
  let i = 0;
  let ni;
  let res = "";
  while ((ni = s.indexOf("_", i)) != -1) {
    res += s.substring(i, ni);
    if (ni + 1 < s.length) {
      let nc = s.charAt(ni + 1);
      if (nc === "_") {
        res += "_";
      } else if (nc === "P") {
        res += ".";
      } else if (nc === "D") {
        res += "$";
      } else if (nc === "H") {
        res += "#";
      } else if (nc === "O") {
        res += "[";
      } else if (nc === "C") {
        res += "]";
      } else if (nc === "S") {
        res += "/";
      } else {
        // this case is due to bad encoding
      }
      i = ni + 2;
    } else {
      // this case is due to bad encoding
      break;
    }
  }
  res += s.substring(i);
  return res;
};
