import type { JSXElement } from "solid-js";

type NavbarButtonProps = {
  disabled?: boolean;
  highlight?: boolean;
  icon?: JSXElement;
  label: string;
  onClick?: () => void;
};

export default function NavbarButton(props: NavbarButtonProps): JSXElement {
  return (
    <div class="flex flex-col items-center w-16">
      <button
        class="btn btn-sm"
        classList={{ "btn-soft btn-primary": props.highlight, "btn-ghost": !props.highlight }}
        disabled={props.disabled}
        onClick={props.onClick}
        type="button"
      >
        {props.icon}
      </button>
      <span class="text-xs text-center mt-2 truncate w-full">{props.label}</span>
    </div>
  );
}
