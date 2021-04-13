import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  afterEach(() => {
    service = null;
    //localStorage.removeItem('token');
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true from getItem from localStorage after setting token', () => {
    service.setToken('1234')
    expect(localStorage.getItem(TOKEN_KEY)).toBeTruthy();
  });

  it('getting token after setting token', () => {
    service.setToken('1234')
    let token = service.getToken();
    expect(token).toBe('1234');
  });

  it('should return true from getUsername from localStorage after setting username', () => {
    service.setUsername('username')
    expect(localStorage.getItem(USERNAME_KEY)).toBeTruthy();
  });

  it('getting username after setting username', () => {
    service.setUsername('username')
    let username = service.getUsername();
    expect(username).toBe('username');
  });
});
