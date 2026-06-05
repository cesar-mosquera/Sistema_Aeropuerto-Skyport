import { Injectable } from '@nestjs/common';

@Injectable()
export class AeropuertoService {
  
  calcularEquipajes(equipajes: any[]) {
    let total_cobro = 0;
    const detalle = [];
    const tarifa_base = 15.00;

    for (let i = 0; i < equipajes.length; i++) {
      const eq = equipajes[i];
      const peso = parseFloat(eq.peso_kg);
      let recargo = 0;

      if (peso > 23 && peso <= 32) {
        recargo = 30.00;
      } else if (peso > 32) {
        recargo = 60.00;
      }

      const costo_total = tarifa_base + recargo;
      total_cobro += costo_total;

      detalle.push({
        pasajero: eq.pasajero,
        peso_kg: peso,
        recargo: recargo,
        costo_total: costo_total,
      });
    }

    return {
      total_equipajes: equipajes.length,
      total_cobro: total_cobro,
      detalle: detalle,
    };
  }

  asignarPista(minutos_disponibles: number, duracionesStr: string) {
    const duraciones = duracionesStr.split(',').map(d => parseInt(d.trim(), 10));
    
    let acumulado = 0;
    let indice = 0;
    const detalle = [];
    let limiteAlcanzado = false;

    while (indice < duraciones.length) {
      const duracion_actual = duraciones[indice];
      if (acumulado + duracion_actual <= minutos_disponibles) {
        acumulado += duracion_actual;
        detalle.push(duracion_actual);
        indice++;
      } else {
        limiteAlcanzado = true;
        break; // Detiene el ciclo de inmediato
      }
    }

    return {
      vuelos_asignados: detalle.length,
      minutos_libres: minutos_disponibles - acumulado,
      detalle: detalle,
    };
  }
}
