export type AuthStackParamList = {
    Splash: undefined;
    Intro: undefined;
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    EnterCode: { email: string };  // Màn hình nhập mã code
    SetNewPassword: { email: string };  // Màn hình đặt lại mật khẩu mới
    HomeTabs: undefined;
  };

