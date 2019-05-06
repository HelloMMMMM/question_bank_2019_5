package cn.jbolt.wrongset;

import java.util.List;

import cn.jbolt.common.model.Wrongset;

public class WrongSetService {

	public void addWrongSet(int userId, int recordId, String wrongSet) {
		new Wrongset().setUserId(userId).setRecordId(recordId).setWrongset(wrongSet).save();
	}

	public Wrongset getWrongSet(int recordId) {
		List<Wrongset> wList = Wrongset.dao.find("select * from wrongset where recordId=?", recordId);
		return wList != null && wList.size() > 0 ? wList.get(0) : null;
	}
}