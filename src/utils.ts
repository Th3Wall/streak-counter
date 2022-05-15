export interface Streak {
    currentCount: number
    startDate: string
    lastLoginDate: string
}

// Used when storing in localStorage
export const KEY = 'streak';

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

export const buildStreak = (
    date: Date,
    overrideDefaults?: Partial<Streak>
) => {
    const defaultStreak = {
        currentCount: 1,
        startDate: formattedDate(date),
        lastLoginDate: formattedDate(date)
    }
    return {
        ...defaultStreak,
        ...overrideDefaults
    }
}

export const updateStreak = (storage: Storage, streak: Streak): void => {
    storage.setItem(KEY, JSON.stringify(streak));
}