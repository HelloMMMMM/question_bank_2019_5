package cn.jbolt.user;

import com.jfinal.aop.Inject;
import com.jfinal.core.Controller;

import cn.jbolt.apibean.ResponseBean;
import cn.jbolt.apibean.UserBean;
import cn.jbolt.common.model.User;

public class UserController extends Controller {

	@Inject
	private UserService userService;

	public void login() {
		String userName = get("userName");
		String password = get("password");
		User user = userService.getUser(userName, password);
		UserBean userBean = new UserBean();
		userBean.setCode(1);
		userBean.setUser(user);
		userBean.setMsg("登录成功");
		renderJson(userBean);
	}

	public void addUser() {
		String userName = get("userName");
		String password = get("password");
		userService.addUser(userName, password);
		ResponseBean responseBean = new ResponseBean();
		responseBean.setCode(1);
		responseBean.setMsg("注册成功");
		renderJson(responseBean);
	}
}
