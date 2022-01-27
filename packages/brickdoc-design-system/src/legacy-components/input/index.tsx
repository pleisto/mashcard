import './style'
import Input from './Input'
import Group from './Group'
import Search from './Search'
import TextArea from './TextArea'
import Password from './Password'

export type { InputProps } from './Input'
export type { GroupProps } from './Group'
export type { SearchProps } from './Search'
export type { TextAreaProps } from './TextArea'
export type { PasswordProps } from './Password'

Input.Group = Group
Input.Search = Search
Input.TextArea = TextArea
Input.Password = Password
export default Input
