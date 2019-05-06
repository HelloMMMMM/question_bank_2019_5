package cn.jbolt.user;

import java.util.List;

import cn.jbolt.common.model.User;

public class UserService {

	public User getUser(String userName, String password) {
		List<User> users = User.dao.find("select * from user where userName=? and password=?", userName,
				password);
		return users != null && users.size() > 0 ? users.get(0) : null;
	}

	public User addUser(String userName, String password) {
		User user = new User().setUserName(userName).setPassword(password).setDoneTotal(0);
		user.save();
		return user;
	}
}
