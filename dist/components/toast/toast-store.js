import { writable } from 'svelte/store';
export const toasts = writable([]);
function addToast(type, title, opts = {}) {
    const id = `toast_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const duration = opts.duration ?? (type === 'error' ? 6000 : 4000);
    const item = {
        id,
        type,
        title,
        description: opts.description,
        action: opts.action,
        duration,
        createdAt: Date.now()
    };
    toasts.update((current) => [item, ...current.slice(0, 4)]);
    if (type !== 'loading' && duration > 0) {
        setTimeout(() => {
            dismissToast(id);
        }, duration);
    }
    return id;
}
export function dismissToast(id) {
    toasts.update((current) => current.filter((t) => t.id !== id));
}
export const toast = {
    success(title, opts) {
        return addToast('success', title, opts);
    },
    error(title, opts) {
        return addToast('error', title, opts);
    },
    warning(title, opts) {
        return addToast('warning', title, opts);
    },
    info(title, opts) {
        return addToast('info', title, opts);
    },
    loading(title, opts) {
        return addToast('loading', title, { ...opts, duration: 0 });
    },
    dismiss: dismissToast,
    clear() {
        toasts.set([]);
    }
};
