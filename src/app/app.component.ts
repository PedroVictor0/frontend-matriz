import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  matrix: (number | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  determinant: number | null = null;

  // Sanitização — impede letras, símbolos, múltiplos pontos ou sinais
  sanitize(event: any, i: number, j: number) {
    let value = event.target.value;

    // Remove tudo que não é número, ponto ou sinal '-'
    value = value.replace(/[^0-9.\-]/g, '');

    // Impede mais de um ponto
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts[1];
    }

    // Permite apenas UM '-' e apenas no início
    if (value.includes('-')) {
      value = value.replace(/-/g, '');   // remove todos
      value = '-' + value;               // recoloca só no início
    }

    // Atualiza o input visualmente
    event.target.value = value;

    // Se ficou vazio → null
    if (value.trim() === '') {
      this.matrix[i][j] = null;
      return;
    }

    // Converte para número real
    const parsed = Number(value);
    this.matrix[i][j] = isNaN(parsed) ? null : parsed;
  }

  // Só habilita cálculo se toda a matriz for válida
  isMatrixValid(): boolean {
    return this.matrix.every(row =>
      row.every(cell => cell !== null && !isNaN(Number(cell)))
    );
  }

  // Fórmula do determinante 3×3
  calculateDeterminant() {
    if (!this.isMatrixValid()) {
      alert("Preencha todos os campos com números válidos.");
      return;
    }

    const m = this.matrix as number[][];

    this.determinant =
      m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
      m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
      m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  }
}
