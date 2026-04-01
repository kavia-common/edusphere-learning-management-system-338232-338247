import { Card, CardBody, CardHeader, Input, Select } from "@/components/ui";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="h1">Settings</h1>
        <p className="muted">Admin configuration (demo).</p>
      </div>

      <Card>
        <CardHeader>
          <div>
            <p className="h2">Email & notifications</p>
            <p className="muted">Configure outbound delivery (placeholder)</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input label="From name" defaultValue="EduSphere" />
          <Input label="From email" defaultValue="no-reply@edusphere.example" />
          <Select label="Email provider" defaultValue="disabled">
            <option value="disabled">Disabled</option>
            <option value="smtp">SMTP</option>
            <option value="sendgrid">SendGrid</option>
          </Select>
          <div className="flex gap-2">
            <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
              Save (demo)
            </span>
            <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
              Send test (demo)
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
