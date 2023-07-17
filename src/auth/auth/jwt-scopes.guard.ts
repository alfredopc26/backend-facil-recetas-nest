import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from "lodash";

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const scopes = this.reflector.get<string[]>('scopes', context.getHandler());
    console.log('scopes', scopes);
    
    if (!scopes) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    return this.matchScopes(scopes, user.scope);
  }

  matchScopes(_scopes: string[], _userScopes: string) {
    let _userScopesArr = _userScopes.split(' ');

    return _.intersection(_scopes, _userScopesArr).length > 0;
  }
}