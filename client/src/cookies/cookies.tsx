export const cookies = {
  setCookie(name: string, value: string, days?: number) {
    let date = new Date();
    if (days) {
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + "; " + expires + "; path=/";
    } else {
      document.cookie = name + "=" + value + "; " + "; path=/";
    }
  },
  getCookie(name: string) {
    const cName = name + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split("; ");
    let res: any;
    cArr.forEach((val) => {
      if (val.indexOf(cName) === 0) res = val.substring(cName.length);
    });
    return res;
  },
  deleteCookie(name: string) {
    document.cookie = name + "=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  },
};
