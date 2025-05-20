import css from "./ErrorMessage.module.css"
export default function ErrorMessage({ errorText }) {
  return (
    <div className={css.errorPadding}>
      <p>{errorText}</p>
      <p>Try reload the page</p>
    </div>
  );
}
