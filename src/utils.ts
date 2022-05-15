export const formattedDate = (date: Date) : string => {
    return date.toLocaleDateString("en-US")
}

export const shouldIncrementOrResetStreakCount = (
    currentDate: Date,
    lastLoginDate: string
) : 'increment' | 'reset' | 'none' => {
    const difference = currentDate.getDate() - parseInt(lastLoginDate.split("/")[1]);
    // This means they logged in the day after the currentDate
    if (difference === 1) return 'increment';
    // Same-day login, do nothing
    if (difference === 0) return 'none';
    // Otherwise they logged in after a day, which would break the streak
    return 'reset';
}