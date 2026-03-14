'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'

interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  description: string
  date: string
}

export default function FinanceiroPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'income', amount: 5000, description: 'Freelance', date: '2024-03-10' },
    { id: '2', type: 'expense', amount: 500, description: 'Materiais', date: '2024-03-09' },
    { id: '3', type: 'income', amount: 2500, description: 'Venda', date: '2024-03-08' },
  ])

  const [newTransaction, setNewTransaction] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    description: '',
  })

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount) return

    setTransactions([
      {
        id: Math.random().toString(),
        type: newTransaction.type,
        amount: Number(newTransaction.amount),
        description: newTransaction.description,
        date: new Date().toISOString().split('T')[0],
      },
      ...transactions,
    ])

    setNewTransaction({ type: 'expense', amount: '', description: '' })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Controle Financeiro</h1>
        <p className="text-muted-foreground">Gerencie suas transações e acompanhe seu saldo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Renda Total</p>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {formatCurrency(totalIncome)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Despesas Total</p>
            <p className="text-2xl font-bold text-red-600 mt-2">
              {formatCurrency(totalExpenses)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Saldo</p>
            <p className={`text-2xl font-bold mt-2 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(balance)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Nova Transação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tipo</label>
              <select
                value={newTransaction.type}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, type: e.target.value as 'income' | 'expense' })
                }
                className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="expense">Despesa</option>
                <option value="income">Renda</option>
              </select>
            </div>

            <Input
              label="Valor"
              type="number"
              placeholder="0.00"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            />

            <Input
              label="Descrição"
              type="text"
              placeholder="Descreva a transação"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            />

            <Button onClick={handleAddTransaction} className="w-full">
              Adicionar Transação
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Histórico de Transações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                  <p
                    className={`font-bold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
