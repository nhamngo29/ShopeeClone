//cú pháp `-?` sẽ loại bỏ undefined của key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: T[P] extends object ? NoUndefinedField<NonNullable<T[P]>> : NonNullable<T[P]>
}
