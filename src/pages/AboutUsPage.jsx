import { useLayoutContext } from "../context/layoutContext";

export default function AboutUsPage() {
  const { toggleDarkMode } = useLayoutContext();

  return (
    <main data-dark-mode={toggleDarkMode}>
      <div className="container pt-3">
        <h2>About Us</h2>
      </div>
    </main>
  );
}
