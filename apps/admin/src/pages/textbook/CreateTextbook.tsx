import { useMuiForm } from '@hlx/hooks';
import { Box, Button, MenuItem } from '@mui/material';
import { Platform, Textbook, Unit } from '@prisma/client';
import { CreateTextbookDto } from '@hlx/dto';
import { useDropzone } from 'react-dropzone';
import { read, utils } from 'xlsx';

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

// id: number
// sort: number
// character: string | null
// content: string
// translation: string
// analysis: string
// image: string | null
// audio: string | null
// video: string | null
// unitId: number

const map = {
  角色: 'character',
} as const;

// 科目类型	一级目录	二级目录	序号	角色	原文	音频文件名	视频文件名	图片文件名	译文	解析	填空题目文字	填空题目文件名	填空题答案	填空题提示文字	填空题提示文件名	选择题目文字	选择题目文件名	选择题答案	选择题提示文字	选择题提示文件名	A	B	C	D	E	F

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

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
  });

  async function handleFileAsync(file: File) {
    const data = await file.arrayBuffer();
    const workbook = read(data);
    console.log(workbook);
    const json = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    console.log(json);
  }

  // const submit = handleSubmit((data) => {
  //   if (data) {
  //   }
  // });

  const submit = () => {
    handleFileAsync(acceptedFiles[0]);
  };

  return (
    <Box>
      {formItems}
      <Button
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 100,
          p: 3,
          borderStyle: 'dashed',
          borderColor: 'grey.500',
          color: 'text.secondary',
          mt: 2,
        }}
        fullWidth
        variant="outlined"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span>点击或拖拽到此处, 上传学习文件</span>
        <Box sx={{ color: 'text.disabled' }}>{acceptedFiles[0]?.name}</Box>
      </Button>
      <Button onClick={submit}>提交</Button>
    </Box>
  );
}
