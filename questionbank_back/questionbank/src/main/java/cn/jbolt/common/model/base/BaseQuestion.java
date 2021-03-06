package cn.jbolt.common.model.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings({"serial", "unchecked"})
public abstract class BaseQuestion<M extends BaseQuestion<M>> extends Model<M> implements IBean {

	public M setId(java.lang.Integer id) {
		set("id", id);
		return (M)this;
	}
	
	public java.lang.Integer getId() {
		return getInt("id");
	}

	public M setContent(java.lang.String content) {
		set("content", content);
		return (M)this;
	}
	
	public java.lang.String getContent() {
		return getStr("content");
	}

	public M setType(java.lang.Integer type) {
		set("type", type);
		return (M)this;
	}
	
	public java.lang.Integer getType() {
		return getInt("type");
	}

	public M setA(java.lang.String a) {
		set("a", a);
		return (M)this;
	}
	
	public java.lang.String getA() {
		return getStr("a");
	}

	public M setB(java.lang.String b) {
		set("b", b);
		return (M)this;
	}
	
	public java.lang.String getB() {
		return getStr("b");
	}

	public M setC(java.lang.String c) {
		set("c", c);
		return (M)this;
	}
	
	public java.lang.String getC() {
		return getStr("c");
	}

	public M setD(java.lang.String d) {
		set("d", d);
		return (M)this;
	}
	
	public java.lang.String getD() {
		return getStr("d");
	}

	public M setAnswer(java.lang.String answer) {
		set("answer", answer);
		return (M)this;
	}
	
	public java.lang.String getAnswer() {
		return getStr("answer");
	}

	public M setParse(java.lang.String parse) {
		set("parse", parse);
		return (M)this;
	}
	
	public java.lang.String getParse() {
		return getStr("parse");
	}

	public M setPoint(java.lang.String point) {
		set("point", point);
		return (M)this;
	}
	
	public java.lang.String getPoint() {
		return getStr("point");
	}

	public M setSubject(java.lang.String subject) {
		set("subject", subject);
		return (M)this;
	}
	
	public java.lang.String getSubject() {
		return getStr("subject");
	}

}
