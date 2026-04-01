import { Card, CardBody, CardHeader } from "@/components/ui";

type Question = { id: string; prompt: string; choices: string[]; answerIndex: number };

// PUBLIC_INTERFACE
export function generateStaticParams() {
  /** Static export requires params to be known at build time. Demo quiz IDs only. */
  return [{ quizId: "q1" }, { quizId: "q2" }];
}

const DEMO_QUESTIONS: Question[] = [
  {
    id: "1",
    prompt: "Which SQL clause filters rows?",
    choices: ["GROUP BY", "WHERE", "ORDER BY", "JOIN"],
    answerIndex: 1,
  },
  {
    id: "2",
    prompt: "Primary key must be…",
    choices: ["Nullable", "Unique", "Text", "Optional"],
    answerIndex: 1,
  },
];

export default async function QuizPage(props: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await props.params;

  const q = DEMO_QUESTIONS[0]!;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="h1">Quiz {quizId}</h1>
        <p className="muted">
          Static preview (export mode). Interactive attempts will be enabled once backend quiz
          endpoints are wired.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div>
            <p className="h2">Sample question</p>
            <p className="muted">{q.prompt}</p>
          </div>
          <span className="badge-blue">Timed: Off</span>
        </CardHeader>
        <CardBody className="space-y-3">
          <div className="space-y-2">
            {q.choices.map((c, i) => (
              <div
                key={c}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm text-gray-700"
              >
                <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {c}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
              Start attempt (demo)
            </span>
            <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
              Save progress (demo)
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
