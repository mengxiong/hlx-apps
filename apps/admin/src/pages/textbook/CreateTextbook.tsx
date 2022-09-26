export interface CreateTextbookProps {}

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

// export function CreateTextbook(props: CreateTextbookProps) {
//   const rules = [{ label: '标题', prop: 'title', required: true }];
// }
