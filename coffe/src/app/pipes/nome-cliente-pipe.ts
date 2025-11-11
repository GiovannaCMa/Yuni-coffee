import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nomeCliente',
  standalone: true
})
export class NomeClientePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return 'Comando: (não informado)';
    return `Cliente: ${value.toUpperCase()}`; // coloca em caixa alta
  }
}
