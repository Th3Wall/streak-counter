import {formattedDate} from "./utils";

interface Streak {
    currentCount: number
    startDate: string
    lastLoginDate: string
}

// Used when storing in localStorage
const KEY = 'streak'

export function streakCounter(storage: Storage, date: Date): Streak {
    const streakInLocalStorage = storage.getItem(KEY);
    if (streakInLocalStorage) {
        try {
            const storedStreak = JSON.parse(streakInLocalStorage || "");
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