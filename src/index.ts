import {formattedDate} from "./utils";

interface Streak {
    currentCount: number
    startDate: string
    lastLoginDate: string
}

// Used when storing in localStorage
const KEY = 'streak';

const shouldIncrementOrResetStreakCount = (currentDate: Date, lastLoginDate: string) : 'increment' | undefined => {
    const difference = currentDate.getDate() - parseInt(lastLoginDate.split("/")[1]);
    // This means they logged in the day after the currentDate
    if (difference === 1) return 'increment';
    // Otherwise they logged in after a day, which would break the streak
    return undefined;
}

export function streakCounter(storage: Storage, date: Date): Streak {
    const streakInLocalStorage = storage.getItem(KEY);
    if (streakInLocalStorage) {
        try {
            const storedStreak = JSON.parse(streakInLocalStorage || "");
            const state = shouldIncrementOrResetStreakCount(date, storedStreak.lastLoginDate);
            const SHOULD_INCREMENT = state === "increment";

            if (SHOULD_INCREMENT) {
                const updatedStreak = {
                    ...storedStreak,
                    currentCount: storedStreak.currentCount + 1,
                    lastLoginDate: formattedDate(date)
                }
                return updatedStreak;
            }

            return storedStreak;
        }
        catch (error) {
            console.error("Failed to parse streak from localStorage");
        }
    }

    const streak = {
        currentCount: 1,
        startDate: formattedDate(date),
        lastLoginDate: formattedDate(date)
    }

    // store in the localStorage
    storage.setItem(KEY, JSON.stringify(streak));

    return streak;
}