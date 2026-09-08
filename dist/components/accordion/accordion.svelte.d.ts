export interface AccordionItem {
    value: string;
    title: string;
    content?: string;
    disabled?: boolean;
}
import { Accordion } from 'bits-ui';
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
declare const Accordion: $$__sveltets_2_IsomorphicComponent<{
    items?: AccordionItem[];
    value?: string;
    class?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    content: {
        item: AccordionItem;
    };
}, {}, string>;
type Accordion = InstanceType<typeof Accordion>;
export default Accordion;
