import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';

export interface MxTableColProps<T> {
  field: string;
  title?: string;
  render?: (row: T) => React.ReactNode;
}

export interface MxTableProps<T> {
  rows: T[];
  columns: MxTableColProps<T>[];
  rowKey?: string;
}

export function MxTable<T extends Record<string, any> = any>({
  rows,
  columns,
  rowKey = 'id',
}: MxTableProps<T>) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.field}>{col.title || ''}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[rowKey]}>
              {columns.map((col) => {
                let content: React.ReactNode = row[col.field];
                if (col.render) {
                  content = col.render(row);
                }
                return <TableCell key={col.field}>{content}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
