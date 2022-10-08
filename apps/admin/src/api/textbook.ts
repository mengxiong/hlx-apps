import { CreateTextbookDto, FindAllTextbookDto } from '@hlx/dto';
import { Textbook } from '@prisma/client';
import { RestApi } from './restApi';

export const textbookApi = new RestApi<Textbook, CreateTextbookDto, FindAllTextbookDto>('textbook');
