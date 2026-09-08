import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  action?: ToastAction;
  duration?: number;
  createdAt: number;
}

export interface ToastOptions {
  description?: string;
  action?: ToastAction;
  duration?: number;
}

export const toasts = writable<ToastItem[]>([]);

function addToast(type: ToastType, title: string, opts: ToastOptions = {}): string {
  const id = `toast_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  const duration = opts.duration ?? (type === 'error' ? 6000 : 4000);

  const item: ToastItem = {
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

export function dismissToast(id: string) {
  toasts.update((current) => current.filter((t) => t.id !== id));
}

export const toast = {
  success(title: string, opts?: ToastOptions) {
    return addToast('success', title, opts);
  },
  error(title: string, opts?: ToastOptions) {
    return addToast('error', title, opts);
  },
  warning(title: string, opts?: ToastOptions) {
    return addToast('warning', title, opts);
  },
  info(title: string, opts?: ToastOptions) {
    return addToast('info', title, opts);
  },
  loading(title: string, opts?: ToastOptions) {
    return addToast('loading', title, { ...opts, duration: 0 });
  },
  dismiss: dismissToast,
  clear() {
    toasts.set([]);
  }
};
