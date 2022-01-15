import { connectToDatabase } from "../util/mongodb";

export default function Posts({ users }) {
  console.log(users);
  return (
    <div>
      <h1>Users</h1>
      <p>
        <small>(only retrieving 10)</small>
      </p>
      <ul>
        {users.map((user) => (
          <li>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const users = await db.collection("users").find({}).limit(20).toArray();
  console.log(users);
  return {
    props: {
      users: JSON.parse(JSON.stringify(users))
    }
  };
}
