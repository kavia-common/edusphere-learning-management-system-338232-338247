"use client";

import { Button, Card, CardBody, CardHeader, Input, Select } from "@/components/ui";

export default function NewCoursePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="h1">Create course</h1>
        <p className="muted">Course metadata and publishing settings (demo).</p>
      </div>

      <Card>
        <CardHeader>
          <div>
            <p className="h2">Details</p>
            <p className="muted">Title, category, level</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input label="Title" placeholder="e.g., Intro to Databases" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Category" defaultValue="Engineering">
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
            </Select>
            <Select label="Level" defaultValue="Beginner">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </Select>
          </div>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-800">Description</span>
            <textarea className="input min-h-36" placeholder="Course overview…" />
          </label>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => alert("Demo: course created")}>Create</Button>
            <Button variant="ghost" onClick={() => alert("Demo: saved draft")}>
              Save draft
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
