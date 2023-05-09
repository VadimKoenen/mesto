export default class UserInfo {
  constructor({ profileName, profileDescription, profileAvatar }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
    this._profileAvatar = profileAvatar;

  }
  //получение информации в поля формы
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
      avatar: this._profileAvatar.src,
    }
  }

  //установка информации профиля
  setUserInfo({name, about, avatar}) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = about;
    this._profileAvatar.src = avatar;
  }
}