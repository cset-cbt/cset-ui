export interface CommandItem {
    id: string;
    label: string;
    shortcut?: string;
    onSelect: () => void;
}
export interface CommandGroup {
    title: string;
    items: CommandItem[];
}
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const CommandPalette: $$__sveltets_2_IsomorphicComponent<{
    open?: boolean;
    placeholder?: string;
    groups?: CommandGroup[];
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type CommandPalette = InstanceType<typeof CommandPalette>;
export default CommandPalette;
