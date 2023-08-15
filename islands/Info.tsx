import { type ComponentChildren } from "preact";

type Props = {
  pageId: string;
  pages: PageDetails[];
  children: ComponentChildren;
};

export type PageDetails = {
  id: string;
  title: string;
  url: string;
};

export default ({ pageId, pages, children }: Props) => (
  <div className="info">
    <select className="submenu" aria-label="Page" onChange={(event) => window.location.href = event.currentTarget.value}>
      {pages.map((page) => (
        <option selected={page.id === pageId} value={page.url}>
          {page.title}
        </option>
      ))}
    </select>
    {children}
    <nav className="submenu">
      <div>
        {pages.map((page) => (
          <a className={page.id === pageId ? "active" : ""} href={page.url}>
            {page.title}
          </a>
        ))}
      </div>
    </nav>
  </div>
);
