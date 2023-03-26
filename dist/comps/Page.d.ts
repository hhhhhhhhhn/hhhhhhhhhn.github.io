import { ComponentChildren } from "preact";
type props = {
    children: ComponentChildren;
    title?: string;
    description?: string;
    stylesheets?: string[];
};
export default function Page({ children, title, description, stylesheets }: props): import("preact").JSX.Element;
export {};
