export interface TabItem {
    value: string;
    label: string;
    disabled?: boolean;
}
import { Tabs } from 'bits-ui';
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
type $$__sveltets_2_PropsWithChildren<Props, Slots> = Props & (Slots extends {
    default: any;
} ? Props extends Record<string, never> ? any : {
    children?: any;
} : {});
declare const Tabs: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    value?: string;
    items?: TabItem[];
    variant?: "segmented" | "line";
    onValueChange?: ((val: string) => void) | undefined;
    class?: string;
}, {
    default: {};
}>, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}, {}, string>;
type Tabs = InstanceType<typeof Tabs>;
export default Tabs;
