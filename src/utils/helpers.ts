
function getTrimesterStage(week: number): string {
    if (week >= 1 && week <= 13) return "1st Trimester";
    if (week >= 14 && week <= 26) return "2nd Trimester";
    if (week >= 27 && week <= 40) return "3rd Trimester";
    return "Unknown Trimester";
}

export function getMonthAndYearDateShort(date: string | null): string {
    if (!date) return "A while ago";
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return new Date(date).toLocaleDateString(undefined, options);
}


function getReadableDate(date: string | null): string {
    if (!date) return "No Due Date";
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

function getPregnancyProgress(currentWeek: number | null): string | any {
    if (currentWeek === null || currentWeek < 1) return "0%";
    if (currentWeek > 40) return "100%";
    return Math.round((currentWeek / 40) * 100) + "%";
}

export function getRealDateTime(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000; // years
    if (interval > 1) {
        return Math.floor(interval) >= 1 ? `${Math.floor(interval)} year${Math.floor(interval) === 1 ? '' : 's'} ago` : "A while ago";
    }
    interval = seconds / 2592000; // months
    if (interval > 1) {
        return `${Math.floor(interval)} month${Math.floor(interval) === 1 ? '' : 's'} ago`;
    }
    interval = seconds / 604800; // weeks
    if (interval > 1) {
        return `${Math.floor(interval)} week${Math.floor(interval) === 1 ? '' : 's'} ago`;
    }
    interval = seconds / 86400; // days
    if (interval > 1) {
        return `${Math.floor(interval)} day${Math.floor(interval) === 1 ? '' : 's'} ago`;
    }
    interval = seconds / 3600; // hours
    if (interval > 1) {
        return `${Math.floor(interval)} hour${Math.floor(interval) === 1 ? '' : 's'} ago`;
    }
    interval = seconds / 60; // minutes
    if (interval > 1) {
        return `${Math.floor(interval)} minute${Math.floor(interval) === 1 ? '' : 's'} ago`;
    }
    return "Just now";
}



export {
    getTrimesterStage,
    getReadableDate,
    getPregnancyProgress
}
