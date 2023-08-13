import s from "./style.module.css";

export function Logo({ image, title, subtitles }) {
  return (
    <>
      <div className={s.container}>
        <img src={image} className={s.img} alt="logo"></img>
        <span className={s.title}>{title}</span>
      </div>
      <span className={s.subtitles}>{subtitles}</span>
    </>
  );
}
