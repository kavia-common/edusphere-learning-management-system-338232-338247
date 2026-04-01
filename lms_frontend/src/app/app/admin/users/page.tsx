import { Card, CardBody, CardHeader, Select } from "@/components/ui";

const USERS = [
  { id: "u1", name: "Student User", email: "student@example.com", role: "student" },
  { id: "u2", name: "Instructor User", email: "instructor@example.com", role: "instructor" },
  { id: "u3", name: "Admin User", email: "admin@example.com", role: "admin" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="h1">Users</h1>
        <p className="muted">Admin: manage roles and access (demo).</p>
      </div>

      <Card>
        <CardHeader>
          <div>
            <p className="h2">Directory</p>
            <p className="muted">{USERS.length} users</p>
          </div>
          <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
            Export (demo)
          </span>
        </CardHeader>
        <CardBody>
          <div className="overflow-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs text-gray-600">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {USERS.map((u) => (
                  <tr key={u.id}>
                    <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                    <td className="px-4 py-3 text-gray-700">{u.email}</td>
                    <td className="px-4 py-3">
                      <Select defaultValue={u.role} aria-label={`Role for ${u.name}`}>
                        <option value="student">student</option>
                        <option value="instructor">instructor</option>
                        <option value="admin">admin</option>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700">
                          Save (demo)
                        </span>
                        <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700">
                          Suspend (demo)
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
