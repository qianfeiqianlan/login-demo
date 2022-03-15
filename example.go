func TestClient_Detail_OE(t *testing.T) {
	client := NewClient("xxxx", "xxxx")
	resp, _ := client.Detail("63")
	log.Printf("%+v\n", resp)
	idpUserInfo, err := getCorrectUserInfo(resp, "xxxx")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(idpUserInfo)

}

type IdpUserInfo struct {
	Phone    *string
	Email    *string
	Name     *string
	Username *string
	Avatar   *string
}

func getCorrectUserInfo(user *model.User, currentIdentityId string) (*IdpUserInfo, error) {
	var identities = user.Identities
	var idpUserInfo IdpUserInfo
	if identities != nil && len(identities) != 0 {
		for _, identity := range identities {
			json, err := json.Marshal(identity.UserInfoInIdp)
			if err != nil {
				return nil, err
			}
			if *identity.Id != currentIdentityId {
				continue
			}
			userInfoInIdpJson, err := simplejson.NewJson(json)
			provider := *identity.Provider
			idpUserInfo.Phone = user.Phone
			idpUserInfo.Email = user.Email
			if err != nil {
				return nil, err
			}
			if provider == "oauth2" {
				name, _ := userInfoInIdpJson.Get("middleName").String()
				username, _ := userInfoInIdpJson.Get("familyName").String()
				avatar, _ := userInfoInIdpJson.Get("photo").String()
				idpUserInfo.Name = &name
				idpUserInfo.Username = &username
				idpUserInfo.Avatar = &avatar
			} else if provider == "github" {
				name, _ := userInfoInIdpJson.Get("nickname").String()
				username, _ := userInfoInIdpJson.Get("username").String()
				avatar, _ := userInfoInIdpJson.Get("photo").String()
				idpUserInfo.Name = &name
				idpUserInfo.Username = &username
				idpUserInfo.Avatar = &avatar
			} else if provider == "wechat" {
				name, _ := userInfoInIdpJson.Get("nickname").String()
				avatar, _ := userInfoInIdpJson.Get("photo").String()
				idpUserInfo.Name = &name
				idpUserInfo.Username = user.Username
				idpUserInfo.Avatar = &avatar
			} else {
				if user.Nickname != nil {
					idpUserInfo.Name = user.Nickname
				} else {
					idpUserInfo.Name = user.Name
				}

				idpUserInfo.Username = user.Username
				idpUserInfo.Avatar = user.Photo
			}
			break
		}
	}
	return &idpUserInfo, nil
}