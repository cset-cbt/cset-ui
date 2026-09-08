export interface RadioItem {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}
import { RadioGroup } from 'bits-ui';
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
declare const RadioGroup: $$__sveltets_2_IsomorphicComponent<{
    value?: string;
    items?: RadioItem[];
    name?: string | undefined;
    onValueChange?: ((val: string) => void) | undefined;
    class?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type RadioGroup = InstanceType<typeof RadioGroup>;
export default RadioGroup;
