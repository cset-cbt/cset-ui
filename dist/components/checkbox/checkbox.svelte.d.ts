import { Checkbox } from 'bits-ui';
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
declare const Checkbox: $$__sveltets_2_IsomorphicComponent<{
    checked?: boolean;
    name?: string | undefined;
    label?: string;
    disabled?: boolean;
    onCheckedChange?: ((checked: boolean) => void) | undefined;
    class?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type Checkbox = InstanceType<typeof Checkbox>;
export default Checkbox;
