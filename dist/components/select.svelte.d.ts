export type SelectOption = {
    value: string;
    label: string;
    color?: string;
    disabled?: boolean;
};
import { Select } from 'bits-ui';
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
declare const Select: $$__sveltets_2_IsomorphicComponent<{
    label?: string;
    items?: SelectOption[];
    value?: string;
    placeholder?: string;
    name?: string | undefined;
    disabled?: boolean;
    required?: boolean;
    size?: "sm" | "md" | "field";
    onValueChange?: ((val: string) => void) | undefined;
    class?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type Select = InstanceType<typeof Select>;
export default Select;
