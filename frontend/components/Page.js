import Header from "./Header";

export default function IndexPage({ children }) {
  return (
    <div>
      <Header />
      <h2>Page componsner</h2>
      {children}
    </div>
  );
}
