import router, { resetRouter } from '@/router'

export default {
    state: {
        userInfo: null, //用户信息
        token: null,
        hiteMessage: [{ id: 1, title: '测试提示信息', message: '测试信息主体', time: '2020-08-15', url: '#' },
        { id: 2, title: '长标题测试长标题测试长标题测试长标题测试长标题测试长标题测试', message: '测试信息主体', time: '2020-08-15', url: '#' },],
        showHiteMessage: false,
    },
    getters: {
        userInfo: (state) => {
            //此处根据登录时选择的是否 N 天免登陆判断从哪儿取
            if (state.userInfo == null) {
                let sessionUser = sessionStorage.getItem('user')
                if (sessionUser != null) {
                    state.userInfo = JSON.parse(sessionUser)
                } else {
                    let localeUser = localStorage.getItem('user')
                    if (localeUser != null) {
                        state.userInfo = JSON.parse(localeUser)
                    }
                }
            }
            return state.userInfo
        },
        token: (state) => {
            if (state.token == null) {
                let sessionToken = sessionStorage.getItem('token')
                if (sessionToken != null) {
                    state.token = sessionToken
                } else {
                    let localeToken = localStorage.getItem('token')
                    state.token = localeToken
                }
            }
            return state.token
        },
    },
    mutations: {
        setToken (state, token, flag = true) {
            if (flag) {
                localStorage.setItem('token', token)
            } else {
                sessionStorage.setItem('token', token)
            }
        },
        setUserInfo (state, userInfo, flag = true) {
            state.userInfo = userInfo
            state.token = userInfo.token
            if (flag) {
                localStorage.setItem('user', JSON.stringify(userInfo))
            } else {
                sessionStorage.setItem('user', JSON.stringify(userInfo))
            }
            this.commit('setToken', userInfo.token, flag)
        },
        logout (state) {
            // 退出时重置 storage 重置路由
            localStorage.clear()
            sessionStorage.clear()
            state.userInfo = null
            state.token = null
            // localStorage.removeItem('token')
            // localStorage.removeItem('user')
            // sessionStorage.removeItem('token')
            // sessionStorage.removeItem('user')
            resetRouter() //重置路由
            router.push({
                path: '/login',
                query: {
                    redirect: '/',
                },
            })
        },
        toggleShowHiteMessage (state) {
            state.showHiteMessage = !state.showHiteMessage;
            console.log(state.showHiteMessage);
        },
    },
    actions: {},
}
