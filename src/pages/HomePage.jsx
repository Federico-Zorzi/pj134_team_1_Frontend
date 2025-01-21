import { useDataContext } from "../context/dataContext";

export default function HomePage() {
  //* take data from global context
  const { test } = useDataContext();

  return (
    <main>
      <div className="container pt-3">
        <h2>Homepage</h2>
      </div>
    </main>
  );
}
