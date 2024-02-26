const message = {
  welcome: "Share your views with SastImg",
};

const action = {
  confirm: "Confirm",
  save: "Save",
  upload: "Upload",
  download: "Download",
  cancel: "Cancel",
};

const imageOption = {
  title: "Title",
  description: "Description",
};

const uploadView = {
  success: "Upload Success!",
  fail: "Upload Failed!",
};

const profileView = {
  logout: {
    description: "Log Out",
    success: "You've successfully logged out.",
    failed: "Log out failed.",
  },
  edit: {
    profile: "Edit Profile",
    header: "Edit Header",
    avatar: "Edit Avatar",
    upload: {
      exceed: "Picture size can not exceed 10MB!",
      fail: "Upload failed.",
      success: "Upload success.",
      formatError: "The file to be uploaded must be a picture.",
    },
  },
  tabs: {
    albums: "Albums",
    images: "Images",
    likes: "Likes",
  },
  profileItems: {
    nickname: "Nickname",
    biography: "Biography",
    website: "Website",
    birthday: "Birthday",
  },
};

const loginView = {
  login: "Login",
  register: "Register",
  username: "Username",
  password: "Password",
  loginSuccess: "Login success!",
  loginFailed: "Login failed! Username or password is incorrect.",
};

const registerView = {
  email: "Email",
  token: "Token",
  register: "Register",
  backToLogin: "Back To Login",
  backToChangeEmail: "Change Email",
  sendToken: "Send",
  sendTokenSuccess: "The token has been sent to your email box successfully.",
  sendTokenFailed: "Email send failed.",
  emailInvalid: "Invalid email or it has been registered.",
  nameInvalid: "Invalid username or it has been registered.",
  validationFailed: "The token is incorrect.",
  registerSuccess: "Register success!",
  registerFailed: "Register failed!",
  complementRequest: "Now you can complement your profile first.",
  skipComplementRequest: "Skip and do it later.",
  dto: {
    username: "Username",
    nickname: "Nickname",
    password: "Password",
    confirmPassword: "Confirm Password",
  },
};

const menuItem = {
  home: "Home",
  explore: "Explore",
  search: "Search",
  exploreSubItem: {
    recent: "Recent",
    following: "Following",
    popular: "Pupular",
    likes: "Likes",
  },
};

export const EN = {
  updateHeader: "Update Header",
  headerFileExceed: "The file size can not exceed 10MB!",
  avatarFileExceed: "The file size can not exceed 5MB!",
  imageFormatError: "The file to be uploaded must be a picture.",
  title: "I am SastImg",
  action,
  message,
  loginView,
  registerView,
  profileView,
  uploadView,
  imageOption,
  menuItem,
};
