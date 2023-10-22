import type { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
}

export default ({ children }: Props) => (
  <div className="section-wrapper">
    <div className="section">{children}</div>
  </div>
);
