import { Card, CardBody, CardHeader } from "@/components/ui";

function KPI(props: { label: string; value: string; hint?: string }) {
  return (
    <Card>
      <CardBody>
        <p className="text-sm text-gray-600">{props.label}</p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">{props.value}</p>
        {props.hint ? <p className="mt-1 text-xs text-gray-500">{props.hint}</p> : null}
      </CardBody>
    </Card>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="h1">Analytics</h1>
        <p className="muted">Admin: high-level metrics (demo placeholders).</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI label="Active users" value="184" hint="Last 7 days" />
        <KPI label="Enrollments" value="72" hint="This week" />
        <KPI label="Completion rate" value="54%" hint="Across courses" />
        <KPI label="Avg. quiz score" value="81%" hint="Last 30 days" />
      </div>

      <Card>
        <CardHeader>
          <div>
            <p className="h2">Engagement</p>
            <p className="muted">Chart placeholder</p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="h-64 rounded-lg border border-gray-200 bg-gradient-to-br from-blue-500/10 to-gray-50 grid place-items-center">
            <p className="text-sm text-gray-600">Analytics charts render here</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
