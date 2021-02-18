import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        Sorry, that didn't work
        <RequestReset />
      </div>
    );
  }
  console.log(query.token);
  return (
    <div>
      <Reset token={query.token} />
    </div>
  );
}
