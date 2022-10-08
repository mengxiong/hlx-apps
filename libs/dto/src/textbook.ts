import { Prisma } from '@prisma/client';

export type CreateTextbookDto = Prisma.TextbookCreateArgs;
export type FindAllTextbookDto = Prisma.TextbookFindManyArgs;
