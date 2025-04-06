import UserCard from "./UserCard";

interface User {
  id: number;
  name: string;
  role: string;
  description: string;
  avatar?: string;
  skills?: string[];
}

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <section aria-labelledby="user-list-heading">
      <h2 id="user-list-heading" className="sr-only">
        List of users
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}
