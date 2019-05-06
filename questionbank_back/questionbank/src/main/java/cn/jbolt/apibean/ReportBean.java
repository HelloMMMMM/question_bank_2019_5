package cn.jbolt.apibean;

public class ReportBean extends ResponseBean {
	private int recordId;
	private int correctCount;
	private int questionTotal;
	private float correctRatio;
	private int count1;
	private int count2;
	private int count3;
	private int count4;

	
	
	public int getRecordId() {
		return recordId;
	}

	public void setRecordId(int recordId) {
		this.recordId = recordId;
	}

	public int getCorrectCount() {
		return correctCount;
	}

	public void setCorrectCount(int correctCount) {
		this.correctCount = correctCount;
	}

	public int getQuestionTotal() {
		return questionTotal;
	}

	public void setQuestionTotal(int questionTotal) {
		this.questionTotal = questionTotal;
	}

	public float getCorrectRatio() {
		return correctRatio;
	}

	public void setCorrectRatio(float correctRatio) {
		this.correctRatio = correctRatio;
	}

	public int getCount1() {
		return count1;
	}

	public void setCount1(int count1) {
		this.count1 = count1;
	}

	public int getCount2() {
		return count2;
	}

	public void setCount2(int count2) {
		this.count2 = count2;
	}

	public int getCount3() {
		return count3;
	}

	public void setCount3(int count3) {
		this.count3 = count3;
	}

	public int getCount4() {
		return count4;
	}

	public void setCount4(int count4) {
		this.count4 = count4;
	}
}
