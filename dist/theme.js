const STORAGE_KEY = 'cset-theme';
export function readTheme() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark')
            return stored;
    }
    catch {
        // localStorage unavailable (e.g. Safari private mode) — fall through.
    }
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
export function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    }
    catch {
        // Ignore write failures — theme still applies for this page view.
    }
}
