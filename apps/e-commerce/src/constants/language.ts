const responseMessages = {
  EN: {
    EMAIL_DOES_NOT_EXIST: 'Email does not exists.',
    DUPLICATE_EMAIL: 'Email must be unique',
    INCORRECT_EMAIL_OR_PASSWORD: 'email/password incorrect',
    USER_NOT_FOUND: 'User not found',
    PASSWORD_DOESNOT_MATCH: 'Passwords doesnot match',
    INCORRECT_PASSWORD: 'Incorrect password!',
  },
};

enum LangList {
  EN = 'EN',
}
const lang: LangList = LangList[process.env.SYSTEM_LANGUAGE || 'EN'];

const Messages = responseMessages[lang];

export default Messages;
