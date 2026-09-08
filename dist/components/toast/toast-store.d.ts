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
export declare const toasts: import("svelte/store").Writable<ToastItem[]>;
export declare function dismissToast(id: string): void;
export declare const toast: {
    success(title: string, opts?: ToastOptions): string;
    error(title: string, opts?: ToastOptions): string;
    warning(title: string, opts?: ToastOptions): string;
    info(title: string, opts?: ToastOptions): string;
    loading(title: string, opts?: ToastOptions): string;
    dismiss: typeof dismissToast;
    clear(): void;
};
