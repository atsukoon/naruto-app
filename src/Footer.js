export default function Footer(props) {
  const { page, limit, prev, next, length } = props;
  return (
    <div className="pager">
      <button className="prev" disabled={page === 1} onClick={prev}>
        Previous
      </button>
      <span className="page-number">{page}</span>
      <button className="next" disabled={limit > length} onClick={next}>
        Next
      </button>
    </div>
  );
}
