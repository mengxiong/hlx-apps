import { CreateTextbookDto } from '@hlx/dto';
import { RestApi } from './restApi';

export const textbookApi = new RestApi<CreateTextbookDto>('textbook');
