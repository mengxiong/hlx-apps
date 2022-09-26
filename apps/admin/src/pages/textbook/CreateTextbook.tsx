import { useMuiForm } from '@hlx/hooks';
import { Box, MenuItem } from '@mui/material';
import { Platform, Textbook } from '@prisma/client';

export interface CreateTextbookProps {}

export const platforms = [
  { label: '全部', value: Platform.ALL },
  { label: 'App', value: Platform.APP },
  { label: 'Web', value: Platform.WEB },
];

// id          Int       @id @default(autoincrement())
// createdAt   DateTime  @default(now())
// updatedAt   DateTime  @updatedAt
// title       String
// description String    @default("")
// cover       String    @default("")
// platform    Platform  @default(ALL)
// cost        Int       @default(0)
// validDays   Int       @default(0)
// published   Boolean   @default(false)
// publishedAt DateTime?
// units       Unit[]

export function CreateTextbook(props: CreateTextbookProps) {
  const { handleSubmit, formItems } = useMuiForm<Textbook>({
    items: [
      { label: '标题', name: 'title', rules: { required: '标题不能为空' } },
      {
        label: '描述',
        name: 'description',
        rules: { required: '描述不能为空' },
      },
      {
        label: '平台',
        name: 'platform',
        select: true,
        defaultValue: Platform.ALL,
        children: platforms.map((v) => (
          <MenuItem key={v.value} value={v.value}>
            {v.label}
          </MenuItem>
        )),
      },
      {
        label: '有效天数',
        type: 'number',
        defaultValue: 30,
        name: 'validDays',
        rules: { min: { value: 1, message: '不能小于 1' } },
      },
      {
        label: '花费点数',
        type: 'number',
        defaultValue: 0,
        name: 'cost',
        rules: { min: { value: 0, message: '不能小于 0' } },
      },
    ],
  });

  return <Box>{formItems}</Box>;
}
