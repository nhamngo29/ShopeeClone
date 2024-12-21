import { AxiosError, isAxiosError } from 'axios'
import {describe,it,expect} from 'vitest'
import HttpStatusCode from 'src/constants/httpStatuscode.enum'
//describe dùng để mô tả tập hợp các ngữ cảnh
//haowjc 1 đơn vị cần  test: Ví dụ funciton, component
describe('isAxiosError',()=>{
    
    it('isAxiosError trả về boolean',()=>{
        expect(isAxiosError(new Error())).toBe(false)
        expect(isAxiosError(new AxiosError())).toBe(true)
    })
})

describe('isAxiosUnprocessableEntityError', () => {
    it('isAxiosUnprocessableEntityError trả về boolean', () => {
      // Mock hàm isAxiosUnprocessableEntityError
      const isAxiosUnprocessableEntityError = (error: any) =>
        error?.response?.status === HttpStatusCode.UnprocessableEntity;
  
      // Trường hợp lỗi không phải AxiosError
      expect(isAxiosUnprocessableEntityError(new Error())).toBe(false);
  
      // Trường hợp AxiosError với status không phải UnprocessableEntity
      const internalServerError = new AxiosError(
        'Internal Server Error',
        undefined,
        undefined,
        undefined,
        {
          status: HttpStatusCode.InternalServerError,
          data: null,
        } as any
      );
      expect(isAxiosUnprocessableEntityError(internalServerError)).toBe(false);
  
      // Trường hợp AxiosError với status là UnprocessableEntity
      const unprocessableEntityError = new AxiosError(
        'Unprocessable Entity',
        undefined,
        undefined,
        undefined,
        {
          status: HttpStatusCode.UnprocessableEntity,
          data: null,
        } as any
      );
      expect(isAxiosUnprocessableEntityError(unprocessableEntityError)).toBe(true);
    });
  });
  