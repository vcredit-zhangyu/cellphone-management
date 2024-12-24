/*
 * @Author: waghao10
 * @Date: 2024-04-16 11:19:33
 * @Description: 
 */
// /*
//  * @Author: waghao10
//  * @Date: 2022-11-11 18:11:16
//  * @Description: 获取用户信息
//  */

// import { Effect } from 'umi'
// import { GetUserInfo } from '@/services/api/common'
// // 定义这个model的类型 Effect为effects对象中每个属性的类型
// export interface davType {
//   namespace: string;
//   state: any;
//   effects: {
//     getData: Effect;
//   };
//   reducers: any;
// }

// const userModel: davType = {
//   namespace: 'user', // 调用modle时 通过命名空间调用 不能与其他modle的命名空间重名
//   state: {
//     // 状态 与react中 state类似 和 redux中保存的state一样
//     data: {},
//   },
//   effects: {
//     *getData({ payload }, { call, put }) {
//       const { resolve } = payload
//       // @ts-ignore
//       const userData = yield call(GetUserInfo, payload)
//       yield put({
//         // type 对应reducers
//         type: 'userInfo',
//         payload: userData,
//       })
//       resolve(userData) // 返回数据
//     }
//   },

//   reducers: {
//     userInfo(state: any, { payload }: any) {
//       return {
//         ...state,
//         userData: payload
//       }
//     },
//   },
// }

// export default userModel
