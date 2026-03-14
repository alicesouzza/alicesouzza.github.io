'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function SimuladorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Simulador de PC</h1>
        <p className="text-muted-foreground">Verifique a compatibilidade de componentes de PC</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Simulador de Compatibilidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Processador</label>
              <select className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Selecione um processador</option>
                <option>Intel i9-13900K</option>
                <option>AMD Ryzen 9 7950X</option>
                <option>Intel i7-13700K</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Placa Mãe</label>
              <select className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Selecione uma placa mãe</option>
                <option>ASUS ROG STRIX</option>
                <option>MSI MPG Z790</option>
                <option>Gigabyte AORUS</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Memória RAM</label>
              <select className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Selecione a memória</option>
                <option>32GB DDR5 6000MHz</option>
                <option>64GB DDR5 6400MHz</option>
                <option>16GB DDR5 5600MHz</option>
              </select>
            </div>

            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold">
              Verificar Compatibilidade
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
