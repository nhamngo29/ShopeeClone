import { isAxiosError } from 'axios'
import {describe,it,expect} from 'vitest'
//describe dùng để mô tả tập hợp các ngữ cảnh
//haowjc 1 đơn vị cần  test: Ví dụ funciton, component
describe('isAxiosError',()=>{
    
    it('isAxiosError trả về boolean',()=>{
        expect(isAxiosError(new Error())).toBe(true)
    })
})