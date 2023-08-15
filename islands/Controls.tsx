import { type Signal } from "@preact/signals";

type Props = {
  searchTerm: Signal<string>;
  order: Signal<Order>;
}

export type Order = "publication" | "birth" | "alphabetical";

export default ({ searchTerm, order }: Props) => (
  <div className="controls">
    <input
      name="search-input"
      type="text"
      placeholder="Search authors"
      aria-label="Search Authors"
      onInput={(event) => searchTerm.value = event.currentTarget.value}
    />
    <select
      name="order-authors"
      aria-label="Order Authors"
      onChange={(event) => order.value = event.currentTarget.value as Order}
    >
      <option value="publication">chronological (first publication)</option>
      <option value="birth">chronological (birth)</option>
      <option value="alphabetical">alphabetical</option>
    </select>
  </div>
);
