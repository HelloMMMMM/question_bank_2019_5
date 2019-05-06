package cn.jbolt.testrecord;

import java.util.List;

import com.jfinal.aop.Aop;
import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Page;

import cn.jbolt.common.model.Testrecord;
import cn.jbolt.wrongset.WrongSetService;

public class TestRecordService {

	public Testrecord addRecord(int userId, String questionIds, String answers, String correctOrWrong) {
		String[] qIds = questionIds.split(",");
		String[] a = null;
		if (answers != null) {
			a = answers.split("\\|");
		}
		int isFinish = (a != null && qIds.length == a.length) ? 1 : 2;
		Testrecord testrecord = new Testrecord().setUserId(userId).setQuestionIds(questionIds).setAnswers(answers)
				.setIsCorrect(correctOrWrong).setIsFinish(isFinish);
		testrecord.save();
		if (isFinish == 1) {
			// 答完
			WrongSetService wrongSetService = Aop.get(WrongSetService.class);
			String wrongSet = "";
			String[] c = correctOrWrong.split(",");
			for (int i = 0; i < c.length; i++) {
				if ("2".equals(c[i])) {
					// 错误
					wrongSet = wrongSet + qIds[i] + ",";
				}
			}
			wrongSet = wrongSet.substring(0, wrongSet.length() - 1);
			wrongSetService.addWrongSet(userId, testrecord.getId(), wrongSet);
		}
		return testrecord;
	}

	public Testrecord updateRecord(int recordId, String answers, String correctOrWrong) {
		Testrecord testrecord = Testrecord.dao.findById(recordId);
		if (testrecord != null) {
			String lastAnswers = testrecord.getAnswers();
			if (!StrKit.isBlank(answers) && !StrKit.isBlank(correctOrWrong)) {
				if (StrKit.isBlank(lastAnswers)) {
					// 虽生成了测试记录，但未答题
					testrecord.setAnswers(answers);
					// 1:正确;2:错误;
					testrecord.setIsCorrect(correctOrWrong);
				} else {
					testrecord.setAnswers(lastAnswers + "|" + answers);
					testrecord.setIsCorrect(testrecord.getIsCorrect() + "," + correctOrWrong);
				}
			}
			String questionIds = testrecord.getQuestionIds();
			String nowAnswers = testrecord.getAnswers();
			String[] qIds = questionIds.split(",");
			String[] a = null;
			if (nowAnswers != null) {
				a = nowAnswers.split("\\|");
			}
			int isFinish = (a != null && qIds.length == a.length) ? 1 : 2;
			testrecord.setIsFinish(isFinish).update();
			if (isFinish == 1) {
				// 答完
				WrongSetService wrongSetService = Aop.get(WrongSetService.class);
				String wrongSet = "";
				String[] c = testrecord.getIsCorrect().split(",");
				for (int i = 0; i < c.length; i++) {
					if ("2".equals(c[i])) {
						// 错误
						wrongSet = wrongSet + qIds[i] + ",";
					}
				}
				// 没有错题不生成错题集
				if (!StrKit.isBlank(wrongSet)) {
					wrongSet = wrongSet.substring(0, wrongSet.length() - 1);
					wrongSetService.addWrongSet(testrecord.getUserId(), testrecord.getId(), wrongSet);
				}
			}
		}
		return testrecord;
	}

	public Testrecord getNotFinishRecord(int userId) {
		List<Testrecord> testrecords = Testrecord.dao.find("select * from testrecord where userId=? and isFinish=?",
				userId, 2);
		return testrecords != null && testrecords.size() > 0 ? testrecords.get(0) : null;
	}

	public Testrecord getRecord(int recordId) {
		return Testrecord.dao.findById(recordId);
	}

	public Page<Testrecord> getFinishRecords(int userId, int page) {
		return Testrecord.dao.paginate(page, 10, "select *",
				"from testrecord where userId=? and isFinish=? order by id desc", userId, 1);
	}

	public Testrecord getNewestNotFinishRecord(int userId) {
		List<Testrecord> testrecords = Testrecord.dao.find("select * from testrecord where userId=? order by id desc",
				userId);
		return testrecords != null && testrecords.size() > 0 ? testrecords.get(0) : null;
	}
}
