export default `
.breadcrumb {
  display: flex;
  overflow-y: auto;
  padding: 0 .5em;
}

.breadcrumb div {
  white-space: nowrap;
}

.breadcrumb div:not(:last-child)::after {
  padding: 0 .25em;
  content: "/";
}

.breadcrumb a {
  display: inline-block;
  padding: .25em;
  white-space: nowrap;
}
`
