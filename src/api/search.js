/**
 * @file 搜索接口
 * @author hongluyan 2019-09-02
 */
import request from '../plugins/axios';

export const getSearchSuggest = (keywords) => request.get(`/search/suggest?keywords=${keywords}`);

export const a = 1;
