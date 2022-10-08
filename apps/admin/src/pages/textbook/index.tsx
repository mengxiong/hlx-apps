import { MxTable, MxTableCols } from '@hlx/components';
import { Box, Button, Stack } from '@mui/material';
import { Textbook as TextbookData } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { textbookApi } from '../../api/textbook';

export function Textbook() {
  const { isLoading, error, data } = useQuery(['textbooks'], () => textbookApi.findAll());

  const rows = data?.data;

  const columns: MxTableCols<TextbookData> = [
    { title: 'id', field: 'id' },
    { title: '名称', field: 'title' },
    { title: '描述', field: 'description' },
    { title: '平台', field: 'platform' },
    { title: '有效天数', field: 'validDays' },
    { title: '扣除点数', field: 'cost' },
    { title: '状态', field: 'published' },
    { title: '创建时间', field: 'createdAt' },
    {
      title: '操作',
      field: 'actions',
      render: () => {
        return (
          <Stack direction="row" spacing={1}>
            <Button size="small">编辑</Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box sx={{}}>
      <Button sx={{ right: 0 }} variant="contained">
        新增课程
      </Button>
      <MxTable columns={columns} isLoading={isLoading} error={error} rows={rows} />
    </Box>
  );
}
