import { describe, expect, it } from "vitest";
import { clearFormLS, getRefreshTokenFormLS, setRefreshTokenToLS } from "../auth";

const accessToken = '6mVPA9GIxBw8spq1gqHuO/U42McfVX3vB+aimqnWwVY=';

describe('setRefreshTokenToLS', () => {
  it('should set the refresh token to localStorage', () => {
    setRefreshTokenToLS(accessToken);
    expect(localStorage.getItem('refresh_token')).toBe(accessToken);
  });
});

describe('getRefreshTokenToLS', () => {
    it('should get the refresh token to localStorage', () => {

      expect(getRefreshTokenFormLS()).toBe(accessToken);
    });
  });
  
  describe('clear ls',()=>{
    it('delete localStorage',()=>{
        setRefreshTokenToLS(accessToken);
        expect(localStorage.getItem('refresh_token')).toBe(accessToken);
        clearFormLS()
        expect(getRefreshTokenFormLS()).toBe('')
    })
  })