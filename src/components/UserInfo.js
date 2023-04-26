export default class UserInfo {
  constructor({ profileName, profileDescription }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
  }
  //получение информации в поля формы
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    }
  }

  //установка информации профиля
  setUserInfo(name, description) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
  }
}