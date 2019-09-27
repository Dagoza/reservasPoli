import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from 'angular5-social-login';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('117307785851-rkn1nsjjvuj1sj3aa5dk00qiu1lbs2d4.apps.googleusercontent.com')
    }
  ]);

  return config;
}
