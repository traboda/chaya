interface CredentialRequestOptions {
  otp: OTPOptions;
}

interface OTPOptions {
  transport: string[];
}

interface CredentialType {
  code: string
  type: string
}