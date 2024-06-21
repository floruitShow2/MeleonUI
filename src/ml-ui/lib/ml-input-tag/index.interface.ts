export interface InputTagProps {
  size: MlDesign.Size
  tagType: MlDesign.Status
}

export interface TagData {
  value: string | number
  label: string
  closable: boolean
}

// export type FieldString<T> = {
//   [key in keyof T]: string
// }

// export type InputTagFieldNames = FieldString<TagData>
