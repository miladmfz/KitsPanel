import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { getIdentityUrl } from 'src/environment/environment';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        postLoginRoute: '/dashboard',
        unauthorizedRoute: '/unauthorized',
        logLevel: LogLevel.Debug,
        historyCleanupOff: true,
        authority: `${getIdentityUrl()}`,
        redirectUrl: `${window.location.origin}/callback`,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'angular',
        scope: 'profile openid roles',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
