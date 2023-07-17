function getDurationStrFor(duration: number): string {
    const seconds = duration / 1000;
    const minutes = seconds / 60;
    const hours = Math.floor(minutes / 60);
    let durationStr = "";
    const minutesVal = Math.floor(minutes % 60);
    const secondsVal = Math.floor(seconds % 60);

    if (hours > 0) { durationStr += `${hours} hrs ` }
    if (minutesVal > 0) { durationStr += `${minutesVal} mins ` }
    if (secondsVal >= 0) { durationStr += `${secondsVal} secs` }

    return durationStr;
}

export function getDurationStrForDates(start: Date, stop?: Date): string {
    const duration = (stop || new Date()).valueOf() - start.valueOf();
    return getDurationStrFor(duration);
}
