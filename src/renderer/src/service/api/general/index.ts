import { get, post } from '../../fetch';
import {
	ConfigInfo,
	GetNoticesListBody,
	UpdateNoticesTypeBody,
	AddNoticesTypeBody,
	GetNoticesListRes,
	ConfigInfoResponse,
} from './interface';

/**
 * 获取后台配置信息
 */
export const GetConfigInfo = (): Promise<ConfigInfoResponse> => {
	return get(`/getSetting`);
};

/**
 * 更新配置信息
 * @param data
 * @constructor
 */
export const SaveConfigInfo = (data: ConfigInfo): Promise<any> => {
	return post(`/saveSetting`, data);
};

/**
 *获取公告列表
 */
export const GetMessageList = (params: GetNoticesListBody): Promise<GetNoticesListRes> => {
	return get(`/getNotices`, params);
};

/**
 * 新增公告
 * @param data
 * @constructor
 */
export const AddNotice = (data: AddNoticesTypeBody): Promise<any> => {
	return post(`/setNotices`, data);
};

/**
 * 更新公告状态
 * @param data
 * @constructor
 */
export const UpdateNoticesType = (data: UpdateNoticesTypeBody): Promise<any> => {
	return post(`/updateNoticesType`, data);
};
