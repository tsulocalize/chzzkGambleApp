import "./ContentBox.css";

export default function ContentBox({ title, content, tag, tagColor }) {
  return (
    <div className="content-box">
      <h2>{title}</h2>
      <p>{content}</p>
      {tag && <span className="tag" style={{backgroundColor: tagColor}}>{tag}</span>}
    </div>
  );
}
