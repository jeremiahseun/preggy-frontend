
function getTrimesterStage(week: number): string {
    if (week >= 1 && week <= 13) return "1st Trimester";
    if (week >= 14 && week <= 26) return "2nd Trimester";
    if (week >= 27 && week <= 40) return "3rd Trimester";
    return "Unknown Trimester";
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


export {
    getTrimesterStage,
    getReadableDate,
    getPregnancyProgress
}
