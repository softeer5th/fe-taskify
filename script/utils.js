export function timeCalculator(pastDate, presentDate) {
    const past = pastDate.getTime();
    const present = presentDate.getTime();

    const timeDiff = Math.floor((present - past) / 1000);
    
    if (timeDiff < 60) return { time: timeDiff, type: "초" };
    else if (timeDiff < 3600) return { time: Math.floor(timeDiff / 60), type: "분" };
    else if (timeDiff < 86400) return { time: Math.floor(timeDiff / 3600), type: "시간" };
    else return { time: Math.floor(timeDiff / 86400), type: "일" };
}
