package cn.jbolt.apibean;

import cn.jbolt.common.model.User;

public class UserBean extends ResponseBean{
	
	private User user;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
}
