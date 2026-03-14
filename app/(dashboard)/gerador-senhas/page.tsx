'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function GeradorSenhasPage() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let chars = ''
    if (includeLowercase) chars += lowercase
    if (includeUppercase) chars += uppercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(newPassword)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gerador de Senhas</h1>
        <p className="text-muted-foreground">Gere senhas seguras e personalizadas</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerar Senha Segura</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Sua Senha Gerada
            </label>
            <div className="flex gap-2">
              <div className="flex-1 px-4 py-3 bg-muted rounded-md border border-input text-foreground font-mono text-lg break-all">
                {password || 'Clique em "Gerar Senha"'}
              </div>
              <Button
                variant="secondary"
                onClick={copyToClipboard}
                disabled={!password}
              >
                Copiar
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Comprimento: {length}
            </label>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              <span className="text-foreground">Letras maiúsculas (A-Z)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              <span className="text-foreground">Letras minúsculas (a-z)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              <span className="text-foreground">Números (0-9)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              <span className="text-foreground">Símbolos (!@#$...)</span>
            </label>
          </div>

          <Button onClick={generatePassword} className="w-full">
            Gerar Senha
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
