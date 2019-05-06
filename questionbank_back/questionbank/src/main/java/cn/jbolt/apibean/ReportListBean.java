package cn.jbolt.apibean;

import java.util.List;

public class ReportListBean extends ResponseBean{

	private List<ReportBean> reportBeans;

	public List<ReportBean> getReportBeans() {
		return reportBeans;
	}

	public void setReportBeans(List<ReportBean> reportBeans) {
		this.reportBeans = reportBeans;
	}
	
	
}
