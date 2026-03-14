'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function QuizPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Quiz</h1>
        <p className="text-muted-foreground">Teste seus conhecimentos com quizzes interativos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Quiz {i}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Teste seus conhecimentos em diferentes áreas
              </p>
              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Começar Quiz
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
