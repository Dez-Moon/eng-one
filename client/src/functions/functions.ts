export const getTimeLastOnline = (lastOnline: string) => {
  const myFunc = (num: string) => {
    return Number(num);
  };
  let time = {
    seconds: [0, null],
    minutes: [0, null],
    hours: [0, null],
    days: [0, null],
  } as any;
  time.seconds[0] = Math.floor((Date.now() - Number(lastOnline)) / 1000);

  if (time.seconds[0] < 60) {
    const intArr = Array.from(String(time.seconds[0]), myFunc);
    if (intArr[intArr.length - 1] == 1) {
      time.seconds[1] = "ceкунду";
    }
    if (intArr[intArr.length - 1] > 1 && intArr[intArr.length - 1] < 5) {
      debugger;
      time.seconds[1] = "ceкунди";
    }
    if (
      intArr[intArr.length - 1] > 4 ||
      intArr[intArr.length - 1] == 0 ||
      intArr[intArr.length - 2] == 1
    ) {
      time.seconds[1] = "секунд";
    }
  }
  if (time.seconds[0] >= 60) {
    time.minutes[0] = Math.floor(time.seconds[0] / 60);
    time.seconds[0] = 0;
    const intArr = Array.from(String(time.minutes[0]), myFunc);
    if (intArr[intArr.length - 1] == 1) {
      time.minutes[1] = "хвилину";
    }
    if (intArr[intArr.length - 1] > 1 && intArr[intArr.length - 1] < 5) {
      time.minutes[1] = "хвилини";
    }
    if (
      intArr[intArr.length - 1] > 4 ||
      intArr[intArr.length - 1] == 0 ||
      intArr[intArr.length - 2] == 1
    ) {
      time.minutes[1] = "хвилин";
    }
  }
  if (time.minutes[0] >= 60) {
    time.hours[0] = Math.floor(time.minutes[0] / 60);
    time.minutes[0] = 0;
    const intArr = Array.from(String(time.hours[0]), myFunc);
    if (intArr[intArr.length - 1] == 1) {
      time.hours[1] = "годину";
    }
    if (intArr[intArr.length - 1] > 1 && intArr[intArr.length - 1] < 5) {
      time.hours[1] = "години";
    }
    if (
      intArr[intArr.length - 1] > 4 ||
      intArr[intArr.length - 1] == 0 ||
      intArr[intArr.length - 2] == 1
    ) {
      time.hours[1] = "годин";
    }
  }
  if (time.hours[0] >= 24) {
    time.days[0] = Math.floor(time.hours[0] / 24);
    time.hours[0] = 0;
    const intArr = Array.from(String(time.days[0]), myFunc);
    if (intArr[intArr.length - 1] == 1) {
      time.days[1] = "день";
    }
    if (intArr[intArr.length - 1] > 1 && intArr[intArr.length - 1] < 5) {
      time.days[1] = "дні";
    }
    if (
      intArr[intArr.length - 1] > 4 ||
      intArr[intArr.length - 1] == 0 ||
      intArr[intArr.length - 2] == 1
    ) {
      time.days[1] = "днів";
    }
  }
  const fraze = `Був у мережі ${
    (time.days[0] && time.days[0] + " " + time.days[1]) ||
    (time.hours[0] && time.hours[0] + " " + time.hours[1]) ||
    (time.minutes[0] && time.minutes[0] + " " + time.minutes[1]) ||
    (time.seconds[0] && time.seconds[0] + " " + time.seconds[1])
  } тому`;
  return fraze;
};

export const getTimeCurrentLocation = (date: string) => {
  const currentDate = new Date();
  const currentTimeZone = -currentDate.getTimezoneOffset() / 60;
  let time = date.substr(11, 5).split(":") as any;
  let hour = Number(time[0]) + currentTimeZone;
  if (hour > 24) {
    hour = hour - 24;
  }
  time[0] = String(hour);
  time = time.join(":");
  return time;
};
