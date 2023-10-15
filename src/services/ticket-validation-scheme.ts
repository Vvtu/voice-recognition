import { z } from 'zod';

export const ticketValidationScheme = z.object({
  // Цена в рублях
  price: z.number(),
  // Код авиакомпании (iata)
  carrier: z.string(),
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: z.array(
    z.object({
      // Код города (iata)
      origin: z.string(),
      // Код города (iata)
      destination: z.string(),
      // Дата и время вылета туда
      date: z.string(),
      // Массив кодов (iata) городов с пересадками
      stops: z.array(z.string()),
      // Общее время перелёта в минутах
      duration: z.number(),
    }),
  ),
});

export type ITicket = z.infer<typeof ticketValidationScheme>;
//            ^?
