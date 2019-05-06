package cn.jbolt.question;

import java.util.List;

import com.jfinal.aop.Inject;
import com.jfinal.core.Controller;

import cn.jbolt.apibean.QuestionBean;
import cn.jbolt.common.model.Question;
import cn.jbolt.common.model.Testrecord;
import cn.jbolt.common.model.Wrongset;
import cn.jbolt.testrecord.TestRecordService;
import cn.jbolt.wrongset.WrongSetService;

public class QuestionController extends Controller {

	@Inject
	private QuestionService questionService;
	@Inject
	private TestRecordService testRecordService;
	@Inject
	private WrongSetService wrongSetService;

	public void getQuestion() {
		int userId = getParaToInt("userId", 0);
		int wrongSetRecordId = getParaToInt("wrongSetRecordId", 0);
		QuestionBean questionBean = new QuestionBean();
		List<Question> questions = null;
		if (wrongSetRecordId > 0) {
			// 复习错题
			Wrongset wrongset = wrongSetService.getWrongSet(wrongSetRecordId);
			if (wrongset != null) {
				questions = questionService.getQuestions(wrongset.getWrongset());
			}
			questionBean.setStartIndex(0);
		} else {
			// 正常答题
			Testrecord testrecord = testRecordService.getNotFinishRecord(userId);
			if (testrecord == null) {
				questions = questionService.getQuestions(userId);
			} else {
				questions = questionService.getQuestions(testrecord.getQuestionIds());
				String nowAnswers = testrecord.getAnswers();
				String[] a = null;
				if (nowAnswers != null) {
					a = nowAnswers.split("\\|");
				}
				questionBean.setRecordId(testrecord.getId());
				questionBean.setStartIndex(a == null ? 0 : a.length);
			}
		}
		questionBean.setCode(1);
		questionBean.setQuestions(questions);
		renderJson(questionBean);
	}
}
